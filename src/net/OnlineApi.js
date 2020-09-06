import serverUrl from "./config"

const OnlineApi = {}

const URL = "https://tankionline.com/s/status.js"

const API_URL = `${serverUrl}/online`

OnlineApi.getMomentaryOnline = async () => {
  let res = await fetch(URL)
  let obj = await res.json()
  let nodes = Object.values(obj.nodes)

  console.log(nodes)

  return nodes.reduce((acc, curr) => {
    acc.online += curr.online
    acc.inbattles += curr.inbattles
    return acc
  }, {online: 0, inbattles: 0})
}

OnlineApi.getPcu = async (days) => {
  let url = days ? `${API_URL}/pcu?days=${days}` : `${API_URL}/pcu`
  let res = await fetch(url)
  if (res.status !== 200)
    return Promise.reject()
  return await res.json()
}

OnlineApi.getTrack = async (days) => {
  let res = await fetch(`${API_URL}/detail?days=${days}`)
  if (res.status !== 200)
    return Promise.reject()
  return await res.json()
}

export default OnlineApi