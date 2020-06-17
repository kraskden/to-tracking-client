import React, {
  useState
} from 'react';
import TrackApi from '../net/TrackApi';

const UserCompare = () => {
  const initialState = {
    data: null,
    input: '',
  }

  const [state, setState] = useState(initialState)

  const handleSubmit = event => {
    event.preventDefault()
    
    console.log(state.input)
    getData(state.input)
  }

  const getData = async (user) => {
    const data = await TrackApi.getAllTrack(user)
    setState(state => ({...state, data: data}))
  }

  const handleChange = event => {
    const value = event.target.value
    setState(state => ({...state, input: value}))
  }

  const showState = () => {
    console.log(state)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user" value={state.input} onChange={handleChange}/>
        <button type="submit" name="compare" value="compare">Compare</button>
      </form>
      <div>
        {/* diagram */}
        <button onClick={showState}>ShowState</button>
      </div>
    </>
  )
}

export default UserCompare;
