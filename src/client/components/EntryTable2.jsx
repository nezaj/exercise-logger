/* EntryTable component
 * Currently top-level component, renders the whole app
 */
import _ from 'lodash'
import React, { Component } from 'react'
import uuid from 'node-uuid'

import Entry from './Entry2.jsx'

export default class EntryTable extends Component {
  /* --------- Life-Cycle methods --------- */
  state = {
    // TODO: Delete this and load from bootstrap once handlers done
    entries: [{
      'id': uuid.v4(),
      'date': '(Sunday): 01/24/16',
      'diet': [
        'Breaded Chicken (330) + BBQ Chicken (175)',
        'Veggies (75)',
        'Protein Ice Cream (70)',
        'Mandarins (70) + Avocado (275)',
        'Cottage Cheese (180) + Carrots (50)',
        'BBQ Chicken (175) + Chicken Tenders (330)',
        'Protein Ice Cream (140)'
      ],
      'exercise': {
        'header': 'Lift, Embarcadero Run, Jiu-Jitsu',
        'effort': [
          'Crazy 8s: 5x75 Day 6 (Complete)',
          'Skulls Crushers: 5x75 Day 6 (Complete)',
          'Squats: 5x200x5 (Complete)',
          'Bench: 5x175x5 (Complete)'
        ]
      },
      'notes': [
        'Woke up early and took care of some personal chores',
        'Great lift session, completed rx',
        'Beautiful day, motivated to do another run',
        'Triple workout day'
      ]
    }]
  };

  // TODO: Uncomment this once event handlers are done
  // componentDidMount () {
  //   let entriesUrl = 'http://localhost:3000/api/entries'
  //   this.fetchEntries = request.get(entriesUrl, (err, res) => {
  //     if (err) { console.log('ERROR') } // XXX: Properly handle this later
  //     this.setState({
  //       entries: res.body
  //     })
  //   })
  // }
  //
  // componentWillUnmount () {
  //   this.fetchEntries.abort()
  // }

  render () {
    let entries = this.state.entries
    if (_.isEmpty(entries)) {
      // TODO: Render a spiffy spinner here so the app feels more responsive
      return <div/>
    }

    return (
      <div>
        { this.renderEntries() }
      </div>
    )
  }

  /* ---------- Utility methods --------- */
  getEntry = (entryId) => {
    return _.find(this.state.entries, ['id', entryId])
  };

  renderEntries = () => {
    return this.state.entries.map((entry) => {
      return <Entry date={entry.date}
        diet={entry.diet} onUpdateDiet={this.handleUpdateDiet}
        exercise={entry.exercise}
        notes={entry.notes}
        id={entry.id}
        key={entry.id} />
    })
  };

  /* ---------- Handlers --------- */
  handleUpdateDiet = (entryId, oldValue, newValue) => {
    let entry = this.getEntry(entryId)

    // Handle delete
    if (!newValue) {
      let idx = entry.diet.indexOf(oldValue)
      entry.diet.splice(idx, 1)

    // Handle update
    } else {
      let updatedDiet = entry.diet.map((val) => {
        if (val === oldValue) {
          val = newValue
        }

        return val
      })
      entry.diet = updatedDiet
    }

    this.setState({ entries: this.state.entries })
  };
}
