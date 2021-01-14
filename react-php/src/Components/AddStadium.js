import React, { Component } from 'react'
import staidum from '../pictures/stadium.png'
import { MDBCard, MDBCardBody, MDBCardImage,MDBCardHeader, MDBRow, MDBCol } from 'mdbreact';
import axios from 'axios'
import {ConfigContext} from '../Context/ConfigContext'

import './Auth.css'
/**
 * Matches Component
 * @extends Component
 */
export default class AddStadium extends Component {
  static contextType=ConfigContext;

  state = {
    errorMessage:''
  }


  addRequest = () => {

    let st_name=document.getElementById('st-name').value;
    let st_rows=document.getElementById('st-rows').value;
    let st_seats=document.getElementById('st-seats').value;
    console.log(st_name.length)
    if(st_name==='' || st_name.length<6)
    {
      this.setState({errorMessage: 'Enter stadium name with minLength of 6 characters '});
      return
    }

    if(Number(st_rows)<=0 || Number(st_rows)>30)
    {
      this.setState({errorMessage: 'Enter value of rows between 1 and 30 for vip area'});
      return
    }

    if(Number(st_seats)<=0 || Number(st_seats)>30)
    {
      this.setState({errorMessage: 'Enter value of seats between 1 and 30 for vip area'});
      return
    }

    axios.post(this.context.baseURL+'/createStadium',
    {
      "name": st_name,
      "rows": st_rows,
      "seats": st_seats
  }
    ).then(res => {
      if(res.status===200) // Successful
      {
        console.log(res.data)
          if(res.data.success===true)
          {
            this.setState({errorMessage: 'Stadium Created Successfully'});
          }
          else
          {
              this.setState({errorMessage: res.data.name});
          }
      }
      else
      {      alert(res)          }}).catch(err =>{alert(err)})

  }

    render() {
        return (
            
        <MDBRow>
            
            <div style={{ width:'100%' , minWidth: '400px', maxWidth:'1200px', margin:'1% auto' }}>
              
            <MDBCol className=" p-5 text-center" style={{ margin:'1% auto',}}>

              <MDBCard reverse>
              <MDBCardHeader color="default-color">Add Stadium</MDBCardHeader>
                <MDBCardImage  className="ml-5" cascade style={{ margin:'0px auto 10px auto',width:'100%', minWidth: '320px' , height: '80%',minHeight: '280px' }} src={staidum} alt="stadium" />
                <MDBCardBody cascade className="p-3">
        
                <label>Name:</label><input style={{margin:'10px auto', width:"60%", padding:'5px'}} size="10" type="text" id="st-name" className="form-control mb-3" minLength="8" maxLength="20" required/>
                {/* <label>Location:</label><input style={{margin:'10px auto', width:"60%", padding:'5px'}} size="10" type="text" className="form-control mb-3"  minLength="8" maxLength="20"/> */}
                <label>#Rows </label><input style={{margin:'0 20px',display:'inline-block', width:'12%'}}size="10"  id="st-rows"type="number" className="form-control mb-3"  required/>
                <label> #Seats &nbsp;  </label><input style={{display:'inline-block', width:'12%'}} size="10" type="number"  id="st-seats"  className="form-control mb-3" required/>
                <br></br>
                <button  className="my-button " style={{border:'0px',width:"175px",margin:"20px auto"}} type="button" onClick={() => this.addRequest()} >Add</button>


                {this.state.errorMessage!=='' ?(
            <div style={{padding:"10px",backgroundColor: "#e22134",color:"white",width: "400px",margin: "10px auto 10px auto",textAlign:"center",fontSize:"12px",}}>
            {this.state.errorMessage}</div>):(<div></div>)}

                </MDBCardBody>
              </MDBCard>  
            </MDBCol>
            </div>
        </MDBRow>
        )
    }
}
