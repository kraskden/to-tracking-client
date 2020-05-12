let BarParser = {}

BarParser.parseActivity = (activities, role) => {
    return activities.filter(act => act.role === role).map((act) => {
        let res = {}
        res.time = Math.round(act.time / 60)
        res.name = act.name
        return res
    })
}

export default BarParser