import React, { Component } from 'react'
import football from '../pictures/football.png'
import { MDBCard, MDBCardBody, MDBCardImage,MDBCardHeader, MDBCardTitle, MDBRow, MDBCol } from 'mdbreact';

import './Auth.css'
/**
 * Matches Component
 * @extends Component
 */

export default class CreateMatch extends Component {

    state = { 
        teams : ['AL-Ahly','Al-Zamalek','Enppi'],
        stadiums : ['Cairo','Alex','Al Salam']
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

        var select = document.getElementById("team1")
        for (var i = 0; i < this.state.teams.length; i++) { 

            
            var optn = this.state.teams[i]; 
            var el = document.createElement("option"); 
            el.textContent = optn; 
            el.value = optn; 
            select.appendChild(el); 
            
        } 
        select.options[1].disabled = true;

        select = document.getElementById("team2");
        for (i = 0; i < this.state.teams.length; i++) { 
            
            optn = this.state.teams[i]; 
            el = document.createElement("option"); 
            el.textContent = optn; 
            el.value = optn; 
            select.appendChild(el); 
        } 
        select.options[0].disabled = true;
        select.value = this.state.teams[1];

    select = document.getElementById("stadium");
    for (i = 0; i < this.state.stadiums.length; i++) { 
        optn = this.state.stadiums[i]; 
        el = document.createElement("option"); 
        el.textContent = optn; 
        el.value = optn; 
        select.appendChild(el); 
    } 

    }

    render() {
        return (
            
        <MDBRow>
            
                
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

                <div className="row">
                <h6>Refree</h6>
                <input type="text" style={{margin:'10px auto', width:"50%", padding:'5px'}} id="refree" >
                </input>
                </div>

                <div className="row">
                <label style={{margin:'10px auto', width:"40%", padding:'5px'}}>Lineman 1</label>
                <label style={{margin:'10px auto', width:"40%", padding:'5px'}}>Lineman 2</label>
                </div>
                <div className="row">
                <input  type="text" style={{margin:'15px auto', width:"30%", padding:'5px'}} id="lineman1" ></input>
                <input  type="text" style={{margin:'15px auto', width:"30%", padding:'5px'}} id="lineman2" ></input>
                </div>

                <h6>Date & Time</h6>
                
                <input style={{margin:'10px 10px', width:"50%", padding:'5px'}}  type="date"></input>

                <div style={{display:'inline-block'}} className="row">
                <input style={{margin:'10px 10px', width:"130px", padding:'5px'}} type="time"></input>
                </div>

                
                
                

                <br></br>
                <button  className="my-button " style={{border:'0px',width:"175px",margin:"20px auto"}} type="button" onClick={{}}>Add</button>

                </MDBCardBody>
              </MDBCard>  
            </MDBCol>
            </div>

            
        </MDBRow>
        )
    }
}
