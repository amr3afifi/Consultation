import MatchList from './MatchList'
import React, { Component } from 'react'
import axios from 'axios'
import {ConfigContext} from '../Context/ConfigContext'

/**
 * Matches Component
 * @extends Component
 */
export default class Matches extends Component {
    static contextType=ConfigContext;

    state = { 
    // matches : [{_id:'1',stadium:'Cairo Stadium',time:"3:40",team1:'Al Ahly',team2:'Al Zamalek',date:'10/1/2020'},
    // {_id:'2',stadium:'Al Salam Stadium',time:"16:30",team1:'Al Ahly',team2:'Wadi Degla',date:'11/1/2020'},
    // {_id:'3',stadium:'Cairo Stadium',time:"13:40",team1:'El Geish',team2:'Al Zamalek',date:'12/1/2020'}]
    matches :[]

,user:''
}
      
      componentDidMount() 
      {
        let userType = localStorage.getItem("userType");
        this.setState({user: userType});

        axios.get(this.context.baseURL+'/matches').then(res => {
                if(res.status===200) // Successful
                {
                    console.log(res.data.data.matches);
                    if(res.data.success===true)
                    {
                         this.setState({matches: res.data.data.matches});

                    }
                }
                else
                {      alert(res)          }}).catch(err =>{alert(err)})
    
        
      }



    render() {
        const userType = this.state.user;
        return (
            <div  style={{minHeight:'80vh'}}>
            <MatchList matches={this.state.matches} mode='false' user={userType}/>

            </div>
        )
    }
}
