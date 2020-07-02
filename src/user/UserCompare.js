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
  const currUserData = useContext(DataContext)

  const initialState = {
    usersData: [currUserData],
    isLoading: false,
    barData: null,
    inputList: ['']
  }
  const [state, setState] = useState(initialState)

  // handlers

  function handleSubmit(event) {
    event.preventDefault()

    setState(state => ({...state, isLoading: true}))

    const users = state.inputList
    getDataForEach(users)
    .then(usersData => {
      const newUsersData = [currUserData, ...usersData]
      setState(state => ({...state, usersData: newUsersData, isLoading: false}))
    })
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

  // parse and set data for MultipleBarDiagram

  useEffect(() => {
    const users = state.usersData

    let barData = []


    CompareValues.SCGroup.forEach(
      entry => {
        const dataArray = CompareValuesParser.parseNumber(
          entry.name, entry.key, ...users
        )
        barData.push([entry.name, dataArray])
      }
    )

    CompareValues.KDGroup.forEach(
      entry => {
        const dataArray = CompareValuesParser.parseNumber(
          entry.name, entry.key, ...users
        )
        barData.push([entry.name, dataArray])
      }
    )

    CompareValues.RatioGroup.forEach(
      entry => {
        const dataArray = CompareValuesParser.parseRatio(
          entry.name, entry.dividend, entry.divider, ...users
        )
        barData.push([entry.name, dataArray])
      }
    )

    const parsedTime = CompareValuesParser.parseTime(...users)
    barData.push(["Time", parsedTime])

    setState(prevState => ({
      ...prevState, barData: barData
    }))
  }, [state.usersData])

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
      <MultipleBarDiagram
        barData={state.barData}
        currentUser={currUserData.login}
      />
    </div>
  )
}

// functions used to get data

async function getDataForEach(users) {
  let data = []

  for (const user of users) {
    const userData = await getData(user)
    if (userData) {
      data.push(userData)
    }
  }

  return data
}

async function getData(user) {
  if (user) {
    const response = await TrackApi.getAllTrack(user)
    return response
  }
}
