import React, { useState } from 'react'
import TrackApi from '../../net/TrackApi'


export default function CompareForm(props) {

  const [input, setInput] = useState('')

  const {
    addUser,
    setUsersData
  } = props.callbacks

  function onSubmit(event) {
    event.preventDefault()

    if (input.trim()) {
      setUsersData(oldState => ({...oldState, isLoading: true}))

      const user = input

      if (user) {
        TrackApi.getAllTrack(user)
        .then(data => {
          if (data) {
            addUser(data)
          } else {
            console.log('no such user')
            setUsersData(oldState => ({...oldState, isLoading: false}))
          }
        })
      }

      setInput('')
    }
  }

  function onChange(event) {
    const value = event.target.value
    setInput(value)
  }

  return (
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
  )
}
