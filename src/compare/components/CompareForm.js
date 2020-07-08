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

      const user = input.trim()

      TrackApi.getAllTrack(user)
      .then(data => {
        if (data) {
          addUser(data)
        } else {
          console.log('no such user')
          setUsersData(oldState => ({...oldState, isLoading: false}))
        }
      })

      setInput('')
    }
  }

  function onChange(event) {
    const value = event.target.value
    setInput(value)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mb-3 mt-3"
    >
      <div className="input-group mb-3 mt-3">
        <input
          type="text"
          name="user"
          placeholder="Username"
          value={input}
          onChange={onChange}
          className="form-control"
          aria-describedby="button-addon"
        />
        <div className="input-group-append">
          <button
            type="submit"
            name="compare"
            value="compare"
            className="btn btn-outline-secondary"
            id="button-addon"
          >
            Add user
          </button>
        </div>
      </div>
    </form>
  )
}
