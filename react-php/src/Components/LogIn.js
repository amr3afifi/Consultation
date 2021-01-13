import React, { Component } from 'react';
import './Auth.css'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {ConfigContext} from '../Context/ConfigContext'

/**
 * Login Page Component
 * @extends Component
 */
class LogIn extends Component {
    static contextType=ConfigContext;

    constructor() {
        super()
        
    this.state ={
        user:{
            email:'',
            password:''
               },
        rememberme:false,
        emptypass:false,
        emptyemail:false,
        status: 'not connected',
        invalid:false,
        errorMessage: ''
    }

    }

     /**
     * Component Mount state Intialization
     * 
     */
    componentDidMount =()=>{

        this.setState(()=> ({}))
        
          let show=localStorage.getItem("isLoggedIn");
          
          if(show==="true")
          this.setState({status:"connected"})
            else  
          this.setState({status:"not connected"})
       
    }
     /**
     * Function to check the Email textbox has valid email format
     * @param {string} Email - user email.
     */
    validateEmail(email) {
        if(this.state.emptyemail===true)
            this.setState({emptyemail: false});
        return this.checkValidity(email,"email");
    }

    checkValidity = ( value, type ) => {
        let isValid = true;
        if(value===undefined || value==="" || value===null)return false
        if(type==="email")
        {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }
    
        if(type==="pass")
        {
            isValid = value.length >= 8 && isValid
        }
    
        if(type==="username")
        {
            const pattern = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
            isValid = pattern.test( value ) && isValid
        }
    
        if(type==="gender")
        {
            if(value===0 || value===1)
            isValid=true;
            else
            isValid=false;
        }
    
        return isValid;
    }

    /**
     * Function to check the Password textbox has valid password criteria
     * @param {string} Password - user password.
     */
    validatePassword(psw) {
        if(this.state.emptypass===true)
         this.setState({emptypass: false});
         return this.checkValidity(psw,"pass");
    }
      /**
     * Function handling login request with Email and Password
     * 
     */
    handleLogin = event=> {   
        event.preventDefault();
        const user={email:this.state.email,password:this.state.password}
        const memail = user.email;
        const mpsw = user.password;
        const is_email_valid = this.validateEmail(memail);
        const is_psw_valid = this.validatePassword(mpsw);

        if((this.state.user.email==="" && this.state.emptyemail===false) || !is_email_valid)
            this.setState({emptyemail: true});
        if((this.state.user.password==="" && this.state.emptypass===false) || !is_psw_valid)
            this.setState({emptypass: true});

        if(is_email_valid && is_psw_valid)
        {
            // Request Login

            axios.post(this.context.baseURL+'/signIn',
            {"email":memail,
             "password":mpsw
            }
            ).then(res => {
                console.log(res.data);
                if(res.status===200) // Successful
                {
                    
                    if(res.data.success===true)
                    {
                         localStorage.setItem("isLoggedIn",'true');
                         this.setState({status: 'connected'});
                         localStorage.setItem("userType",res.data.role);
                         localStorage.setItem("token",res.data.token);
                         window.location.reload(false);
                    }
                    else
                    {
                        this.setState({errorMessage: res.data.name});
                    }
                }
                else
                {               }}).catch(err =>{alert(err)})

        } 
    }

     /**
     * Function handling change in password textbox to the page's state
     * 
     */
    handlePasswordChange = event=> {
        event.preventDefault();
        if(this.state.emptypass===true)
        this.setState({emptypass: false});
        var newpass=event.target.value;
        this.setState({password: event.target.value});
        let userCopy = JSON.parse(JSON.stringify(this.state.user))
        userCopy['password'] = newpass;
        this.setState({
             user:userCopy 
            })
    }

    /**
     * Function handling change in email textbox to the page's state
     * 
     */
    handleEmailChange = event=> {
        event.preventDefault();
        if(this.state.emptyemail===true)
        this.setState({emptyemail: false});
        var newemail=event.target.value;
        this.setState({email: event.target.value});
        let userCopy = JSON.parse(JSON.stringify(this.state.user))
        userCopy['email'] = newemail;
        this.setState({
             user:userCopy 
            }) 
    }

    render(){  
        const logInOrNot = this.state.status;  
    return (
        
        <div id="my-sign-up">
            {logInOrNot==="connected" ? (
            <div>
            <Redirect to="/"/>
            </div>
            )
            :
            (
                <div style={{minHeight:'80vh'}}>
                {/* <img id="logo" src={spotify_black_logo} alt=""/> */}
                    <hr/>
            <div className="center-box-2">
        

            {this.state.errorMessage!=='' ?
            (
            <div id="invalid-message">
            {this.state.errorMessage}
            </div>
            )
            :
            (
            <div>
            </div>
            )
            }
             
            <form className="text-center p-2" action="">
            
                <div className="col-xs-12">
                    <div className="divider">
                    <strong className="divider-title ng-binding">LOGIN</strong>
                    </div>
                </div>
           

            <input required type="email" id="form-email" onChange={this.handleEmailChange} className="form-control" placeholder="Email address"/>

            {this.state.emptyemail===true?
            <div id="empty-email" className="error-message">
            Please enter a valid email address.
            </div>
            :
            <div>
            </div>
            }

            <input required type="password" id="form-password" maxLength="30" minLength="8" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock" />

            {this.state.emptypass===true?
            <div id="empty-pass" className="error-message">
            Please enter a valid password. (Minimum Length=8)
            </div>
            :
            <div>
            </div>
            }

            <br/>
            <div className="custom-control custom-checkbox" id="remember-me">
                <input type="checkbox" className="custom-control-input" id="defaultUnchecked"/>
                <label className="custom-control-label" htmlFor="defaultUnchecked">Remember me</label>
            </div>

            <button id="login" type="button" className="my-button" onClick={this.handleLogin}>LOG IN</button>
            <br/>
            <Link to="/password-reset">Forgot your password?</Link>
            <hr/><br/>
            <h6>Don't have an account?</h6>
            <Link to="/signup"><button type="button" className="my-button" id="sign-up-now">SIGN UP FOR E-Ticket</button></Link>
            <hr/>
            <p> you will be registered and agree to E-Ticket's 
            <a href="https://www.spotify.com/eg-en/legal/end-user-agreement/" target="_blank "> Terms and Conditions</a> and
            <a href="https://www.spotify.com/eg-en/legal/privacy-policy/" target="_blank "> Privacy Policy</a>.</p>
            </form>      
        
            </div>
            </div>
            )
            }   
        </div>
    );
}

}

export default LogIn;