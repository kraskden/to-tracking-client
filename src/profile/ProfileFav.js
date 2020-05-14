import React, { Component } from 'react'
import AccCard from './components/AccCard'


export default class ProfileFav extends Component {
    render() {
        if (!this.props.profileData) {
            return <div></div>
        }
        let cards = this.props.profileData.favourites.map((el) => {
            return <AccCard user={el.login} key={el.login}/>
        })
        return (
            <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2">
                {cards}
            </div>
        )
    }
}