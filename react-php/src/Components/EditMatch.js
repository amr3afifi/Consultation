import React, { Component } from 'react'
import football from '../pictures/football.png'
import {Route,Redirect} from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBCardImage,MDBCardHeader, MDBCardTitle, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import axios from 'axios'
import {ConfigContext} from '../Context/ConfigContext'

import './Auth.css'
/**
 * Matches Component
 * @extends Component
 */

export default class EditMatch extends Component {
    static contextType=ConfigContext;
    constructor() {
        super()
        
        this.state = { 
            teams : ['AL-Ahly','Al-Zamalek','Enppi'],
            team1:'AL-Ahly',
            team2:'Al-Zamalek',
            date:'2021-01-01',
            time:'23:50',
            stadium:'Cairo',
            stadiums : ['Cairo','Alex','Al Salam'],
            status:''
        }
        

    }
    
    submitRequest=()=>{
        this.setState({status:"connected"})
    }

    selectTeams =(changedSelect,selectId)=>{

        if(selectId==='team1')
        changedSelect='team2';
        else
        changedSelect='team1';

        changedSelect=document.getElementById(changedSelect);
        var otherSelect = document.getElementById(selectId);
        for (var i = 0; i < otherSelect.options.length; ++i) {
            otherSelect.options[i].disabled = false;
        }

        otherSelect.options[changedSelect.selectedIndex].disabled = true;
       
        
        
    }
    componentDidMount =()=>{
        
        axios.get(this.context.baseURL+'/editMatch').then(res => {
            if(res.status===200) // Successful
            {
                console.log(res.data);
                if(res.data.success===true)
                {
                    this.setState({matches: res.data.matches});
                }
            }
            else
            {      alert(res)          }}).catch(err =>{alert(err)})
        //Get request edit match

        var select = document.getElementById("team1")
        for (var i = 0; i < this.state.teams.length; i++) { 

            
            var optn = this.state.teams[i]; 
            var el = document.createElement("option"); 
            el.textContent = optn; 
            el.value = optn; 
            select.appendChild(el); 
            if(optn===this.state.team2)
            {
                select.options[i].disabled = true;
            }
        } 
        select.value = this.state.team1;

        select = document.getElementById("team2");
        for (i = 0; i < this.state.teams.length; i++) { 
            
            optn = this.state.teams[i]; 
            el = document.createElement("option"); 
            el.textContent = optn; 
            el.value = optn; 
            select.appendChild(el); 
            if(optn===this.state.team1)
            {
                select.options[i].disabled = true;
            }
        } 
        select.value = this.state.team2;

        select = document.getElementById("stadium");
        for (i = 0; i < this.state.stadiums.length; i++) { 
            optn = this.state.stadiums[i]; 
            el = document.createElement("option"); 
            el.textContent = optn; 
            el.value = optn; 
            select.appendChild(el); 
        } 
        select.value = this.state.stadium;

        select = document.getElementById("date");
        select.value = this.state.date;

        select = document.getElementById("time");
        select.value = this.state.time;
    }
    

    render() {
        const submitOrNot = this.state.status;
        return (
            
        <MDBRow>
            {submitOrNot==="connected" ? (
            <div>
            <Redirect to="/matches"/>
            </div>
            )
            :
            (
                <div style={{ width:'100%' , minWidth: '400px', maxWidth:'1200px', margin:'1% auto' }}>
                <MDBCol className=" p-5 text-center" style={{ margin:'1% auto',}}>
                  <MDBCard reverse>
                  <MDBCardHeader color="default-color">Create Match</MDBCardHeader>
                    <MDBCardImage  className="ml-5" cascade style={{ margin:'0px auto 10px auto',width:'100%', minWidth: '320px' ,minHeight: '280px' }} src={football} alt="stadium" />
                    <MDBCardBody cascade className="p-3">
                      <MDBCardTitle></MDBCardTitle>                
                    <div className="row">
                        <h6>Team 1</h6>
                    <select onChange={() => this.selectTeams(this,'team2')} style={{margin:'10px auto', width:"50%", padding:'5px',border:'None'}} id="team1" >  
                    </select>
                    </div>
    
                    <div className="row">
                    <h6>Team 2</h6>
                    <select  onChange={() => this.selectTeams(this,'team1')} style={{margin:'10px auto', width:"50%", padding:'5px',border:'None'}}id="team2" >
                    </select>
                    </div>
                    
                    <div className="row">
                    <h6>Stadium</h6>
                    <select  style={{margin:'10px auto', width:"50%", padding:'5px',border:'None'}} id="stadium" >
                    </select>
                    </div>
    
                    <h6>Date & Time</h6>
                    
                    <input id="date" style={{margin:'10px 10px', width:"50%", padding:'5px'}}  type="date"></input>
    
                    <div style={{display:'inline-block'}} className="row">
                    <input id="time" style={{margin:'10px 10px', width:"130px", padding:'5px'}} type="time"></input>
                    </div>
    
                    
                    
                    
    
                    <br></br>
                    <MDBBtn  className="my-button " style={{border:'0px',width:"175px",margin:"20px auto"}} type="button" onClick={() => this.submitRequest()} >Submit</MDBBtn>
                    <Route render={({ history}) => (<MDBBtn color="danger" style={{border:'0px',width:"175px",margin:"20px auto"}} onClick={() => { history.push('/matches') }}>Cancel</MDBBtn>)} />
    
                    </MDBCardBody>
                  </MDBCard>  
                </MDBCol>
                </div>
                )}
                
            

            
        </MDBRow>
        )
    }
}
