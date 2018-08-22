import React, { Component } from 'react';
import Networking from '../util/Networking';

import Logo from '../images/FindMyClub_Logo.svg';
import '../css/containers/LoginLanding.css';

class LoginLanding extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);

        // Once you get here, check if the user is already logged in. If so,
        // run the onLogin function to go to the next page.
        const url = Networking.getParameterByName('token', window.location.toString());
        console.log(url);
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="LoginLanding container">
				<img src={Logo} alt='Find My Club' className='login-landing-logo'/>

                <button className='round-rect-button login-landing-login-btn'
                        onClick={this.handleLogin.bind(this)}>Login</button>
                <p className='login-landing-label'>New York University</p>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** Calls a transition from this container to the introduction container. */
    handleLogin() {
        Networking.authenticateUser()
        
        // .then((val) => {
        //     console.log(val);
        //     // if(this.props.onLogin) {
        //     //     this.props.onLogin();
        //     // }
        // }).catch((err) => {
        //     if(this.props.onError) {
        //         this.props.onError(err);
        //     }
        // })
    }




	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginLanding;
