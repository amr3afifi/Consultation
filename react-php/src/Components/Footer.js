import React from "react";
import "mdbreact/dist/css/mdb.css";
import eplLogo from "../pictures/epl-logo.png";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="default-color" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="5">
            <h5 className="title">The Egyptian Premier League - الدوري المصري الممتاز</h5>
            <p>
            (Sponsored by Presentation Sports)
            </p>
            <img width="200px " src={eplLogo} alt="eplLogo"></img>          
            </MDBCol>
          <MDBCol md="3 center">
            <h5 className="title ">Navigation</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Home</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">About</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">History</a>
              </li>
             
            </ul>
          </MDBCol>

          <MDBCol md="3 center">
            <h5 className="title">HyperLinks</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!"> Scores</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Refrees</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Clubs</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Stadiums</a>
              </li>
            </ul>
          </MDBCol>

        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
      © EGYPTIAN LEAGUE 2020
      
      </div>
    </MDBFooter>
  );
}

export default Footer;