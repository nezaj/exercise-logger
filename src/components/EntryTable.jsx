import React, { Component } from 'react'
import uuid from 'node-uuid'

import Entry from './Entry.jsx'
import styles from '../styles/Entry.css'

export default class EntryTable extends Component {
  state = {
    entries: [
      {
        'id': uuid.v4(),
        'date': '01/17/16',
        'foods': [
          {'id': uuid.v4(), 'value': 'Subway (320)'},
          {'id': uuid.v4(), 'value': 'Wedding food (1000)'},
          {'id': uuid.v4(), 'value': 'Family Dinner (2000)'}
        ]
      },
      {
        'id': uuid.v4(),
        'date': '01/16/16',
        'foods': [
          {'id': uuid.v4(), 'value': 'Beef Patty (375) + Veggies (75)'},
          {'id': uuid.v4(), 'value': 'Protein Powder (120)'},
          {'id': uuid.v4(), 'value': 'Protein Bar (210)'},
          {'id': uuid.v4(), 'value': 'Mediterranean Food (700)'},
          {'id': uuid.v4(), 'value': 'Beer (200)'},
          {'id': uuid.v4(), 'value': 'Avocados (550)'}
        ]
      }
    ]
  };

  render () {
    return (
      <div className={styles.entryTable}>
        <h1 style={{'textAlign': 'center', 'color': 'white'}}>Entries</h1>
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

  addFoodRow = (id, value) => {
    const defaultFood = {'id': uuid.v4(), 'value': value}
    const entries = this.state.entries.map((entry) => {
      if (entry.id === id) { entry.foods = entry.foods.concat(defaultFood) }
      return entry
    })

    this.setState({ entries })
  };

  calculateCalories = (foodValues, calRegex = /(\d+)/g) => {
    let calories = 0
    foodValues.forEach((food) => {
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
      let _foodCalories = entry.foods.map(food => food.value)
      let _totalCalories = this.calculateCalories(_foodCalories)
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
