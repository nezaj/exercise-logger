import React, { Component, PropTypes } from 'react'
import uuid from 'node-uuid'

import Entry from './Entry.jsx'
import styles from '../styles/Entry.css'
import { getRecentDate } from '../util.js'

export default class EntryTable extends Component {
  static propTypes = {
    initialEntries: PropTypes.array.isRequired
  };

  state = {
    entries: this.props.initialEntries
  };

  render () {
    let _entries = this.state.entries
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

  addFoodRow = (id, value) => {
    const defaultFood = {'id': uuid.v4(), 'value': value}
    const entries = this.state.entries.map((entry) => {
      if (entry.id === id) { entry.foods = entry.foods.concat(defaultFood) }
      return entry
    })

    this.setState({ entries })
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

  deleteEntry = (id) => {
    const entries = this.state.entries.filter(entry => entry.id !== id)
    this.setState({ entries })
  };

  editDate = (id, date) => {
    const entries = this.state.entries.map((entry) => {
      if (entry.id === id && date) { entry.date = date }
      return entry
    })

    this.setState({ entries })
  };

  editFoodRow = (id, foods) => {
    const entries = this.state.entries.map((entry) => {
      if (entry.id === id && foods) { entry.foods = foods }
      return entry
    })

    this.setState({ entries })
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

}
