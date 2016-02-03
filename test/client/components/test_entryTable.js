/* Test EntryTable component */
import assert from 'assert'

import entries from '../../../src/server/data/seed.js'
import EntryTable from '../../../src/client/components/EntryTable.jsx'

describe('EntryTable component', () => {
  let entryTable
  let props = {
    initialEntries: entries
  }

  beforeEach(() => {
    entryTable = new EntryTable(props)
  })

  context('#averageCaloriesWeek', () => {
    it('returns 0 calories if no entries', () => {
      let empty = []
      let expected = 0
      let actual = entryTable.averageCaloriesWeek(empty, 'Mon')
      assert.equal(actual, expected)
    })
    it('returns Sunday calories', () => {
      // Assuming entires contains data from Monday -> Sunday
      // If we call averageCaloriesWeek(entries, 'Sun') we should
      // only get back Sunday calories
      let date = new Date('01/24/16') // Sunday
      let expected = 1870
      let actual = entryTable.averageCaloriesWeek(entries, date, 'Sun')
      assert.equal(actual, expected)
    })
    it('returns weekly average calories', () => {
      // Assuming entires contains data from Monday -> Sunday
      // If we call averageCaloriesWeek(entries, 'Monday') we should
      // get the average for the week
      let date = new Date('01/24/16') // Sunday
      let expected = 1875
      let actual = entryTable.averageCaloriesWeek(entries, date, 'Mon')
      assert.equal(actual, expected)
    })
  })

  context('#averageCalories', () => {
    it('returns 0 for 0 days', () => {
      let empty = []
      let expected = 0
      let actual = entryTable.averageCalories(empty)
      assert.equal(actual, expected)
    })
    it('returns average calories for 1 day', () => {
      let one = [entries[0]]
      let foods = one[0].foods
      let expected = entryTable.calculateCalories(foods)
      let actual = entryTable.averageCalories(one)
      assert.equal(actual, expected)
    })
    it('returns average calories over 3 days', () => {
      let three = entries.slice(0, 3)
      let calories = three.map(entry => {
        return entryTable.calculateCalories(entry.foods)
      }).reduce((a, b) => a + b)
      let expected = calories / 3
      let actual = entryTable.averageCalories(three)
      assert.equal(actual, expected)
    })
    it('returns average calories over 7 days', () => {
      let seven = entries
      let calories = seven.map(entry => {
        return entryTable.calculateCalories(entry.foods)
      }).reduce((a, b) => a + b)
      let expected = calories / 7
      let actual = entryTable.averageCalories(seven)
      assert.equal(actual, expected)
    })
  })

  context('#calculateCalories', () => {
    it('returns 0 when foods is empty array', () => {
      let empty = []
      let expected = 0
      let actual = entryTable.calculateCalories(empty)
      assert.equal(actual, expected)
    })
    it('calculates total calories for one food', () => {
      let one = [{'value': 'Beef Patty (375) + Veggies (75)'}]
      let expected = 450
      let actual = entryTable.calculateCalories(one)
      assert.equal(actual, expected)
    })
    it('calculates total calories for multiple foods', () => {
      let multiple = [
        { 'value': 'Beef Patty (375) + Veggies (75)' },
        { 'value': 'Protein Powder (120)' },
        { 'value': 'Protein Bar (210)' },
        { 'value': 'Mediterranean Food (700)' },
        { 'value': 'Beer (200)' },
        { 'value': 'Avocados (550)' }
      ]
      let expected = 2230
      let actual = entryTable.calculateCalories(multiple)
      assert.equal(actual, expected)
    })
  })
})
