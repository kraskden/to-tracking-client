let PieParser = {}

PieParser.makeActivity = (data, role, limit) => {
    let activityData = 
        data.activities.filter((act) => act.role === role && act.time > 0).sort((a, b) => b.time - a.time)
    let totalScore = activityData.reduce((acc, curr) => acc + curr.score, 0)
    let totalTime = activityData.reduce((acc, curr) => acc + curr.time, 0)
    activityData = activityData.filter((act) => (act.time / totalTime) >= 1/14 )
    if (limit) {
        activityData = activityData.slice(0, limit)
    }
    let otherTime = totalTime - activityData.reduce((acc, curr) => acc + curr.time, 0)
    let otherScore = totalScore - activityData.reduce((acc, curr) => acc + curr.score, 0)
    if (otherTime != 0) {
        activityData.push({
            name: "Others",
            score: otherScore,
            time: otherTime
        })
    }
    
    return activityData
}

PieParser.decorate = (activities) => {
    return activities.map((act) => {
        return {
            x: act.name,
            y: act.time
        }
    })
}

export default PieParser