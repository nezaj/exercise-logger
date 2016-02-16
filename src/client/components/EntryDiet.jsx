import React, { Component, PropTypes } from 'react'

export default class EntryDiet extends Component {

  static propTypes = {
    // Data
    entryId: PropTypes.string.isRequired,
    diet: PropTypes.array.isRequired,
    // Handlers
    onUpdateDiet: PropTypes.func.isRequired
  };

  /* --------- Life-Cycle methods --------- */
  render () {
    return (
      <div className='entry-diet-container'>
        <p className='entry-diet-header'>
          Diet: { this.totalCalories(this.props.diet) }
        </p>
        <ul className='entry-diet-collection'>
          { this.renderDiet() }
        </ul>
      </div>
    )
  }

  /* ---------- Utility methods --------- */
  renderDiet = () => {
    return this.props.diet.map((value, idx) => {
      return <DietRow key={idx}
        entryId={this.props.entryId}
        value={value}
        onUpdateDiet={this.props.onUpdateDiet} />
    })
  };

  totalCalories = (diet, calRegex = /(\d+)/g) => {
    let calories = 0
    diet.map(e => {
      let found
      while (found = calRegex.exec(e)) { // eslint-disable-line no-cond-assign
        calories += parseInt(found[0], 10)
      }
    })

    return calories
  };

}

class DietRow extends Component {

  static propTypes = {
    // Data
    entryId: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    // Handlers
    onUpdateDiet: PropTypes.func.isRequired
  };

  state = {
    editingRow: false
  };

  /* --------- Life-Cycle methods --------- */
  render () {
    let row = this.state.editingRow ? this.renderEdit() : this.renderRow()
    return <li className='entry-diet-item'>{row}</li>
  }

  /* ---------- Utility methods --------- */
  commitEdit = (e) => {
    let oldValue = this.props.value
    let newValue = e.target.value
    this.props.onUpdateDiet(this.props.entryId, oldValue, newValue)
    this.setState({ editingRow: false })
  };

  renderEdit = () => (
    <input className='entry-diet-edit'
      type='text'
      autoFocus
      defaultValue={this.props.value}
      onBlur={this.handleBlur}
      onKeyDown={this.handleKeyDown}
    />
  );

  renderRow = () => (
    <span onClick={this.handleClick}>
      { this.props.value }
    </span>
  );

  /* ---------- Handlers --------- */
  handleBlur = (e) => {
    this.commitEdit(e)
  };

  handleClick = () => {
    this.setState({ editingRow: true })
  };

  handleKeyDown = (e) => {
    let prevItem, nextItem

    switch (e.keyCode) {
      // Enter: Commit changes. Will also start editing the next item
      // if it exists
      case 13:
        // XXX: Hack, there is a UX bug with deleting atm, clean up later
        if (!e.target.value) {
          this.setState({ editingRow: false })
          break
        }
        this.commitEdit(e)
        nextItem = e.target.parentElement.nextSibling
        if (nextItem && e.target.value) {
          nextItem.children[0].click()
        }
        break

      // Esc: Exit edit w/o commiting changes
      case 27:
        this.setState({ editingRow: false })
        break

      // Up: Commit changes and go to previous if item exists
      case 38:
        prevItem = e.target.parentElement.previousSibling
        if (prevItem && e.target.value) {
          prevItem.children[0].click()
        }
        break

      // Down: Commit changes and go to next item if item exists
      case 40:
        nextItem = e.target.parentElement.nextSibling
        if (nextItem && e.target.value) {
          nextItem.children[0].click()
        }
        break

      // No-op otherwise
      default:
        break
    }
  };

}
