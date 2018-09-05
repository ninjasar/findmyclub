import React, { Component } from 'react';
import Networking from '../util/Networking';

import Logo from '../images/Beta-logo@2x.png';
import Promotion from '../images/findMyClubPromotion.png'
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
                <img src={Logo} alt="Find My Club" className="login-landing-logo" />
                <div className="login-landing-text">Find clubs that are right just for you</div>
                <button className="login-landing-login-btn"
                    onClick={this.handleLogin.bind(this)}>Login</button>
                <img src={Promotion} alt="Promotion" className="login-landing-promotion" />
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
        Networking.authenticateUser();
    }




	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginLanding;
