import MatchList from './MatchList'
import React, { Component } from 'react'

/**
 * Matches Component
 * @extends Component
 */
export default class Matches extends Component {
    state = { matches : [{id:'1',venue:'Cairo Stadium',time:"3:40",team1:'Al Ahly',team2:'Al Zamalek',date:'10/1/2020'},
    {id:'2',venue:'Al Salam Stadium',time:"16:30",team1:'Al Ahly',team2:'Wadi Degla',date:'11/1/2020'},
    {id:'3',venue:'Cairo Stadium',time:"13:40",team1:'El Geish',team2:'Al Zamalek',date:'12/1/2020'}]}

    render() {
        return (
            <div  style={{minHeight:'80vh'}}>
            <MatchList matches={this.state.matches} />

            </div>
        )
    }
}
