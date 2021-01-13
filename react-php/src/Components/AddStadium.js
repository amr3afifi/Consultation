import React, { Component } from 'react'
import staidum from '../pictures/stadium.png'
import { MDBCard, MDBCardBody, MDBCardImage,MDBCardHeader, MDBRow, MDBCol } from 'mdbreact';

import './Auth.css'
/**
 * Matches Component
 * @extends Component
 */
export default class AddStadium extends Component {

    render() {
        return (
            
        <MDBRow>
            
            <div style={{ width:'100%' , minWidth: '400px', maxWidth:'1200px', margin:'1% auto' }}>
            <MDBCol className=" p-5 text-center" style={{ margin:'1% auto',}}>
              <MDBCard reverse>
              <MDBCardHeader color="default-color">Add Stadium</MDBCardHeader>
                <MDBCardImage  className="ml-5" cascade style={{ margin:'0px auto 10px auto',width:'100%', minWidth: '320px' , height: '80%',minHeight: '280px' }} src={staidum} alt="stadium" />
                <MDBCardBody cascade className="p-3">
        
                <label>Name:</label><input style={{margin:'10px auto', width:"60%", padding:'5px'}} size="10" type="text" className="form-control mb-3" minLength="8" maxLength="20" required/>
                {/* <label>Location:</label><input style={{margin:'10px auto', width:"60%", padding:'5px'}} size="10" type="text" className="form-control mb-3"  minLength="8" maxLength="20"/> */}
                <label>#Rows </label><input style={{margin:'0 20px',display:'inline-block', width:'12%'}}size="10" id="ep-first" type="number" className="form-control mb-3"  required/>
                <label> #Seats &nbsp;  </label><input style={{display:'inline-block', width:'12%'}} size="10" type="number"  className="form-control mb-3" required/>
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
