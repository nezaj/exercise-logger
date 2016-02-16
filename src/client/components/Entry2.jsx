import React, { Component, PropTypes } from 'react'

import EntryDiet from './EntryDiet'
import EntryExercise from './EntryExercise'
import EntryNotes from './EntryNotes'

export default class Entry extends Component {
  static propTypes = {
    // Data
    date: PropTypes.string.isRequired,
    diet: PropTypes.array.isRequired,
    exercise: PropTypes.object.isRequired,
    notes: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    // Handlers
    onUpdateDiet: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='entry-container'>
        <h3 className='entry-date'>{ this.props.date }</h3>
        <EntryDiet
          entryId={this.props.id}
          diet={this.props.diet}
          onUpdateDiet={this.props.onUpdateDiet} />
        <EntryExercise entryId={this.props.id} exercise={this.props.exercise} />
        <EntryNotes entryId={this.props.id} notes={this.props.notes} />
      </div>
    )
  }
}
