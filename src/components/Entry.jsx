import React, { Component, PropTypes } from 'react'

import EntryRow from './EntryRow.jsx'
import styles from '../styles/Entry.css'

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
    let entryRows = this.renderFoodList(this.props.foods)
    return (
      <div className={styles.entries}>
        <div className={styles.entryHeader}>
          <div>{ date }</div>
          <small>Calories: { this.props.calories }</small>
          <span className={styles.entryDelete}
            onClick={this.props.onDeleteEntry}>&#x2715;</span>
        </div>
        <div className={styles.entryRowContainer}>
          <input type='text'
            className={styles.entryAddFoodInput}
            onKeyPress={this.addFoodByEnter}
            placeholder='Something yummy (300)' />
          <span className={styles.entryAddFoodButton}
            onClick={this.addFoodByButton}>
            Add
          </span>
          <ul>{ entryRows }</ul>
        </div>
      </div>
    )
  }

  addFoodByButton = (e) => {
    // XXX: HACK HACK HACK, think of a better way to do this later
    let foodInput = e.target.parentNode.getElementsByTagName('input')[0]
    let food = foodInput.value
    if (food) {
      this.props.onAddFoodRow(food)
      foodInput.value = ''
    }
  };

  addFoodByEnter = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      this.props.onAddFoodRow(e.target.value)
      e.target.value = ''
    }
  };

  beginEditDate = () => {
    this.setState({ editingDate: true })
  };

  checkEnterDate = (e) => {
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
    // XXX: I might not want to make this editable?
    return (
      <input
        type='text'
        autoFocus
        defaultValue={this.props.date}
        onBlur={this.finishEditDate}
        onKeyPress={this.checkEnterDate} />
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
