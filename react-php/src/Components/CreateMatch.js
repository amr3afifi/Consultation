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

    componentDidMount =()=>{
        
       console.log(1)
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
                <label>Team1:</label><input size="10" type="text" className="form-control mb-3" minLength="8" maxLength="20" required/>
                <div className="row">
                <select id="team1" >
                    <option>a</option>
                </select>
            </div>
                <label>Team2:</label><input size="10" type="text" className="form-control mb-3"  minLength="8" maxLength="20"/>
                <label>Stadium: </label><input style={{margin:'0 20px',display:'inline-block', width:'15%'}}size="10" id="ep-first" type="number" className="form-control mb-3"  required/>
                <br></br>
                <button  className="my-button " style={{border:'0px',width:"175px",margin:"20px auto"}} type="button" >Add</button>

                </MDBCardBody>
              </MDBCard>  
            </MDBCol>
            </div>
        </MDBRow>
        )
    }
}
