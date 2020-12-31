import React, { Component } from "react";
import {Link} from 'react-router-dom'
import "mdbreact/dist/css/mdb.css";
import ticketlogo from "../pictures/ticket-logo.png";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";

class Navbar extends Component {

  constructor() {
    super()

    this.state = {
      isOpen: false,
      status: 'not connected',
      userType: ''
    };
}
/**
 * Desktop Navbar Component Mount state Intialization
 * 
 */
componentDidMount = () => {

    this.setState(() => ({}))
    let show = localStorage.getItem("isLoggedIn");
    
    if (show === "true") {
        let type = localStorage.getItem("userType");
        this.setState({ status: "connected" })
        this.setState({ userType: type })
    }
    else {
        this.setState({ status: "not connected" })
    }
}

/**
 * Desktop Navbar function onchange to update state
 * 
 */
componentDidUpdate = () => {

    let show = localStorage.getItem("isLoggedIn");
    if (show === "true" && this.state.status === "not connected") 
    {
        let type = localStorage.getItem("userType");
        this.setState({ status: "connected" })
        this.setState({ userType: type })
    }

}



toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logOut = () => {
  this.setState({ status: "not connected" })
  localStorage.clear();
  window.location.reload(false);
}

render() {
  const logInOrNot = this.state.status;
  const userType = this.state.userType;
  return (
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text m-5 p-2"><img width="20px" src={ticketlogo} alt="eplLogo"></img> E-Ticket</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem >
              <MDBNavLink className=" pr-1 " to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className=" px-4" to="/about">About</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className=" px-4" to="/matches">Matches</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className=" px-4" to="#!">Stadiums</MDBNavLink>
            </MDBNavItem>
            
            
          </MDBNavbarNav>
          <MDBNavbarNav  style={{float:'right',margin:'0 0 0 20px',padding:' 0 10px'}}>
                       
            {userType === "manager"? (
              <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret >Management</MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem ><Link to="/createMatch">Create Match</Link></MDBDropdownItem>
                  <MDBDropdownItem ><Link to="/addStadium">Add Stadium</Link></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              </MDBNavItem>

              )
              :
              (<div></div>)}


            {logInOrNot === "connected" ? (


                            <MDBNavItem>
                            <MDBDropdown>
                              <MDBDropdownToggle nav caret >Hello, Amr <em></em>
                                <MDBIcon icon="user" />
                              </MDBDropdownToggle>
                              <MDBDropdownMenu className="dropdown-default">
                                <MDBDropdownItem><Link to="/reservations">My Reservations</Link></MDBDropdownItem>
                                <MDBDropdownItem><Link to="/editProfile">Edit Profile</Link></MDBDropdownItem>
                                <MDBDropdownItem onClick={() => this.logOut()}><Link to="/">Log Out</Link></MDBDropdownItem>
                              </MDBDropdownMenu>
                            </MDBDropdown>
                            </MDBNavItem>

                          )
                          :
                          (
                          <div>
                              
                                  <MDBNavItem style={{padding:'5px 0',display:'inline-block',width:'110px'}} ><MDBNavLink className=" px-4" to="/signup">Sign Up</MDBNavLink></MDBNavItem>

                                  <MDBNavItem style={{padding:'5px 0',display:'inline-block',width:'110px'}}><MDBNavLink className=" px-4" to="/login">Login</MDBNavLink></MDBNavItem>
                          </div>
                          )}

                         
            
          </MDBNavbarNav>
                                  
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Navbar;