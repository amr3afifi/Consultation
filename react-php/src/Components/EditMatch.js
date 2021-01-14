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
            id: window.location.pathname.replace('/editMatch/',''),
            match:{},
            stadiums:[],
            teams:[],
            status:'',
            errorMessage:'',
        }
        

    }
    
    submitRequest=()=>{
        var team1 = document.getElementById("team1").value;
        var team2 = document.getElementById("team2").value;
        var stadium = document.getElementById("stadium").value;
        var refree = document.getElementById("refree").value;
        var lineman1 = document.getElementById("lineman1").value;
        var lineman2 = document.getElementById("lineman2").value;
        var date = document.getElementById("date").value;
        var time = document.getElementById("time").value;
        
        if(team1==='')
        {
        this.setState({errorMessage: 'Select Team 1 '});
        return
        }

        if(team2==='')
        {
        this.setState({errorMessage: 'Select Team 2 '});
        return
        }

        if(stadium==='')
        {
        this.setState({errorMessage: 'Select stadium '});
        return
        }

        if(refree==='')
        {
        this.setState({errorMessage: 'Enter refree '});
        return
        }

        if(lineman1==='')
        {
        this.setState({errorMessage: 'Enter lineman1 '});
        return
        }

        if(lineman2==='')
        {
        this.setState({errorMessage: 'Enter lineman2 '});
        return
        }

        if(date==='' || new Date(date)<=new Date())
        {
        this.setState({errorMessage: 'Choose a valid future date '});
        return
        }

        if(time==='')
        {
        this.setState({errorMessage: 'Choose time  '});
        return
        }

        if(team1===this.state.match.team1  && team2===this.state.match.team2 && stadium===this.state.match.stadium && refree===this.state.match.refree && lineman1===this.state.match.lineman1 && lineman2===this.state.match.lineman2 && date===this.state.match.date && time===this.state.match.time)
        {
        this.setState({errorMessage: 'No Changes happened in match to submit  '});
        return
        }

        axios.put(this.context.baseURL+'/editMatch',
        {"id":this.state.id,
        'team1':team1,
        "team2":team2,
        "stadium":stadium,
        "refree": refree,
        "lineman1":lineman1,
        "lineman2":lineman2,
        "date":date,
        "time":time
        }
        ).then(res => {
            if(res.status===200) // Successful
            {
                console.log(res.data)
                if(res.data.success===true)
                {
                this.setState({errorMessage:"Match edit submitted"});
                }
                else
                this.setState({errorMessage: res.data.name});

            }
            else
            {            }}).catch(err =>{alert(err)})
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

    initalFnTeams = () => {
        var select = document.getElementById("team1")
        for (var i = 0; i < this.state.teams.length; i++) { 

            var optn = this.state.teams[i]; 
            var el = document.createElement("option"); 
            el.textContent = optn; 
            el.value = optn; 
            select.appendChild(el); 
            if(this.state.teams[i]===this.state.match.team2)
                select.options[i].disabled = true;
            
        } 
        select.value = this.state.match.team1;

        select = document.getElementById("team2");
        for (i = 0; i < this.state.teams.length; i++) { 
            
            optn = this.state.teams[i]; 
            el = document.createElement("option"); 
            el.textContent = optn; 
            el.value = optn; 
            select.appendChild(el); 
            if(this.state.teams[i]===this.state.match.team1)
                select.options[i].disabled = true;
        } 
        select.value = this.state.match.team2;
      }

      initalFnStadiums = () => {
        var select = document.getElementById("stadium")
        for (var i = 0; i < this.state.stadiums.length; i++) { 

            var optn = this.state.stadiums[i]; 
            var el = document.createElement("option"); 
            el.textContent = optn; 
            el.value = optn; 
            select.appendChild(el); 
        } 
        select.value = this.state.match.stadium;
      }
      
      getMatchRequest = () => {
        axios.put(this.context.baseURL+'/getMatch',
        {"id":this.state.id}
        ).then(res => {
            if(res.status===200) // Successful
            {
                if(res.data.success===true)
                {
                this.setState({match: res.data.data.match}, this.setIntials);
                }
            }
            else
            {            }}).catch(err =>{alert(err)})
      }

      setIntials = ()=>
      {
        let teamsarray=[];
        let teamsnames=[];
        axios.get(this.context.baseURL+'/clubs').then(res => {
        if(res.status===200) // Successful
        {
            if(res.data.success===true)
            {
                //  this.setState({teams: res.data.data.clubs});
                teamsarray=res.data.data.clubs;
                teamsarray.forEach(function (arrayItem) 
                {
                    teamsnames.push(arrayItem.name);        
                });
                this.setState({teams: teamsnames}, this.initalFnTeams);
            }
        }
        else
        {      alert(res)          }}).catch(err =>{alert(err)})

        let stadiumsarray=[];
        let stadiumsnames=[];
        axios.get(this.context.baseURL+'/stadiums').then(res => {
            if(res.status===200) // Successful
            {
                if(res.data.success===true)
                {
                    stadiumsarray=res.data.data.stadiums;
                    stadiumsarray.forEach(function (arrayItem) 
                    {
                        stadiumsnames.push(arrayItem.name);        
                    });
                    this.setState({stadiums: stadiumsnames}, this.initalFnStadiums);
                }
            }
            else
            {      alert(res)          }}).catch(err =>{alert(err)})

        //Get request edit match

        let select = document.getElementById("date");
        select.value = this.state.match.date;
    

        select = document.getElementById("time");
        select.value = this.state.match.time;

        select = document.getElementById("refree");
        select.value = this.state.match.refree;

        select = document.getElementById("lineman1");
        select.value = this.state.match.lineman1;

        select = document.getElementById("lineman2");
        select.value = this.state.match.lineman2;
      }

    componentWillMount =()=>{
              
    this.getMatchRequest();
        
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
                  <MDBCardHeader color="default-color">Edit Match</MDBCardHeader>
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
                    
                    <input id="date" style={{margin:'10px 10px', width:"50%", padding:'5px'}}  type="date"></input>
    
                    <div style={{display:'inline-block'}} className="row">
                    <input id="time" style={{margin:'10px 10px', width:"130px", padding:'5px'}} type="time"></input>
                    </div>
    
                    
                    
                    
    
                    <br></br>
                    <MDBBtn  className="my-button " style={{border:'0px',width:"175px",margin:"20px auto"}} type="button" onClick={() => this.submitRequest()} >Submit</MDBBtn>
                    <Route render={({ history}) => (<MDBBtn color="danger" style={{border:'0px',width:"175px",margin:"20px auto"}} onClick={() => { history.push('/matches') }}>Cancel</MDBBtn>)} />

                    {this.state.errorMessage!=='' ?(
            <div style={{padding:"10px",backgroundColor: "#e22134",color:"white",width: "400px",margin: "10px auto 10px auto",textAlign:"center",fontSize:"12px",}}>
            {this.state.errorMessage}</div>):(<div></div>)}
                    </MDBCardBody>
                  </MDBCard>  
                </MDBCol>
                </div>
                )}
                
            

            
        </MDBRow>
        )
    }
}
