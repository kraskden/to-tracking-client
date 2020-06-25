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
    isLoading: false,
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
    setState(state => ({...state, isLoading: true}))
    const data = await TrackApi.getAllTrack(user)
    setState(state => ({...state, data: data, isLoading: false}))
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

      const SCArr = CompareValues.SCGroup.map(
        entry => CompareValuesParser.parseNumber(
          entry.name, entry.key, ...users
        )
      )

      const KDArr = CompareValues.KDGroup.map(
        entry => CompareValuesParser.parseNumber(
          entry.name, entry.key, ...users
        )
      )

      const RatioArr = CompareValues.RatioGroup.map(
        entry => CompareValuesParser.parseRatio(
          entry.name, entry.dividend, entry.divider, ...users
        )
      )

      const parsedTime = CompareValuesParser.parseTime(...users)

      dataArrays.push(SCArr, KDArr, RatioArr, [parsedTime])

      setState(prevState => ({
        ...prevState, dataArrays: dataArrays, users: usersArray
      }))
      
    } else {
      console.log("No data")
    }
  }, [context, state.data])


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user" value={state.input} onChange={handleChange}/>
        <button type="submit" name="compare" value="compare">Compare</button>
      </form>
      {
        state.isLoading
        ? (
          <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
          </div>
        ) : null
      }
      {
        state.data !== null
        ? <MultipleBarDiagram dataArrays={state.dataArrays} users={state.users} />
        : null
      }
    </>
  )
}
