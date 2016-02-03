/* Utility functions used throughout the client */

const dayMap = {
  'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6
}

/* Returns a date object represent the most recent occurence of a day
 * name given a start date
 * Ex: getRecentDate(new Date('01/28/16'), 'Mon')) => new Date('01/25/16')
 */
export let getRecentDate = (date, dayName) => {
  let startVal = date.getDay()
  let endVal = dayMap[dayName]
  let offset = endVal <= startVal ? endVal - startVal : endVal - startVal - 7
  let recentDate = new Date(date)
  recentDate.setDate(recentDate.getDate() + offset)

  return recentDate
}
