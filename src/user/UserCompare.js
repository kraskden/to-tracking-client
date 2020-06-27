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
    usersData: null,
    isLoading: false,
    dataArrays: [],
    users: [],
    inputList: ['']
  }

  const [state, setState] = useState(initialState)
  const currUserData = useContext(DataContext)

  function handleSubmit(event) {
    event.preventDefault()

    setState(state => ({...state, isLoading: true}))

    const users = state.inputList
    getDataForEach(users)
    .then(usersData => {
      setState(state => ({...state, usersData: usersData, isLoading: false}))
    })
  }

  async function getDataForEach(users) {
    let data = []

    for (const user of users) {
      const userData = await getData(user)
      data.push(userData)
    }

    return data
  }

  async function getData(user) {
    const response = await TrackApi.getAllTrack(user)
    return response
  }

  function handleInputChange(event, index) {
    const value = event.target.value
    const inputList = [...state.inputList]
    inputList[index] = value
    setState(state => ({...state, inputList: inputList}))
  }

  function addUserInput() {
    setState(prevState => {
      const inputList = [...prevState.inputList, '']
      return {...prevState, inputList: inputList}
    })
  }

  function delUserInput(index) {
    const inputList = state.inputList
    inputList.splice(index, 1)
    setState(prevState => ({...prevState, inputList: inputList}))
  }

  useEffect(() => {
    if (state.usersData) {
      const users = [currUserData, ...state.usersData]

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
  }, [currUserData, state.usersData])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {
          state.inputList.map((input, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="user"
                  placeholder="Enter username"
                  value={input}
                  onChange={event => handleInputChange(event, index)}
                />
                <div>
                  {
                    state.inputList.length > 1
                    && <button onClick={e => delUserInput(index)}>Remove user</button>
                  }
                  {
                    state.inputList.length - 1 === index
                    && state.inputList.length < 4
                    && <button onClick={addUserInput}>Add user</button>
                  }
                </div>
              </div>
            )
          )
        }
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
        state.usersData !== null
        ? <MultipleBarDiagram dataArrays={state.dataArrays} users={state.users} />
        : null
      }
    </div>
  )
}
