import $ from 'jquery';
import React, { Component } from 'react';
import Networking from '../util/Networking';

import Logo from '../images/FindMyClub_Logo.svg';
import Promotion from '../images/findMyClubPromotion.png'
import nyuLogo from '../images/FMC_NYU_logo.png'
import '../css/containers/LoginLanding.css';

class LoginLanding extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            isShowingBetaInfo: false
        }
    }

    componentDidMount() {
        // this.setState({ isShowingBetaInfo: true });
    }



	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    render() {
        return (
            <div className="LoginLanding container">
                <img className='login-landing-nyu-logo' src={nyuLogo} alt='NYU logo' />
                <div className='login-landing-info-btn'
                    tabIndex={0}
                    role='button'
                    onClick={() => this.setState({ isShowingBetaInfo: !this.state.isShowingBetaInfo })}>
                    {/* <img className="login-landing-info-icon" src={require('../images/info_icon.svg')} alt="information button" /> */}
                </div>
                {this.state.isShowingBetaInfo ?
                    <div className='login-landing-beta-info-area' ref='login-landing-beta-info-area'>
                        <p className='login-landing-beta-info-title' tabIndex={0}>Note: this is public beta, experience might change as we continue enhancing the application</p>
                        <button className='login-landing-beta-info-close-btn'
                            tabIndex={0}
                            onClick={() => this.setState({ isShowingBetaInfo: false })}><span className='fa fa-times-circle' /></button>
                    </div>
                    : <div></div>}

                <img src={Logo} alt="Find My Club Logo" className="login-landing-logo" />
                <h1 className="login-landing-text" role='region' aria-live='polite'>
                    Find clubs that are just right for you
                </h1>
                <button className="login-landing-login-btn"
                    ref={(loginButton) => this.loginButton = loginButton}
                    onClick={() => {
                        this.shakeTimeout && clearTimeout(this.shakeTimeout);
                        this.shakeTimeout = setTimeout(() => {
                            this.loginButton.classList.remove('shaking');
                        }, 500);
                        this.loginButton.classList.add('shaking');
                    }}
                    // onClick={this.handleLogin.bind(this)}
                    tabIndex={0}
                    role='region' aria-live='assertive' aria-label='Coming Soon'>Coming Soon</button>
                <img src={Promotion} alt="Mobile landing page view" className="login-landing-promotion" />
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
