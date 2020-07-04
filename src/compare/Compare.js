import React, {
  useState,
  useContext,
} from 'react';
import DataContext from '../user/components/DataContext'
import CompareForm from './components/CompareForm'
import CompareBarDiagram from './components/CompareBarDiagram'



export default function UserCompare() {
  const currUserData = useContext(DataContext)

  const initialUsersDataState = {
    data: [currUserData],
    isLoading: false, 
  }
  const [usersData, setUsersData] = useState(initialUsersDataState)

  function addUser(userData) {
    const newData = [...usersData.data, userData]
    setUsersData(oldState => ({...oldState, data: newData, isLoading: false}))
  }

  function delUser(index) {
    const data = usersData.data
    data.splice(index, 1)
    setUsersData(prevState => ({...prevState, data: data}))
  }

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
      <CompareForm
        callbacks={{
          addUser,
          setUsersData
        }} 
      />
      {
        usersData.isLoading
        ? (
          <div class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
          </div>
        ) : null
      }
      <CompareBarDiagram
        usersData={usersData}
      />
    </div>
  )
}
