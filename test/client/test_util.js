/* Test client-specific utility methods */
import assert from 'assert'

import { getRecentDate } from '../../src/client/util.js'

describe('getRecentDate', () => {
  it('gets the most recent Monday', () => {
    let expected, actual

    // Returns the nearest date if it is after Monday
    let after = new Date('01/28/16') // Thursday
    expected = new Date('01/25/16') // Monday
    actual = getRecentDate(after, 'Mon')
    assert.equal(actual.getTime(), expected.getTime())

    // Returns the same date if today is monday
    let same = new Date('01/25/16')
    expected = new Date('01/25/16')
    actual = getRecentDate(same, 'Mon')
    assert.equal(actual.getTime(), expected.getTime())

    // Returns the correct date if today is before monday
    let previous = new Date('01/24/16') // Sunday
    expected = new Date('01/18/16') // Monday
    actual = getRecentDate(previous, 'Mon')
    assert.equal(actual.getTime(), expected.getTime())
  })
  it('gets the most recent Sunday', () => {
    let expected, actual
    // Returns the nearest date if it is after Sunday
    let after = new Date('01/28/16') // Thursday
    expected = new Date('01/24/16') // Sunday
    actual = getRecentDate(after, 'Sun')
    assert.equal(actual.getTime(), expected.getTime())

    // Returns the same date if today is Sunday
    let same = new Date('01/24/16')
    expected = new Date('01/24/16')
    actual = getRecentDate(same, 'Sun')
    assert.equal(actual.getTime(), expected.getTime())

    // Returns the correct date if today is before Sunday
    let previous = new Date('01/23/16') // Saturday
    expected = new Date('01/17/16') // Sunday
    actual = getRecentDate(previous, 'Sun')
    assert.equal(actual.getTime(), expected.getTime())
  })
})
