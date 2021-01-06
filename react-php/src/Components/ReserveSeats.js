import React, { Component } from 'react'
import './Movie.css'
import pitch from '../pictures/pitch.jpg'


/**
 * Matches Component
 * @extends Component
 */
export default class ReserveSeats extends Component {
    

    constructor(props) {
        super(props);
        this.state = { rows :'5',
                    seatsInRow:'20',
                seats:[0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1.0,1,0,0,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1.0,1,0,0
                ,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1.0,1,0,0,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1,0,1,0,0
            ,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1.0,1,0,0,0],
            selected:[] }
    }

      

    componentWillMount() {

        window.addEventListener("click",  e => {
            if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) 
            {
                e.target.classList.toggle('selected');
                this.updateSelectedSeatsCount();
              
            }
            
          });

        

      }

      componentDidMount()
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

      updateSelectedSeatsCount () {
        const selectedSeats = document.querySelectorAll('.row .selected');
        console.log(selectedSeats[0])
        
      };

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

                
            </div>
        )
    }
}
