import React, { Component } from 'react'
import UserCard from './UserCard.js'
import PropTypes from 'prop-types';

/**
 *
 * @extends Component
 */
export class UserList extends Component {

    state = {
        userType:''
      }

      
    componentWillMount()
    {
        let userType=localStorage.getItem('userType')
        this.setState({ userType: userType  });

        console.log(userType)
    }

    render() {
        return this.props.users.map((user) => (
            <UserCard key={user.id} user={user} id={user.id} first={user.first} last={user.last} role={user.role} username={user.username} mode={this.props.mode} userType={this.state.userType}/>
        ));
    }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired
}

export default UserList
