import React, { Component } from 'react'
import './Movie.css'
import pitch from '../pictures/pitch.jpg'
import {Route} from 'react-router-dom'
import axios from 'axios'
import {ConfigContext} from '../Context/ConfigContext'
import { MDBBtn } from 'mdbreact';


/**
 * Matches Component
 * @extends Component
 */
export default class ReserveSeats extends Component {
    static contextType=ConfigContext;

    constructor(props) {
        super(props);
        this.state = { 
            id: window.location.pathname.replace('/reserveSeats/',''),
            errorMessage:'',
            match:{},
            rows :'5',
            seatsInRow:'20',
                seats:[0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1.0,1,0,0,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1.0,1,0,0
                ,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1.0,1,0,0,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1,0,1,0,0
            ,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1.0,1,0,0,0],
            selected:[] }
    }


      getMatchRequest = () => {
        axios.put(this.context.baseURL+'/getMatch',
        {"id":this.state.id}
        ).then(res => {
            if(res.status===200) // Successful
            {
                if(res.data.success===true)
                {
                this.setState({seats: res.data.data.match.seats});
                this.setState({match: res.data.data.match}, this.getStadiumRequest);
                }
            }
            else
            {            }}).catch(err =>{alert(err)})
      }

      getStadiumRequest = () => {
        axios.put(this.context.baseURL+'/getStadium',
        {"name":this.state.match.stadium}
        ).then(res => {
            if(res.status===200) // Successful
            {
                if(res.data.success===true)
                {
                this.setState({rows: res.data.data.stadium.rows});
                this.setState({seatsInRow: res.data.data.stadium.seats}, this.setIntials);
                }

            }
            else
            {            }}).catch(err =>{alert(err)})
      }

      setIntials = ()=>
      {
        let r=Number(this.state.rows)
        let c=Number(this.state.seatsInRow)
        let cont = document.getElementById("vip");
        let seats=this.state.seats

        for (let i = 0; i < r; i++) { 
            
            let row = document.createElement("div"); 
            row.className='row'
            for (let j = 0; j < c; j++) { 

                let el = document.createElement("div"); 
                el.className='seat'
                el.innerHTML = (i*c)+j; 
                if(seats[(i*c)+j]===1)
                {
                    el.className='seat occupied' 
                }
                row.appendChild(el); 

            }
           
            cont.appendChild(row); 
            
        } 
      }

      componentDidMount()
      {
        this.getMatchRequest();
        window.addEventListener("click",  e => {
            if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) 
            {
                e.target.classList.toggle('selected');
                this.updateSelectedSeatsCount();
              
            }
            
          });
      }

      updateSelectedSeatsCount () {
        const selectedSeats = document.querySelectorAll('.row .selected');
        let selectedarray=[];
        for (var i=0;i<selectedSeats.length;i++)
        {
            
            selectedarray.push(selectedSeats[i].textContent)
        }
    console.log(selectedarray);
        
      };

      reserveRequest()
      {
        axios.put(this.context.baseURL+'/me/bookMatch',
        {"token": localStorage.getItem('token') ,  
        "matchid":this.state.id,
        "seats":this.state.selected,
        "date":new Date()
        }
        ).then(res => {
            if(res.status===200) // Successful
            {
                if(res.data.success===true)
                {
                    alert('Seats booked successfully');
                    window.location.reload(false);
                }
                else
                this.setState({errorMessage: res.data.name});

            }
            else
            {            }}).catch(err =>{alert(err)})
      }
      submitRequest()
      {
          let cc1=Number(document.getElementById('cc1').value);
          let cc2=Number(document.getElementById('cc2').value);
          let cc3=Number(document.getElementById('cc3').value);
          let cc4=Number(document.getElementById('cc4').value);
          if( cc1>0 && cc1<9999 && cc2>0 && cc2<9999 && cc3>0 && cc3<9999 && cc4>0 && cc4<9999)
          {
            const selectedSeats = document.querySelectorAll('.row .selected');
            if(selectedSeats.length>0)
            {
                const selectedSeats = document.querySelectorAll('.row .selected');
                let selectedarray=[];
                for (var i=0;i<selectedSeats.length;i++)
                {
                    
                    selectedarray.push(selectedSeats[i].textContent)
                }
                this.setState({selected:selectedarray},this.reserveRequest)
            }
            else{
                this.setState({errorMessage: 'Please select seats to book'})
            }
          }
          else{
              this.setState({errorMessage: 'Please fill credit card no with valid values'})
          }

      }

      componentWillUnmount() {
        window.location.reload(false);
      }

      


    render() {
        return (
            <div  id="movie">
            


                <ul className="showcase">
                <li>
                    <div className="seat"></div>
                    <small>Available</small>
                </li>
                <li>
                    <div className="seat selected"></div>
                    <small>Selected</small>
                </li>
                <li>
                    <div className="seat occupied"></div>
                    <small>Occupied</small>
                </li>
                </ul>

                <div className="container" id="vip">
                </div>

                <div className="container" id="vip2">
                </div>

                <img className="ml-5" cascade style={{ margin:'0px auto 10px auto',width:'50%', minWidth: '320px' ,minHeight: '280px' }} src={pitch} alt="pitch" />
                <br></br><br></br><br></br>
                <div className="row">
                <div className="col-xs-12">
                    <div className="divider">
                    <strong className="divider-title ng-binding">Credit Card No</strong>
                    </div>
                </div>

                <input style={{width:"80px",display:'inline-block'}} type="number" id="cc1" required="required" max="9999" maxLength="4" minLength="4" min="0000" pattern="[0-9]*" ></input>
                -<input style={{width:"80px",display:'inline-block'}} type="number" id="cc2" required="required" max="9999" maxLength="4" min="0000" pattern="[0-9]*" ></input>
                -<input style={{width:"80px",display:'inline-block'}} type="number" id="cc3" required="required" max="9999" maxLength="4" min="0000" pattern="[0-9]*" ></input>
                -<input style={{width:"80px",display:'inline-block'}} type="number" id="cc4" required="required" max="9999" maxLength="4" min="0000" pattern="[0-9]*" ></input>


                </div>
                <div className="row">
                <MDBBtn  className="my-button " style={{border:'0px',width:"175px",margin:"20px auto"}} type="button" onClick={() => this.submitRequest()} >Book</MDBBtn>
                <Route render={({ history}) => (<MDBBtn color="danger" style={{border:'0px',width:"175px",margin:"20px auto"}} onClick={() => { history.push('/matches') }}>Cancel</MDBBtn>)} />
                </div>

                {this.state.errorMessage!=='' ?(
            <div style={{padding:"10px",backgroundColor: "#e22134",color:"white",width: "400px",margin: "10px auto 10px auto",textAlign:"center",fontSize:"12px",}}>
            {this.state.errorMessage}</div>):(<div></div>)}

            </div>
        )
    }
}
