
let TrackApi = {}

let serverUrl = 'http://localhost:4000'

TrackApi.getAllTrack = async (user) => {
    let res = await fetch(`${serverUrl}/user/${user}/track`)
    let msg = await res.json()
    return msg
}

export default TrackApi