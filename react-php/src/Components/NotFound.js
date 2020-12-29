import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './NotFound.css'

/**
 * Not Found Page Component
 * @extends Component
 */
export default class NotFound extends Component {
    render() {
        return (
            <div id="my-not-found" style={{minHeight:'80vh'}}>
                <div id="text">
                    <br/><br/><br/>
                <h1>404s and heartbreaks</h1>
                <p>We couldn’t find the page you were looking for.<br/> 
                Maybe our FAQ or Community can help?</p>
                <Link  style={{color:'#2bbbad'}} to="/" className="home">Go Home</Link>
                </div>
                <img className="img-responsive record" src="https://varvy.com/images/broken-links-defined.png" alt="404"></img>
                <br/><br/><br/>
            </div>
        )
    }
}
