export default {
  parseTime(users) {
    const getHours = time => Math.floor(time / 60 / 60)

    const data = users.map(user => ({
      name: user.login,
      Time: getHours(user.tracking[0].time)    
    }))

    return data
  },

  parseNumber(numKey, key, users) {
    const data = users.map(user => {
      const number = user.tracking[0][key]

      return {
        name: user.login,
        [numKey]: number
      }
    })

    return data
  },

  parseRatio(ratioKey, dividend, divider, users) {
    const data = users.map(user => {
      const tracking = user.tracking[0]
      const ratio = tracking[dividend] / tracking[divider]

      return {
        name: user.login,
        [ratioKey]: ratio
      }
    })

    return data
  },

  parseTimeFor(user) {
    const getHours = time => roundNum(time / 60 / 60)

    return {
      name: user.login,
      "Hours played": getHours(user.tracking[0].time)  
    }
  },

  parseNumFor(user, numKey, dataKey) {
    const number = user.tracking[0][dataKey]

    return {
      name: user.login,
      [numKey]: number
    }
  },

  parseRatioFor(user, ratioKey, dividend, divider) {
    const tracking = user.tracking[0]
    const ratio = tracking[dividend] / tracking[divider]
    const rounded = roundNum(ratio)

    return {
      name: user.login,
      [ratioKey]: rounded
    }
  },

}

function roundNum(num) {
  if (num !== 0) {
    return Math.round((num + Number.EPSILON) * 100) / 100
  } else {
    return 0
  }
}
