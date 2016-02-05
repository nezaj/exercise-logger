/* EntryTable component
 * Currently top-level component, renders the whole app
 */
import _ from 'lodash'
import React, { Component } from 'react'
import request from 'superagent'
import uuid from 'node-uuid'

import Entry from './Entry.jsx'
import styles from '../styles/Entry.css'
import { getRecentDate } from '../util.js'

export default class EntryTable extends Component {
  /* --------- BEGIN Life-Cycle methods --------- */
  state = {
    entries: {}
  };

  componentDidMount () {
    let entriesUrl = 'http://localhost:3000/entries'
    this.fetchEntries = request.get(entriesUrl, (err, res) => {
      if (err) { console.log('ERROR') } // XXX: Properly handle this later
      this.setState({
        entries: res.body
      })
    })
  }

  componentWillUnmount () {
    this.fetchEntries.abort()
  }

  render () {
    let _entries = this.state.entries
    if (_.isEmpty(_entries)) {
      // TODO: Render a spiffy spinner here so the app feels more responsive
      return <div/>
    }

    let _latestDate = new Date(_entries[0].date)
    let avgSevenDays = this.averageCalories(_entries, 7).toFixed(1)
    let avgThisWeek = this.averageCaloriesWeek(_entries, _latestDate, 'Mon')
      .toFixed(1)

    return (
      <div className={styles.entryTable}>
        <div className={styles.entryTableInfo}>
          <div>Average calories last 7 days: { avgSevenDays }</div>
          <div>Average calories this week: { avgThisWeek }</div>
        </div>
        <div className={styles.entryTableHeader}>
          <input type='text'
            className={styles.entryTableAddEntryInput}
            onKeyPress={this.addEntryByEnter}
            placeholder='Day: mm/dd/yy' />
          <span className={styles.entryTableAddEntryButton}
            onClick={this.addEntryByButton}>
            New
          </span>
        </div>
        { this.renderEntries() }
      </div>
    )
  }

  /* --------- END Life-Cycle methods --------- */

  /* ---------- BEGIN Utility methods --------- */
  averageCalories = (entries, numDays = 7) => {
    if (entries.length === 0) {
      return 0
    }
    // Sum the latest numDays worth of entries
    let recent = entries.length < numDays ? entries : entries.slice(0, numDays)
    let totalCalories = recent.map(entry => {
      return this.calculateCalories(entry.foods)
    }).reduce((a, b) => a + b)

    return totalCalories / recent.length
  };

  averageCaloriesWeek = (entries, date, dayName) => {
    let recentDate, thisWeek
    if (entries.length === 0) { return 0 }

    recentDate = getRecentDate(date, dayName)
    thisWeek = entries.filter(e => new Date(e.date) >= recentDate)
    return this.averageCalories(thisWeek)
  };

  calculateCalories = (arrFoodObjs, calRegex = /(\d+)/g) => {
    let calories = 0
    arrFoodObjs.map(f => {
      let food = f.value
      let found
      while (found = calRegex.exec(food)) { // eslint-disable-line no-cond-assign
        calories += parseInt(found[0], 10)
      }
    })

    return calories
  };

  renderEntries = () => {
    return this.state.entries.map((entry) => {
      let _totalCalories = this.calculateCalories(entry.foods)
      return <Entry date={entry.date}
        foods={entry.foods}
        calories={_totalCalories}
        onAddFoodRow={this.addFoodRow.bind(null, entry.id)}
        onEditDate={this.editDate.bind(null, entry.id)}
        onEditFoodRow={this.editFoodRow.bind(null, entry.id)}
        onDeleteEntry={this.deleteEntry.bind(null, entry.id)}
        key={entry.id} />
    })
  };

  /* --------- END Utility methods --------- */

  /* ---------- BEGIN Event handlers --------- */
  addEntry = (date) => {
    const entry = [{
      id: uuid.v4(),
      date: date,
      foods: []
    }]
    this.setState({ entries: entry.concat(this.state.entries) })
  };

  addEntryByButton = (e) => {
    // XXX: HACK HACK HACK, think of a better way to do this later
    let dateInput = e.target.parentNode.getElementsByTagName('input')[0]
    let date = dateInput.value
    if (date) {
      this.addEntry(date)
      dateInput.value = ''
    }
  };

  addEntryByEnter = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      this.addEntry(e.target.value)
      e.target.value = ''
    }
  };

  addFoodRow = (id, value) => {
    let updateEntry

    const defaultFood = {'id': uuid.v4(), 'value': value}
    const entries = this.state.entries.map((entry) => {
      if (entry.id === id) {
        entry.foods = entry.foods.concat(defaultFood)
        updateEntry = entry
      }
      return entry
    })

    this.updateEntryToStore(updateEntry)
    this.setState({ entries })
  };

  deleteEntry = (id) => {
    const entries = this.state.entries.filter(entry => entry.id !== id)
    this.removeEntryFromStore(id)
    this.setState({ entries })
  };

  editDate = (id, date) => {
    let updateEntry

    const entries = this.state.entries.map((entry) => {
      if (entry.id === id && date) {
        entry.date = date
        updateEntry = entry
      }
      return entry
    })

    this.updateEntryToStore(updateEntry)
    this.setState({ entries })
  };

  editFoodRow = (id, foods) => {
    let updateEntry

    const entries = this.state.entries.map((entry) => {
      if (entry.id === id) {
        entry.foods = foods
        updateEntry = entry
      }
      return entry
    })

    this.updateEntryToStore(updateEntry)
    this.setState({ entries })
  };

  /* ----------- END Event handlers --------- */

  /* ---------- BEGIN Store methods --------- */
  removeEntryFromStore (id) {
    let url = `http://localhost:3000/entries/${id}`
    request.del(url).end()
  }

  updateEntryToStore (entry) {
    let id = entry.id
    let url = `http://localhost:3000/entries/${id}`
    request.post(url).send(entry).end()
  }

  /* ----------- END Store methods ---------- */
}
