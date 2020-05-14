import serverUrl from './config'

let TrackApi = {}

TrackApi.getAllTrack = async (user) => {
    let res = await fetch(`${serverUrl}/user/${user}/track`)
    let msg = await res.json()
    return msg
}

TrackApi.getLastTrack = async (user, period) => {
    let res = await fetch(`${serverUrl}/user/${user}/lastTrack?period=${period}`)
    let msg = await res.json()
    return msg
}

export default TrackApi