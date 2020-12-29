import React, { Component } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBContainer } from "mdbreact";
import PropTypes from "prop-types";
/**
 * Track class
 * @extends Component
 */
export class MatchCard extends Component {
  state = {
    id:'',
    venue:'',
    time:'',
    date:'',
    team1:'',
    team2:'',
    logo1:'',
    logo2:''
  }
  componentDidMount() {
    console.log(this.props);
    this.setState({
      id: this.props.match.id,
      venue: this.props.match.venue,
      time: this.props.match.time,
      date: this.props.match.date,
      team1: this.props.match.team1,
      team2: this.props.match.team2,
      logo1: this.props.match.logo1,
      logo2: this.props.match.logo2
    });
   
  }

  render() {
      return (
<MDBContainer>
  <MDBCard style={{ minWidth: '450px',width: "80%", margin: "15px auto 10px auto" }}>
    
    <MDBCardBody>
      <MDBCardTitle>{this.state.team1} VS {this.state.team2}</MDBCardTitle>
      <MDBCardText>
        <div style={{ width: "200px"}}>{this.state.date} at {this.state.time}</div>
        <div style={{ width: "200px"}}>{this.state.venue}</div>
        <MDBBtn style={{ float:'right',margin: "0 0 0 2%" }} color="default">Details</MDBBtn>
      </MDBCardText>
      
    </MDBCardBody>
  </MDBCard>
  
</MDBContainer>
);
}
}


MatchCard.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MatchCard;