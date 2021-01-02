import React, { Component } from 'react'
import { MDBBtn } from 'mdbreact';
import {Route,Redirect} from 'react-router-dom'
import "./Auth.css"

/**
 * Matches Component
 * @extends Component
 */

export default class EditProfile extends Component {
    
    state = { 
        user : {username:'amr3afifi',email:'amr7afifi@gmail.com',first:'Amr',last:"Afifi",day:'26',month:'07',year:'1998',gender:'Male',city:'Giza',address:'oba street',role:'fan'},
        status:''
    }

    
    enableEdit = () => {
        document.getElementById('ep-new-psw').readOnly=false;
        //document.getElementById('ep-old-psw').readOnly=false;
        document.getElementById('ep-first').readOnly=false;
        document.getElementById('ep-last').readOnly=false;
        document.getElementById('ep-city').readOnly=false;
        document.getElementById('ep-address').readOnly=false;
        document.getElementById('sign-up-form-year').readOnly=false;
        document.getElementById('sign-up-form-day').readOnly=false;
        document.getElementById('sign-up-form-month').readOnly=false;
      }

    diableEdit = () => {
        document.getElementById('ep-new-psw').readOnly=true;
        //document.getElementById('ep-old-psw').readOnly=true;
        document.getElementById('ep-first').readOnly=true;
        document.getElementById('ep-last').readOnly=true;
        document.getElementById('ep-city').readOnly=true;
        document.getElementById('ep-address').readOnly=true;
        document.getElementById('sign-up-form-year').readOnly=true;
        document.getElementById('sign-up-form-day').readOnly=true;
        document.getElementById('sign-up-form-month').readOnly=true;
        console.log(this.state)
       
      }

    componentDidMount =()=>{
        document.getElementById('ep-email').value=this.state.user.email;
        document.getElementById('ep-username').value=this.state.user.username;
        document.getElementById('ep-first').value=this.state.user.first;
        document.getElementById('ep-last').value=this.state.user.last;
        document.getElementById('ep-city').value=this.state.user.city;
        document.getElementById('ep-address').value=this.state.user.address;
        document.getElementById('sign-up-form-year').value=this.state.user.year;
        document.getElementById('sign-up-form-day').value=this.state.user.day;
        document.getElementById('sign-up-form-month').value=this.state.user.month;
       
    }

    submitRequest=()=>{
        this.setState({status:"connected"})
    }

    render() {
        const submitOrNot = this.state.status;
        return (
            <div id="my-sign-up">
                {submitOrNot==="connected" ? (
            <div>
            <Redirect to="/matches"/>
            </div>
            )
            :
            (
                <div className="center-box">
            <MDBBtn className="my-button " color="danger" style={{border:'0px',width:"100%",margin:"20px auto"}} type="button" onClick={this.enableEdit} >Edit</MDBBtn>
            <form method="POST">
            <label>Email:</label><input size="10"   id="ep-email" className="form-control mb-3" readOnly="readonly" />
            <label>Username:</label><input size="10"  id="ep-username" className="form-control mb-3" readOnly="readonly" />
            <label>Old Password:</label><input size="10" id="ep-old-psw" className="form-control mb-3" minLength="8" maxLength="20" required/>
            <label>New Password:</label><input size="10" id="ep-new-psw" className="form-control mb-3" readOnly="readonly" minLength="8" maxLength="20"/>
            <label>First name:</label><input size="10" id="ep-first" className="form-control mb-3" readOnly="readonly" required/>
            <label>Last name:</label><input size="10" id="ep-last" className="form-control mb-3" readOnly="readonly" required/>
            <label>City:</label><input size="10" id="ep-city" className="form-control mb-3" readOnly="readonly" />
            <label>Address:</label><input size="10" id="ep-address" className="form-control mb-3" readOnly="readonly" required />
            <label>Gender: </label>
            <label className="radio-inline p-2">
            <input type="radio" name="gender" data-type="gender" id="gender-male" value="male" required/>Male</label>  
            <label className="radio-inline p-2" >
            <input type="radio" name="gender" data-type="gender"  id="gender-female" value="female" required />Female</label>
            <h5>Date of Birth </h5>
            <div className="row">
                <input type="number"  readOnly="readonly" id="sign-up-form-day" name="signup_form[dob_day]"  required="required" max="31" maxLength="2" min="1" pattern="[0-9]*" placeholder="Day" className="dob " data-err="Please enter a valid day of the month"></input>
                <select id="sign-up-form-month"  readOnly="readonly" placeholder="Month" name="signup_form[dob_month]"  required data-err="Please enter your birth month.">
                    
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <input type="number"  readOnly="readonly" id="sign-up-form-year" name="signup_form[dob_year]" required max="2010" maxLength="4" min="1950" pattern="[0-9]*" placeholder="Year" className="dob" data-err="Please enter a valid year." data-msg-number="Please enter a valid year" data-msg-min="Please enter a valid year." data-msg-max="Please enter a valid year. " data-msg-maxlength="Please enter a valid year. "/>
            </div>

            <br></br>

            <br></br>
            <MDBBtn  className="my-button " style={{border:'0px',width:"175px",margin:"20px auto"}} type="submit" onClick={() => this.submitRequest()} >Submit</MDBBtn>
            <Route render={({ history}) => (<MDBBtn color="danger" style={{border:'0px',width:"175px",margin:"20px auto"}} onClick={() => { history.push('/') }}>Cancel</MDBBtn>)} />
            {/* <MDBBtn className="my-button" color="danger" style={{border:'0px',width:"175px",margin:"20px auto"}} type="button"  onClick={this.diableEdit} >Cancel</MDBBtn> */}
            </form>
            </div>
            )}
                
            </div>
        )
    }
}
