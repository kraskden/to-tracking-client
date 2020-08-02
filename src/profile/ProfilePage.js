import React, { Component } from 'react'
import NavBar from '../navbar/NavBar'
import ProfileFav from './ProfileFav'
import ProfileAcc from './ProfileAcc'
import AdminPage from './AdminPage'

// props.profileData
export default class ProfilePage extends Component  {

    constructor(props) {
        console.log(props)
        super(props)
        this.state = {
            tab: "fav"
        }
    }

    onUserChange = (newUser) => {
        this.props.history.push(`/user/${newUser}`)
    }

    onTabChange = (newTab) => {
        this.setState({
            tab: newTab
        })
    }

    ChooseComponent = (props) => {
        switch(this.state.tab) {
            case "fav":
                return <ProfileFav profileData={props.profileData} />
            case "acc":
                return <ProfileAcc profileData={props.profileData}  onProfile={props.onProfile}  />
            case "admin":
                return <AdminPage />
            default: 
                return <div></div>
        }
    }

    render() {
        let adminTab = <></>
        if (this.props.profileData && this.props.profileData.role === "Admin") {
            adminTab = (
                <li className="nav-item">
                    <button className="nav-link" data-toggle="tab" role="tab" aria-selected="false" onClick={() => this.onTabChange("admin")}>Admin</button>
                </li>
            )
        }
        return (
            <div className="container">
                <NavBar onUserChange={this.onUserChange} profileData={this.props.profileData} onProfile={this.props.onProfile} />
                <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">
                    <li className="nav-item">
                        <button className="nav-link active" data-toggle="tab" role="tab" aria-selected="true" onClick={() => this.onTabChange("fav")}>Favourites</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" data-toggle="tab" role="tab" aria-selected="false" onClick={() => this.onTabChange("acc")}>Accounts</button>
                    </li>
                    {adminTab}
                </ul>
                <this.ChooseComponent profileData={this.props.profileData} onProfile={this.props.onProfile}/>
            </div>
        )
    }
}
