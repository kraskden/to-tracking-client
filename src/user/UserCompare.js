import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import TrackApi from '../net/TrackApi';
import DoubleBarDiagram from '../charts/DoubleBarDiagram'
import DataContext from './components/DataContext'


function DoubleBarDiagramWrapper(props) {
  return (
      <DoubleBarDiagram height={30 * props.data.length + 80}
          data={props.data}
          user1={props.user1}
          user2={props.user2}
      />
  )
}

function parseTime(...users) {
  const getHours = time => Math.floor(time/60/60)
  let entry = { "name" : "Time" }
  users.forEach(user => {
    entry[user.login] = getHours(user.tracking[0].time)
  })
  return ([entry])
}

function parseNumber(name, key, ...users) {
  let entry = { "name": name }
  users.forEach(user => {
    entry[user.login] = user.tracking[0][key]
  })
  return([entry])
}

function parseRatio(name, dividend, divider, ...users) {
  let entry = { "name": name }
  users.forEach(user => {
    const data = user.tracking[0]
    const ratio = data[dividend] / data[divider]
    entry[user.login] = ratio
  })
  return([entry])
}





export default function UserCompare() {
  const initialState = {
    data: null,
    input: '',
    dataArrays: []
  }

  const [state, setState] = useState(initialState)

  const context = useContext(DataContext)

  const currUser = context.login
  const currUserTracking = context.tracking[0]

  function handleSubmit(event) {
    event.preventDefault()
    getData(state.input)
  }

  async function getData(user) {
    const data = await TrackApi.getAllTrack(user)
    setState(state => ({...state, data: data}))
  }

  function handleChange(event) {
    const value = event.target.value
    setState(state => ({...state, input: value}))
  }

  function showCurrTracking() {
    if (state.data) {
      const users = [context, state.data]
      const testNumArr = [
        {
          name: "Score",
          key: "score",
        },
        {
          name: "Kills",
          key: "kills",
        },
        {
          name: "Deaths",
          key: "deaths",
        },
      ]

      const testRatioArr = [
        {
          name: "K/D",
          dividend: "kills",
          divider: "deaths",
        },
        {
          name: "C/E",
          dividend: "cry",
          divider: "score",
        },
      ]

      testNumArr.forEach(entry => {
        console.log(
          entry.name,
          parseNumber(entry.name, entry.key, ...users)
        )
      })

      testRatioArr.forEach(entry => {
        console.log(
          entry.name,
          parseRatio(entry.name, entry.dividend, entry.divider, ...users)
        )
      })

      console.log(
        "Time",
        parseTime(...users)
      )
      
    } else {
      console.log("No data")
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
      {/* <DoubleBarDiagramWrapper data={state.time} user1={user1} user2={user2} /> */}
    </>
  )
}
