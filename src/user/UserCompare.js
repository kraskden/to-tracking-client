import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import TrackApi from '../net/TrackApi';
import DoubleBarDiagram from '../charts/DoubleBarDiagram'
import DataContext from './components/DataContext'
import CompareValues from './data/CompareValues'
import CompareValuesParser from './parsers/CompareValues'


function DoubleBarDiagramWrapper(props) {
  return (
      <DoubleBarDiagram height={30 * props.data.length + 80}
          data={props.data}
          user1={props.user1}
          user2={props.user2}
      />
  )
}


export default function UserCompare() {
  const initialState = {
    data: null,
    input: '',
    dataArrays: []
  }

  const [state, setState] = useState(initialState)

  const context = useContext(DataContext)

  // const currUser = context.login
  // const currUserTracking = context.tracking[0]

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

  useEffect(() => {
    if (state.data) {
      const users = [context, state.data]

      let dataArrays = []

      CompareValues.NumArr.forEach(entry => {
        const parsedNums = CompareValuesParser.parseNumber(
          entry.name, entry.key, ...users
        )
        dataArrays.push(parsedNums)
      })

      CompareValues.RatioArr.forEach(entry => {
        const parsedRatios = CompareValuesParser.parseRatio(
          entry.name, entry.dividend, entry.divider, ...users
        )
        dataArrays.push(parsedRatios)
      })

      const parsedTime = CompareValuesParser.parseTime(...users)
      dataArrays.push(parsedTime)

      setState(prevState => ({
        ...prevState, dataArrays: dataArrays
      }))
      
    } else {
      console.log("No data")
    }
  }, [context, state.data])

  useEffect(() => {
    if (state.dataArrays.length > 0) {
      console.log(state.dataArrays)
    }
  }, [state.dataArrays])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user" value={state.input} onChange={handleChange}/>
        <button type="submit" name="compare" value="compare">Compare</button>
      </form>
      {/* <div> */}
        {/* diagram */}
        {/* <button onClick={showCurrTracking}>ShowGraph</button>
      </div> */}
      {/* {
        state.dataArr
        ? <DoubleBarDiagramWrapper data={state.dataArr} user1={context.login} user2={state.data.login} />
        : null
      } */}
      {/* <DoubleBarDiagramWrapper data={state.time} user1={user1} user2={user2} /> */}
    </>
  )
}
