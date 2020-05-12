let SummaryParser = {}

SummaryParser.makeHomeSummary = (data) => {
    let time = data.time / 3600 // to hours
    let favTurret = 
        data.activities.filter((act) => act.role === "Turret").sort((a, b) => b.time - a.time)[0].name
    let favHull = 
        data.activities.filter((act) => act.role === "Hull").sort((a, b) => b.time - a.time)[0].name
    let first = [
        ["Score", data.score],
        ["Time", Math.floor(time)],
        ["Kills", data.kills],
        ["Deaths", data.deaths],
        ["Crystalls", data.cry]
    ]
    let second = [
        ["K/D", (data.kills / data.deaths).toFixed(2)],
        ["Score/Kills", (data.score / data.kills).toFixed()],
        ["Cry/Score", (data.cry / data.score).toFixed(2)],
        ["Turret", favTurret],
        ["Hull", favHull]
    ]
    console.log([first, second])
    return [first, second]
}

export default SummaryParser