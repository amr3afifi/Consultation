import React, { Component } from 'react'
import MatchCard from './MatchCard2.js'
import PropTypes from 'prop-types';

/**
 *
 * @extends Component
 */
export class MatchList extends Component {

    render() {
        return this.props.matches.map((match) => (
            <MatchCard key={match._id} match={match} id={match.matchid}  date={match.date} team1={match.team1} team2={match.team2} stadium={match.stadium} time={match.time} mode={this.props.mode} user={this.props.user}/>
        ));
    }
}

MatchList.propTypes = {
    matches: PropTypes.array.isRequired
}

export default MatchList
