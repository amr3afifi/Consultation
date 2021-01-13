import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBContainer } from "mdbreact";
import PropTypes from "prop-types";
import axios from 'axios'
import {ConfigContext} from '../Context/ConfigContext'


export class UserCard extends Component {
  static contextType=ConfigContext;

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
      id: this.props.user._id,
      first: this.props.user.first,
      last: this.props.user.last,
      role: this.props.user.role,
      username: this.props.user.username,
      mode: this.props.mode,
      userType: this.props.userType});

      console.log(this.props.mode)
   
  }

    approveRequest = () => {

      axios.put(this.context.baseURL+'/approveUser',
      {"id":this.state.id}
      ).then(res => {
        if(res.status===200) // Successful
        {
            if(res.data.success===true)
            {
              window.location.reload(false);
            }
        }
        else
        {      alert(res)          }}).catch(err =>{alert(err)})

    }

    deleteRequest = () => {
      axios.put(this.context.baseURL+'/deleteUser',
      {"id":this.state.id}
      ).then(res => {
        if(res.status===200) // Successful
        {
          console.log(res.data)
            if(res.data.success===true)
            {
              window.location.reload(false);
            }
        }
        else
        {      alert(res)          }}).catch(err =>{alert(err)})
    }

    denyRequest = () => {  
      axios.put(this.context.baseURL+'/declineUser',
      {"id":this.state.id}
      ).then(res => {
        if(res.status===200) // Successful
        {
          console.log(res.data)
            if(res.data.success===true)
            {
              window.location.reload(false);
            }
        }
        else
        {      alert(res)          }}).catch(err =>{alert(err)})  

    }

  render() {
    const modecheck = this.state.mode;
    const userType = this.state.userType;
      return (
<MDBContainer>
  <MDBCard style={{ minWidth: '450px',width: "80%", margin: "15px auto 10px auto" }}>
    
    <MDBCardBody>
      <MDBCardTitle> Name: {this.state.first} {this.state.last}</MDBCardTitle>
      <MDBContainer>
        <div style={{ width: "250px"}}>ID:{this.state.id}</div>
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
  user: PropTypes.object.isRequired,
};

export default UserCard;