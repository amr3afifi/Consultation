import React, { Component } from 'react'
import { MDBBtn } from 'mdbreact';
import {Route,Redirect} from 'react-router-dom'
import "./Auth.css"
import axios from 'axios'
import { ConfigContext } from '../Context/ConfigContext'

/**
 * Matches Component
 * @extends Component
 */

export default class EditProfile extends Component {
    static contextType=ConfigContext;

    state = { 
        // user : {username:'amr3afifi',email:'amr7afifi@gmail.com',first:'Amr',last:"Afifi",day:'26',month:'07',year:'1998',gender:'Male',city:'Giza',address:'oba street',role:'fan'},
        user:{},
        status:'',
        errorMessage:''
    }

    
    enableEdit = () => {
        document.getElementById('ep-new-psw').readOnly=false;
        //document.getElementById('ep-old-psw').readOnly=false;
        document.getElementById('ep-first').readOnly=false;
        document.getElementById('ep-last').readOnly=false;
        document.getElementById('ep-city').readOnly=false;
        document.getElementById('ep-address').readOnly=false;
        document.getElementById('date').readOnly=false;
      }

    diableEdit = () => {
        document.getElementById('ep-new-psw').readOnly=true;
        //document.getElementById('ep-old-psw').readOnly=true;
        document.getElementById('ep-first').readOnly=true;
        document.getElementById('ep-last').readOnly=true;
        document.getElementById('ep-city').readOnly=true;
        document.getElementById('ep-address').readOnly=true;
        document.getElementById('date').readOnly=true;
        console.log(this.state)
       
      }

    componentDidMount =()=>{

        axios.post(this.context.baseURL+"/me",
        {"token": localStorage.getItem('token')}
        ).then(res => {
                if(res.status===200)
                {
                    console.log(res.data.data.newUser)
                    if(res.data.success===true)
                    {
                    this.setState({user: res.data.data.newUser}, this.updateState);
                    }
                    else
                    this.setState({errorMessage: res.data.name});
                }
            })
       
    }

    submitRequest=()=>{
        var first = document.getElementById("ep-first").value;
        var last = document.getElementById("ep-last").value;
        var address = document.getElementById("ep-address").value;
        var city = document.getElementById("ep-city").value;
        var date = document.getElementById("date").value;
        var gender ;
        if(document.querySelector('input[name="gender"]:checked'))
        {gender = document.querySelector('input[name="gender"]:checked').value;}

        if(gender==='' || gender===null)
        {gender=this.state.user.gender}

        if(first==='')
        {
        this.setState({errorMessage: 'First Name Empty '});
        return
        }

        if(last==='')
        {
        this.setState({errorMessage: 'Last Name Empty  '});
        return
        }

        if(address==='')
        {
        this.setState({errorMessage: 'Address Empty '});
        return
        }


        if(date==='' || new Date(date)>new Date())
        {
        this.setState({errorMessage: 'Choose a valid date '});
        return
        }

        if(first===this.state.user.first  && last===this.state.user.last && address===this.state.user.address && city===this.state.user.city &&  date===this.state.user.dateOfBirth )
        {
        this.setState({errorMessage: 'No Changes happened in user to submit  '});
        return
        }
        console.log('here2')
        axios.put(this.context.baseURL+'/me',
        {
        "token": localStorage.getItem('token') ,  
        'first':first,
        "last":last,
        "gender":gender,
        "dateOfBirth": date,
        "address":address,
        "city":city
        }
        ).then(res => {
            if(res.status===200) // Successful
            {
                console.log(res.data)
                if(res.data.success===true)
                {
                this.setState({errorMessage:"User edit submitted"});
                }
                else
                this.setState({errorMessage: res.data.name});

            }
            else
            {            }}).catch(err =>{alert(err)})
    }

    updateState=()=>{
        document.getElementById('ep-email').value=this.state.user.email;
        document.getElementById('ep-username').value=this.state.user.username;
        document.getElementById('ep-first').value=this.state.user.first;
        document.getElementById('ep-last').value=this.state.user.last;
        document.getElementById('ep-city').value=this.state.user.city;
        document.getElementById('ep-address').value=this.state.user.address;
        document.getElementById('date').value=this.state.user.dateOfBirth;
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
            
            <input className="form-control mb-3" readOnly="readonly" style={{margin:'10px 10px', width:"95%", padding:'5px'}} id="date" type="date"></input>

            </div>

            <br></br>

            <br></br>
            <MDBBtn  className="my-button " style={{border:'0px',width:"175px",margin:"20px auto"}} type="button" onClick={() => this.submitRequest()} >Submit</MDBBtn>
            <Route render={({ history}) => (<MDBBtn color="danger" style={{border:'0px',width:"175px",margin:"20px auto"}} onClick={() => { history.push('/') }}>Cancel</MDBBtn>)} />
            {/* <MDBBtn className="my-button" color="danger" style={{border:'0px',width:"175px",margin:"20px auto"}} type="button"  onClick={this.diableEdit} >Cancel</MDBBtn> */}
            {this.state.errorMessage!=='' ?(
            <div style={{padding:"10px",backgroundColor: "#e22134",color:"white",width: "400px",margin: "10px auto 10px auto",textAlign:"center",fontSize:"12px",}}>
            {this.state.errorMessage}</div>):(<div></div>)}
            </div>
            )}
                
            </div>
        )
    }
}
