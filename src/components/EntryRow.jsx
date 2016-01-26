import React, { Component, PropTypes } from 'react'

export default class EntryRow extends Component {
  static propTypes = {
    onEditFoodRow: PropTypes.func.isRequired,
    onDeleteFoodRow: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  };

  state = {
    editingRow: false
  };

  render () {
    let row = this.state.editingRow ? this.renderEditRow() : this.renderRow()
    return (<li>{ row } </li>)
  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      return this.finishEditRow(e)
    }
  };

  beginEditRow = () => {
    this.setState({ editingRow: true })
  };

  finishEditRow = (e) => {
    this.props.onEditFoodRow(e.target.value)
    this.setState({ editingRow: false })
  };

  renderEditRow = () => {
    return (
      <input
        type='text'
        autoFocus
        defaultValue={this.props.value}
        onBlur={this.finishEditRow}
        onKeyPress={this.checkEnter} />
    )
  };

  renderRow = () => {
    return (
      <div>
        <span onClick={this.beginEditRow}>{ this.props.value }</span>
        <button onClick={this.props.onDeleteFoodRow}>Delete</button>
      </div>
    )
  };

}
