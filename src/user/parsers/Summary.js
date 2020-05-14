let SummaryParser = {}

function makeFav(sortedData, role) {
    for (const entry of sortedData) {
        if (entry.role === role) {
            return entry.name
        }
    }
    return "N/A"
}

function undefFix(arrs) {
    for (const arr of arrs) {
        for (const elem of arr) {
            if (elem[1] === undefined || `${elem[1]}` === "NaN") {
                elem[1] = "—"
            }
        }
    }
    return arrs
}

SummaryParser.makeHomeSummary = (data) => {
    let time = data.time / 3600 // to hours
    data.activities.sort((a, b) => b.time - a.time)
    let favTurret = makeFav(data.activities, 'Turret')
    let favHull = makeFav(data.activities, 'Hull')
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
    return [first, second]
}



SummaryParser.makePeriodSummary = (data) => {
    if (!data) {
        return [[], []]
    }
    let time = data.time / 3600 // to hours
    data.activities.sort((a, b) => b.time - a.time)

    let favTurret = makeFav(data.activities, 'Turret')
    let favHull = makeFav(data.activities, 'Hull')
    let favMode = makeFav(data.activities, 'Mode')
    let favModule = makeFav(data.activities, 'Module')

    let dd = data.supplies.find(supp => supp.name === "DD") || {count: 0}
    let batt = data.supplies.find(supp => supp.name === "Battery") || {count: 0}

    let first = [
        ["Score", data.score],
        ["Time", time.toFixed(1)],
        ["Kills", data.kills],
        ["Deaths", data.deaths],
        ["Crystalls", data.cry],
        ["Golds", data.golds ? data.golds : 0],
        ["__empty", ""],
        ["Turret", favTurret],
        ["Hull", favHull],
        ["__empty", ""],
        ["DD/Hour", (dd.count / time).toFixed()]
    ]

    let second = [
        ["K/D", (data.kills / data.deaths).toFixed(2)],
        ["Score/Kills", (data.score / data.kills).toFixed()],
        ["Cry/Score", (data.cry / data.score).toFixed(2)],
        ["Kills/Hour", (data.kills / time).toFixed()],
        ["Score/Hour", (data.score / time).toFixed()],
        ["Cry/Hour", (data.cry / time).toFixed()],
        ["__empty", ""],
        ["Mode", favMode],
        ["Module", favModule],
        ["__empty", ""],
        ["Battery/Hour", (batt.count / time).toFixed()]
    ]
    
    return undefFix([first, second])
}

SummaryParser.makeShortSummary = (data) => {
    let time = data.time / 3600 // to hours

    let first = [
        ["Exp", data.score],
        ["Time", time.toFixed(1)]
    ]

    let second = [
        ["K/D", (data.kills / data.deaths).toFixed(2)],
        ["Cry", data.cry]
    ]

    return undefFix([first, second])
}

export default SummaryParser