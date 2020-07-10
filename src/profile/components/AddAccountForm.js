import React from 'react';
import AuthApi from '../../net/AuthApi';

export default function AddAccountForm(props) {

  let loginRef = React.createRef()
  let inviteRef = React.createRef()

  function submitHandler(event) {
    event.preventDefault()
    AuthApi.addAccount(loginRef.current.value, inviteRef.current.value).then(() => {
      props.onProfile()
    }).finally(() => {
      document.getElementById("btn-close").click()
    })
  };

  return (
    <form
      className="modal-content"
      onSubmit={submitHandler}
    >
    <div className="modal-header">
      <h5
        className="modal-title"
        id="AddAccountModalLabel"
      >
        Add an account
      </h5>
      <button
        id="btn-close"
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      <div className='col justify-content-center'>
        <div className='form-group col-12'>
          <label for='loginInput'>Login</label>
          <input
            type='text'
            ref={loginRef}
            placeholder='Login'
            id='loginInput'
            className='col-12'
          />
        </div>
        <div className='form-group col-12'>
          <label for='inviteInput'>Invite code</label>
          <input
            type='text'
            ref={inviteRef}
            placeholder='Invite code'
            id='inviteInput'
            className='col-12'
          />
        </div>
      </div>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-dismiss="modal"
      >
        Close
      </button>
      <button 
        type="submit"
        className="btn btn-primary"
      >
        Add
      </button>
    </div>
  </form>
  )
}
