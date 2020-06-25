const CompareValuesParser = {
  parseTime,
  parseNumber,
  parseRatio
}

function parseTime(...users) {
  const getHours = time => Math.floor(time/60/60)
  let entry = { "name" : "Time" }
  users.forEach(user => {
    entry[user.login] = getHours(user.tracking[0].time)
  })
  return ([entry])
}

function parseNumber(name, key, ...users) {
  let entry = { "name": name }
  users.forEach(user => {
    entry[user.login] = user.tracking[0][key]
  })
  return([entry])
}

function parseRatio(name, dividend, divider, ...users) {
  let entry = { "name": name }
  users.forEach(user => {
    const data = user.tracking[0]
    const ratio = data[dividend] / data[divider]
    entry[user.login] = ratio
  })
  return([entry])
}

export default CompareValuesParser
