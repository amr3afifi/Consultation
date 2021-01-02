import React, { Component } from "react";
import {Route} from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBContainer } from "mdbreact";
import PropTypes from "prop-types";
/**
 * Track class
 * @extends Component
 */
export class UserCard extends Component {
  state = {
    id:'',
    first:'',
    last:'',
    role:'',
    username:'',
    mode:'false',
    userType:''
  }

  
  componentDidMount() {
    this.setState({
      id: this.props.user.id,
      first: this.props.user.first,
      last: this.props.user.last,
      role: this.props.user.role,
      username: this.props.user.username,
      mode: this.props.mode,
      userType: this.props.userType});

      console.log(this.props.mode)
   
  }

    approveRequest = () => {
    }

    deleteRequest = () => {
    }

    denyRequest = () => {    

    }

  render() {
    const modecheck = this.state.mode;
    const userType = this.state.userType;
      return (
<MDBContainer>
  <MDBCard style={{ minWidth: '450px',width: "80%", margin: "15px auto 10px auto" }}>
    
    <MDBCardBody>
      <MDBCardTitle>ID: {this.state.id} Name: {this.state.first} {this.state.last}</MDBCardTitle>
      <MDBContainer>
        <div style={{ width: "200px"}}>Role: {this.state.role}</div>
        <div style={{ width: "200px"}}>Username: {this.state.username}</div>

         {modecheck === 'false' && userType==='admin' ? 
        ( <MDBContainer>
        <MDBBtn style={{ float:'right',width:"130px",margin: "0 0 0 2%" }} color="default" onClick={() => this.approveRequest()} >Approve</MDBBtn>
        <MDBBtn style={{ float:'right',width:"130px",margin: "0 0 0 2%" }} color="danger" onClick={() => this.denyRequest()} > Deny</MDBBtn></MDBContainer> )
          :
        ( <MDBBtn style={{ float:'right',width:"130px",margin: "0 0 0 2%" }} color="danger" onClick={() => this.deleteRequest()} >Delete</MDBBtn>)}
      </MDBContainer>
      
    </MDBCardBody>
  </MDBCard>
  
</MDBContainer>
);
}
}


UserCard.propTypes = {
  match: PropTypes.object.isRequired,
};

export default UserCard;