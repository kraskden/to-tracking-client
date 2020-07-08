import React, {
  useState,
  useContext,
} from 'react';
import DataContext from '../user/components/DataContext'
import CompareForm from './components/CompareForm'
import CompareBarDiagram from './components/CompareBarDiagram'
import UserList from './components/UserList'



export default function UserCompare() {
  const currUserData = useContext(DataContext)

  const initialUsersDataState = {
    data: [currUserData],
    isLoading: false, 
  }
  const [usersData, setUsersData] = useState(initialUsersDataState)

  function addUser(userData) {
    const newData = [...usersData.data, userData]
    setUsersData(prevState => ({...prevState, data: newData, isLoading: false}))
  }

  function delUser(index) {
    const data = usersData.data
    data.splice(index, 1)
    setUsersData(prevState => ({...prevState, data: data}))
  }

  return (
    <div>
      <CompareForm
        callbacks={{
          addUser,
          setUsersData
        }} 
      />
      <div className="container card mt-2">
        <div className="row">
          <div className="col-md-3 pt-3">
            <UserList
              users={usersData.data}
              delCallback={delUser}
            />
          </div>
          <div className="col-md-9 pt-3">
            {
              usersData.isLoading
              ? (
                <div class="d-flex align-items-center">
                  <strong>Loading...</strong>
                  <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                </div>
              )
              : <CompareBarDiagram usersData={usersData} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
