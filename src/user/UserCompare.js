import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import TrackApi from '../net/TrackApi';
import DataContext from './components/DataContext'
import CompareValues from './data/CompareValues'
import CompareValuesParser from './parsers/CompareValues'
import MultipleBarDiagram from '../charts/MultipleBarDiagram'



export default function UserCompare() {
  const initialState = {
    data: null,
    input: '',
    dataArrays: [],
    users: []
  }

  const [state, setState] = useState(initialState)
  const context = useContext(DataContext)

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
      const usersArray = users.map(user => user.login)


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
        ...prevState, dataArrays: dataArrays, users: usersArray
      }))
      
    } else {
      console.log("No data")
    }
  }, [context, state.data])

  useEffect(() => {
    if (state.dataArrays.length > 0 && state.users.length > 0) {
      console.log(state.dataArrays)
      console.log(state.users)
    }
  }, [state.dataArrays, state.users])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user" value={state.input} onChange={handleChange}/>
        <button type="submit" name="compare" value="compare">Compare</button>
      </form>
      <MultipleBarDiagram dataArrays={state.dataArrays} users={state.users} />
    </>
  )
}
