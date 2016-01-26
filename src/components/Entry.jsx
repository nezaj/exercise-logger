import React, { Component, PropTypes } from 'react'

import EntryRow from './EntryRow.jsx'

export default class Entry extends Component {
  static propTypes = {
    calories: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    foods: PropTypes.array.isRequired,
    onAddFoodRow: PropTypes.func.isRequired,
    onEditDate: PropTypes.func.isRequired,
    onEditFoodRow: PropTypes.func.isRequired,
    onDeleteEntry: PropTypes.func.isRequired
  };

  state = {
    editingDate: false
  };

  render () {
    let date = this.state.editingDate ? this.renderEditDate() : this.renderDate()
    let foods = this.renderFoodList(this.props.foods)
    return (
      <div>
        <div>
          Day: { date }
          <button onClick={this.props.onDeleteEntry}>Delete</button>
        </div>
        <div>Diet: { this.props.calories }</div>
        <ul>{ foods }</ul>
        <button onClick={this.props.onAddFoodRow}>Add Food</button>
      </div>
    )
  }

  beginEditDate = () => {
    this.setState({ editingDate: true })
  };

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      return this.finishEditDate(e)
    }
  };

  editFoodRow = (id, newValue) => {
    const foods = this.props.foods.map((food) => {
      if (food.id === id && newValue) { food.value = newValue }
      return food
    })

    this.props.onEditFoodRow(foods)
  };

  deleteFoodRow = (id) => {
    let foods = this.props.foods.filter((food) => food.id !== id)
    this.props.onEditFoodRow(foods)
  };

  finishEditDate = (e) => {
    this.props.onEditDate(e.target.value)
    this.setState({ editingDate: false })
  };

  renderDate = () => {
    return (<span onClick={this.beginEditDate}>{ this.props.date }</span>)
  };

  renderEditDate = () => {
    return (
      <input
        type='text'
        autoFocus
        defaultValue={this.props.date}
        onBlur={this.finishEditDate}
        onKeyPress={this.checkEnter} />
    )
  };

  renderFoodList = (foods) => {
    return this.props.foods.map((food) => {
      return <EntryRow value={food.value}
        onEditFoodRow={this.editFoodRow.bind(null, food.id)}
        onDeleteFoodRow={this.deleteFoodRow.bind(null, food.id)}
        key={food.id} />
    })
  };

}
