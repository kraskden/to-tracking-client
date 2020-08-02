import serverUrl from './config'

let TrackApi = {}

TrackApi.getAllTrack = async (user) => await fetchData(`${serverUrl}/user/${user}/track`)

TrackApi.getLastTrack = async (user, period) => await fetchData(`${serverUrl}/user/${user}/lastTrack?period=${period}`)

TrackApi.getCurrTrack = async (user) => await fetchData(`${serverUrl}/user/${user}/currTrack`)

async function fetchData(url) {
    let res = await fetch(url)
    if (res.ok) {
        let msg = await res.json()
        return msg
    } else {
        console.error('Error while processing request: ' + res.status)
    }
}

export default TrackApi
