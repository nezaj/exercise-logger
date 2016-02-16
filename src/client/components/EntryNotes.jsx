import React, { Component, PropTypes } from 'react'

export default class EntryNotes extends Component {
  static propTypes = {
    entryId: PropTypes.string.isRequired,
    notes: PropTypes.array.isRequired
  };

  /* --------- Life-Cycle methods --------- */
  render () {
    return (
      <div className='entry-notes-container'>
        <div className='entry-notes-header'>
          Notes:
        </div>
        <ul className='entry-notes-collection'>
          { this.renderNotes() }
        </ul>
      </div>
    )
  }

  /* ---------- Utility methods --------- */
  renderNotes = () => {
    return this.props.notes.map((e, idx) => {
      return (
        <li key={idx} className='entry-notes-item'>{e}</li>
      )
    })
  };
}

