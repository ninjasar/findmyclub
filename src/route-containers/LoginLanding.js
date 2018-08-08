import React, { Component } from 'react';

import Logo from '../images/FindMyClub_Logo.svg';
import '../css/containers/LoginLanding.css';

class LoginLanding extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/


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
        if(this.props.onLogin) {
            this.props.onLogin();
        }
    }




	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginLanding;
