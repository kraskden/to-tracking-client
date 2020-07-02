let CompareValuesParser = {}


CompareValuesParser.parseTime = function(...users) {
  const getHours = time => Math.floor(time/60/60)
  let data = []

  users.forEach(user => {
    const entry = {
      name: user.login,
      Time: getHours(user.tracking[0].time)
    }
    data.push(entry)
  })
  return (data)
}

CompareValuesParser.parseNumber = function(name, key, ...users) {
  let data = []

  users.forEach(user => {
      const number = user.tracking[0][key]

      const entry = {
        name: user.login,
        [name]: number
      }
      data.push(entry)
  })
  return(data)
}

CompareValuesParser.parseRatio = function(name, dividend, divider, ...users) {
  let data = []
  
  users.forEach(user => {
    const tracking = user.tracking[0]
    const ratio = tracking[dividend] / tracking[divider]

    const entry = {
      name: user.login,
      [name]: ratio
    }
    data.push(entry)
  })
  return(data)
}


export default CompareValuesParser
