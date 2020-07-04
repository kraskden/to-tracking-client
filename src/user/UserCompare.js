import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import TrackApi from '../net/TrackApi';
import DataContext from './components/DataContext'
import CompareValuesData from './data/CompareValuesData'
import CompareValuesParser from './parsers/CompareValuesParser'
import MultipleBarDiagram from '../charts/MultipleBarDiagram'



export default function UserCompare() {
  const currUserData = useContext(DataContext)

  // states

  const initialUsersDataState = {
    data: [currUserData],
    isLoading: false, 
  }

  const initialBarState = null

  const initialInputState = ''

  const [usersData, setUsersData] = useState(initialUsersDataState)
  const [barData, setBarData] = useState(initialBarState)
  const [input, setInput] = useState(initialInputState)

  // handlers

  function onSubmit(event) {
    /*
    set userData
    */
    event.preventDefault()

    if (input.trim()) {
      setUsersData(oldState => ({...oldState, isLoading: true}))

      const user = input

      getData(user)
      .then(data => {
        addUser(data)
      })

      setInput('')
    }
  }

  function onChange(event) {
    const value = event.target.value
    setInput(value)
  }

  function addUser(userData) {
    const newData = [...usersData.data, userData]
    setUsersData(oldState => ({...oldState, data: newData, isLoading: false}))
  }

  function delUser(index) {
    const data = usersData.data
    data.splice(index, 1)
    setUsersData(prevState => ({...prevState, data: data}))
  }

  // parse and set data for MultipleBarDiagram

  useEffect(() => {

    const users = usersData.data
    console.log(users)

    let barData = []

    /*
    parse data for bar diagram
    */

    CompareValuesData.SCGroup.forEach(
      entry => {
        const dataArray = CompareValuesParser.parseNumber(
          entry.name, entry.key, users
        )
        barData.push([entry.name, dataArray])
      }
    )

    CompareValuesData.KDGroup.forEach(
      entry => {
        const dataArray = CompareValuesParser.parseNumber(
          entry.name, entry.key, users
        )
        barData.push([entry.name, dataArray])
      }
    )

    CompareValuesData.RatioGroup.forEach(
      entry => {
        const dataArray = CompareValuesParser.parseRatio(
          entry.name, entry.dividend, entry.divider, users
        )
        barData.push([entry.name, dataArray])
      }
    )

    const parsedTime = CompareValuesParser.parseTime(users)
    barData.push(["Time", parsedTime])


    /*
    set barData
    */

    setBarData(barData)

    // stringify to catch all changes in complex data structures
    // eslint-disable-next-line
  }, [JSON.stringify(usersData.data)])

  return (
    <div>
      <ul>
        {
          usersData.data.map((user, index) => (
            <li key={index}>
              <span>{user.login}</span>
              <button onClick={e => delUser(index)}>&times;</button>
            </li>
          ))
        }
      </ul>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="user"
            placeholder="Username"
            value={input}
            onChange={onChange}

          />
          <button
            type="submit"
            name="compare"
            value="compare"
          >
            Add user
          </button>
        </div>
      </form>
      {
        usersData.isLoading
        ? (
          <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
          </div>
        ) : null
      }
      <MultipleBarDiagram
        barData={barData}
        currentUser={currUserData.login}
      />
    </div>
  )
}

// functions used to get data

async function getData(user) {
  if (user) {
    const response = await TrackApi.getAllTrack(user)
    return response
  }
}
