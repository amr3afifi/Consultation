import UserList from './UserList'
import React, { Component } from 'react'

/**
 * Matches Component
 * @extends Component
 */
export default class NewUsers extends Component {
    state = { users : [{id:'1',first:'Amr',last:"Afifi",username:'amr3afifi',role:'Fan'}]}

    render() {
        return (
            <div  style={{minHeight:'80vh'}}>
            <UserList users={this.state.users} mode='false' />

            </div>
        )
    }
}
