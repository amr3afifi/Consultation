import MatchList from './MatchList2'
import React, { Component } from 'react'
import axios from 'axios'
import {ConfigContext} from '../Context/ConfigContext'

/**
 * Matches Component
 * @extends Component
 */
export default class Reservations extends Component {
    static contextType=ConfigContext;
    constructor() {
        super()

        this.state = { 
        reserved : [],
        matches:[]
    }
}

    componentDidMount() 
      {
        let userType = localStorage.getItem("userType");
        this.setState({user: userType});

        axios.post(this.context.baseURL+'/me/reservations',
        {"token": localStorage.getItem('token')}
        ).then(res => {
                if(res.status===200) // Successful
                {
                    console.log(res.data.data.hobaa);
                    if(res.data.success===true)
                    {
                      this.setState({reserved: res.data.data.hobaa},this.getMatches);
                    //   this.setState({reserved: res.data.data.hobaa});

                    }
                }
                else
                {      alert(res)          }}).catch(err =>{alert(err)})
    
        
      }

      getMatches = () => {

        // let matchesarr=[];
        // let link=this.context.baseURL;
        // this.state.reserved.forEach(function (arrayItem) 
        //     {
        //     axios.put(link+'/getMatch',
        //             {"id":arrayItem.matchid}
        //             ).then(res => {
        //                 if(res.status===200) // Successful
        //                 {
        //                     if(res.data.success===true)
        //                     {
        //                         matchesarr.push(res.data.data.match);
        //                     }
        //                 }
        //                 else
        //                 {            }}).catch(err =>{alert(err)})
        //     });

        //  this.setState({matches: matchesarr});
        
      }

    // state = { matches : [{id:'1',venue:'Cairo Stadium',time:"3:40",team1:'Al Ahly',team2:'Al Zamalek',date:'10/1/2020'},
    // {id:'2',venue:'Al Salam Stadium',time:"16:30",team1:'Al Ahly',team2:'Wadi Degla',date:'11/1/2020'},
    // {id:'3',venue:'Cairo Stadium',time:"13:40",team1:'El Geish',team2:'Al Zamalek',date:'12/1/2020'}]}
    
    render() {
        return (
            <div  style={{minHeight:'80vh'}}>

        {/* {this.state.matches.length>0
                ? <MatchList matches={this.state.matches} reserved={this.state.reserved} mode='true' />
                : <h1>Loading...</h1>
            } */}

            <MatchList matches={this.state.reserved} mode='true' />

            </div>
        )
    }
}
