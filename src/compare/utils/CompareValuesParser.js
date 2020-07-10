export function parseTime(users, dataName) {
  const data = users.map(user => 
    parseTimeFor(user, dataName)
  )

  return {
    dataName: dataName,
    data: data
  }
}

export function parseNum(users, dataName, dataKey) {
  const data = users.map(user => 
    parseNumFor(user, dataName, dataKey)
  )

  return {
    dataName: dataName,
    data: data
  }
}

export function parseRatio(users, dataName, dividendKey, dividerKey) {
  const data = users.map(user =>
    parseRatioFor(user, dataName, dividendKey, dividerKey)
  )

  return {
    dataName: dataName,
    data: data
  }
}

export function parseTimeFor(user, dataName) {
  const getHours = time => roundNum(time / 60 / 60)

  return {
    name: user.login,
    [dataName]: getHours(user.tracking[0].time)  
  }
}

export function parseNumFor(user, dataName, dataKey) {
  const number = user.tracking[0][dataKey]

  return {
    name: user.login,
    [dataName]: number
  }
}

export function parseRatioFor(user, dataName, dividend, divider) {
  const tracking = user.tracking[0]
  const ratio = tracking[dividend] / tracking[divider]
  const rounded = roundNum(ratio)

  return {
    name: user.login,
    [dataName]: rounded
  }
}

function roundNum(num) {
  if (num !== 0) {
    return Math.round((num + Number.EPSILON) * 100) / 100
  } else {
    return 0
  }
}
