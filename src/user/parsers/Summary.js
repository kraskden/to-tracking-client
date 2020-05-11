let SummaryParser = {}

SummaryParser.makeHomeSummary = (rawData) => {
    let data = rawData.tracking[0]
    data.time = data.time / 3600 // to hours
    let first = [
        ["Score", data.score],
        ["Time", Math.floor(data.time)],
        ["Kills", data.kills],
        ["Deaths", data.deaths],
        ["Crystalls", data.cry]
    ]
    let second = [
        ["K/D", (data.kills / data.deaths).toFixed(2)],
        ["S/T", (data.score / data.time).toFixed()],
        ["K/T", (data.kills / data.time).toFixed()],
        ["C/T", (data.kills / data.time).toFixed()],
        ["C/S", (data.cry / data.score).toFixed(2)]
    ]
    console.log([first, second])
    return [first, second]
}

export default SummaryParser