import React, { Component, PropTypes } from 'react'

class EntryRow extends Component {
  static propTypes = {
    food: PropTypes.string.isRequired
  };

  render () {
    return (
      <li style={{ 'marginBottom': '5px' }}>
        { this.props.food }
        <button style={{ 'marginLeft': '10px' }}>Edit</button>
      </li>
    )
  }
}

class Entry extends Component {
  static propTypes = {
    foods: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired
  };
  state = {
    calories: this.calculateCalories(this.props.foods)
  };

  calculateCalories (foods, calRegex = /(\d+)/g) {
    let calories = 0
    foods.forEach((food) => {
      let found
      while (found = calRegex.exec(food)) { // eslint-disable-line no-cond-assign
        calories += parseInt(found[0], 10)
      }
    })

    return calories
  }

  renderFoodList (foods) {
    let food_list = []
    foods.forEach((food) => {
      food_list.push(<EntryRow food={food} key={food}/>)
    })

    return food_list
  }

  render () {
    return (
      <div>
        <div>
          Day: { this.props.date }
          <button style={{ 'marginLeft': '10px' }}>Edit</button>
        </div>
        <div>
          Diet: { this.state.calories }
        </div>
        <ul>
          { this.renderFoodList(this.props.foods) }
        </ul>
      </div>
    )
  }
}

class EntryTable extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired
  };

  renderEntries () {
    var entries = []
    this.props.entries.forEach((entry) => {
      entries.push(<Entry date={entry.date} foods={entry.foods}
                          key={entry.date}/>)
    })

    return entries
  }

  render () {
    return (
      <div>
        <h1>Entries</h1>
        <div style={{ 'marginBottom': '10px' }}>
          <button>Add Entry</button>
        </div>
        <div>
          { this.renderEntries() }
        </div>
      </div>
    )
  }
}

export { EntryTable, Entry, EntryRow }
