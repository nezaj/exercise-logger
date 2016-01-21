/** Test Entry component */
import assert from 'assert'
import { Entry } from '../../src/components/entry'

describe('Entry component', () => {
  let entry
  let default_props = {
    'foods': []
  }

  beforeEach(() => {
    entry = new Entry(default_props)
  })

  context('#calculateCalories (foods, calRegex)', () => {
    it('returns 0 when foods is empty array', () => {
      let empty = []
      let expected = 0
      let actual = entry.calculateCalories(empty)
      assert.equal(actual, expected)
    })

    it('calculates total calories for one food', () => {
      var one = ['Beef Patty (375) + Veggies (75)']
      var expected = 450
      let actual = entry.calculateCalories(one)
      assert.equal(actual, expected)
    })

    it('calculates total calories for multiple foods', () => {
      var multiple = [
        'Beef Patty (375) + Veggies (75)',
        'Protein Powder (120)',
        'Protein Bar (210)',
        'Mediterranean Food (700)',
        'Beer (200)',
        'Avocados (550)'
      ]
      var expected = 2230
      let actual = entry.calculateCalories(multiple)
      assert.equal(actual, expected)
    })
  })
})
