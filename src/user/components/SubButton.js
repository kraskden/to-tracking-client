import React, { Component } from 'react'
import AuthApi from '../../net/AuthApi'

export default class SubButton extends Component {

    onSub = () => {
        AuthApi.subTo(this.props.login).finally(() => {
            this.props.onProfile()
        })
    }

    onUnsub = () => {
        AuthApi.unsubFrom(this.props.login).finally(() => {
            this.props.onProfile()
        })
    }
    
    render() {
        let subButton = <></>
        if (this.props.profileData) {
            if (this.props.profileData.accounts.find((val) => val.login === this.props.login) !== undefined) {
                return subButton
            }
            let button = this.props.profileData.favourites.find((acc) => acc.login === this.props.login) ? 
                <button onClick={this.onUnsub} className="btn btn-sm btn-warning mt-2">Unsubscribe</button> :
                <button onClick={this.onSub} className="btn btn-sm btn-info mt-2">Subscribe</button>     
            
            subButton = (<div className="col-auto">
                            {button}  
                        </div>)
            
            
        }
        return subButton
    }
}