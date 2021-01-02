import React, { Component } from 'react'
import MatchCard from './MatchCard.js'
import PropTypes from 'prop-types';

/**
 *
 * @extends Component
 */
export class MatchList extends Component {

    render() {
        return this.props.matches.map((match) => (
            <MatchCard key={match.id} match={match} id={match.id} date={match.date} team1={match.team1} team2={match.team2} logo1={match.logo1} logo2={match.logo2} venue={match.venue} time={match.time} mode={this.props.mode} user={this.props.user}/>
        ));
    }
}

MatchList.propTypes = {
    matches: PropTypes.array.isRequired
}

export default MatchList
