import React, { Component, PropTypes } from 'react'

export default class EntryExercise extends Component {
  static propTypes = {
    entryId: PropTypes.string.isRequired,
    exercise: PropTypes.object.isRequired
  };

  /* --------- Life-Cycle methods --------- */
  render () {
    return (
      <div className='entry-exercise-container'>
        <div className='entry-exercise-container'>
          <div className='entry-exercise-header'>
            Exercise: { this.props.exercise.header }
          </div>
          <ul className='entry-exercise-collection'>
            { this.renderExercise() }
          </ul>
        </div>
      </div>
    )
  }

  /* ---------- Utility methods --------- */
  renderExercise = () => {
    let effort = this.props.exercise.effort
    return effort.map((e, idx) => {
      return (
        <li key={idx} className='entry-exercise-item'>{e}</li>
      )
    })
  };
}

