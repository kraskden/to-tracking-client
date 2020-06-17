import React, {
  useState,
  useContext
} from 'react';
import TrackApi from '../net/TrackApi';
import DoubleBarDiagram from '../charts/DoubleBarDiagram'
import DataContext from './components/DataContext'


function DoubleBarDiagramWrapper(props) {
  return (
      <DoubleBarDiagram height={30 * props.data.length + 40}
          data={props.data}
          user1={props.user1}
          user2={props.user2}
      />
  )
}

const parseData = (data1, data2) => {
  // const time = data.time / 3600 // to hours
  // const dataArr = [
  //   ["Score", data.score],
  //   ["Time", Math.floor(time)],
  //   ["Kills", data.kills],
  //   ["Deaths", data.deaths],
  //   ["Crystalls", data.cry],
  //   ["K/D", (data.kills / data.deaths).toFixed(2)],
  //   ["Score/Kills", (data.score / data.kills).toFixed()],
  //   ["Cry/Score", (data.cry / data.score).toFixed(2)]
  // ]

  console.log(data1)
  console.log(data2)
  const user1 = data1.login
  const user2 = data2.login

  const tracking1 = data1.tracking[0]
  const tracking2 = data2.tracking[0]

  const getHours = time => Math.floor(time)

  const dataArr = [
    {
      "name": "Score",
      [user1]: tracking1.score,
      [user2]: tracking2.score
    },
    {
      "name": "Time",
      [user1]: getHours(tracking1.time),
      [user2]: getHours(tracking2.time)
    },
    {
      "name": "Kills",
      [user1]: tracking1.kills,
      [user2]: tracking2.kills
    },
    {
      "name": "Deaths",
      [user1]: tracking1.deaths,
      [user2]: tracking2.deaths
    },
    {
      "name": "Crystals",
      [user1]: tracking1.cry,
      [user2]: tracking2.cry
    },
    // {
    //   "name": "K/D",
    //   user1: tracking1,
    //   user2: tracking2
    // },
    // {
    //   "name": "Score/Kills",
    //   user1: tracking1,
    //   user2: tracking2
    // },
    // {
    //   "name": "Cry/Score",
    //   user1: tracking1,
    //   user2: tracking2
    // },
  ]

  console.log(dataArr)
  return dataArr
}

const UserCompare = () => {
  const initialState = {
    data: null,
    input: '',
    dataArr: []
  }

  const [state, setState] = useState(initialState)

  const context = useContext(DataContext)

  const handleSubmit = event => {
    event.preventDefault()
    
    console.log(state.input)
    getData(state.input)
  }

  const getData = async (user) => {
    const data = await TrackApi.getAllTrack(user)
    setState(state => ({...state, data: data}))
  }

  const handleChange = event => {
    const value = event.target.value
    setState(state => ({...state, input: value}))
  }

  const showCurrTracking = () => {
    if (state.data) {
      const tracking = state.data.tracking[0]
      console.log(tracking)
      const dataArr = parseData(context, state.data)
      setState(state => ({...state, dataArr: dataArr}))
    } else {
      console.log('no data')
    }
  }

  const showCurrContext = () => {
    if (context) {
      // console.log(context)
      console.log(context.login)
      console.log(context.tracking[0])
    } else {
      console.log('no data')
    }
  }

  let user1 = context.login
  let user2 = state.data ? state.data.login : "No user"

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user" value={state.input} onChange={handleChange}/>
        <button type="submit" name="compare" value="compare">Compare</button>
      </form>
      <div>
        {/* diagram */}
        <button onClick={showCurrTracking}>ShowGraph</button>
        <button onClick={showCurrContext}>ShowContext</button>
      </div>
      {/* {
        state.dataArr
        ? <DoubleBarDiagramWrapper data={state.dataArr} user1={context.login} user2={state.data.login} />
        : null
      } */}
      <DoubleBarDiagramWrapper data={state.dataArr} user1={user1} user2={user2} />
    </>
  )
}

export default UserCompare;
