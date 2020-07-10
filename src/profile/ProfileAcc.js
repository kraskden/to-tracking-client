import React, { Component } from 'react'
import AccCard from './components/AccCard'
import AddAccountForm from './components/AddAccountForm'


export default class ProfileAcc extends Component {
    render() {
        if (!this.props.profileData) {
            return <div></div>
        }
        let cards = this.props.profileData.accounts.map((el) => {
            return <AccCard user={el.login} key={el.login}/>
        })
        return (
            <>
            <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2">
                {cards}
            </div>
                <div className='row justify-content-center'>
                  <div className='col' style={{textAlign: "center"}}>
                    <button
                      type="button"
                      className="btn btn-primary mt-4"
                      data-toggle="modal"
                      data-target="#AddAccountModal"
                    >
                      Add an account
                    </button>
                  </div>
                </div>
          
                <div
                  className="modal fade"
                  id="AddAccountModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="AddAccountModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <AddAccountForm onProfile={this.props.onProfile} />
                  </div>
                </div>
            </>
        )
    }
}
