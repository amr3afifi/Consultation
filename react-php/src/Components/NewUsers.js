import UserList from './UserList'
import React, { Component } from 'react'
import axios from 'axios'
import {ConfigContext} from '../Context/ConfigContext'

/**
 * Matches Component
 * @extends Component
 */
export default class NewUsers extends Component {
    static contextType=ConfigContext;
    // state = { users : [{_id:'1',first:'Amr',last:"Afifi",username:'amr3afifi',role:'Fan'}]}
    state={users:[]}
    componentWillMount() 
      {
        let userType = localStorage.getItem("userType");
        this.setState({user: userType});

        axios.get(this.context.baseURL+'/getInActiveUsers').then(res => {
                if(res.status===200) // Successful
                {
                    console.log(res.data.data.users);
                    if(res.data.success===true)
                    {
                         this.setState({users: res.data.data.users});

                    }
                }
                else
                {      alert(res)          }}).catch(err =>{alert(err)})
    
        
      }

    render() {
        return (
            <div  style={{minHeight:'80vh'}}>
            <UserList users={this.state.users} mode='false' />

            </div>
        )
    }
}
