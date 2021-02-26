import React, { useState, useEffect } from 'react'
import moment from 'moment'
import OnlineApi from '../net/OnlineApi'
import tz from 'moment-timezone'
import { unstable_batchedUpdates } from 'react-dom'

function moscowTime() {
  let time = moment()
  return time.tz('Europe/Moscow')
}


export default function OnlineStatsBlock() {

  const [online, setOnline] = useState(null)
  const [pcu, setPcu] = useState(null)

  const update = () => unstable_batchedUpdates(() => {
    Promise.all([OnlineApi.getMomentaryOnline(), OnlineApi.getDayStat(1)]).then((arr) => {
      setOnline(arr[0])
      setPcu(arr[1])
    }).catch((err) => console.error(err))
  }) 

  useEffect(() => {
    update()
    setInterval(() => {
      OnlineApi.getMomentaryOnline().then((ccu) => setOnline(ccu))
    }, 60000)
  }, [])


  if (!online || !pcu) {
    return null;
  }

  return (
    <>
        <p className="text-center h4">
          {moscowTime().format('MMM Do YYYY, H:mm')}
        </p>

      <div className="row mt-4">
        <div className="col ml-auto">
          <p className="text-center font-weight-bold h4">
            {`Online: ${online.online}`}
          </p>
          <p className="text-center h5 mt-2">
            {`In battles: ${online.inbattles} [${Math.floor(online.inbattles / online.online * 100)}%]`}
          </p>
        </div>
        <div className="col mr-auto">
          <p className="text-center font-weight-bold h4">
            {`Online PCU: ${pcu.today.online.pcu ?? "N/A"}`}
          </p>
          <p className="text-center h5 mt-2">
            {`In battles PCU: ${pcu.today.inbattles.pcu ?? "N/A"} [${Math.floor(
              (pcu.today.inbattles.pcu ?? 0) / (pcu.today.online.pcu ?? 1) * 100
            )}%]`}
          </p>
        </div>
      </div>

      <br></br>

    </>
  )
}
