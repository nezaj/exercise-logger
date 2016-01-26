/** Test Entry component */
import assert from 'assert'
import EntryTable from '../../src/components/EntryTable.jsx'

describe('Entry component', () => {
  let entry

  beforeEach(() => {
    entry = new EntryTable()
  })

  context('#calculateCalories (foods, calRegex)', () => {
    it('returns 0 when foods is empty array', () => {
      let empty = []
      let expected = 0
      let actual = entry.calculateCalories(empty)
      assert.equal(actual, expected)
    })

    it('calculates total calories for one food', () => {
      let one = ['Beef Patty (375) + Veggies (75)']
      let expected = 450
      let actual = entry.calculateCalories(one)
      assert.equal(actual, expected)
    })

    it('calculates total calories for multiple foods', () => {
      let multiple = [
        'Beef Patty (375) + Veggies (75)',
        'Protein Powder (120)',
        'Protein Bar (210)',
        'Mediterranean Food (700)',
        'Beer (200)',
        'Avocados (550)'
      ]
      let expected = 2230
      let actual = entry.calculateCalories(multiple)
      assert.equal(actual, expected)
    })
  })
})
