import $ from 'jquery';
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

    constructor(props) {
        super(props);
        this.state = {
            isShowingBetaInfo: false
        }
    }

    componentDidMount() {
        this.setState({ isShowingBetaInfo: true });
        setTimeout(() => {
            $('.login-landing-beta-info-area').animate({
                opacity: 0
            }, '0.2s', () => {
                $('.login-landing-beta-info-area').css('opacity', 1);
                this.setState({ isShowingBetaInfo: false });
            });
        }, 3000);
    }



	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    render() {
        return (
            <div className="LoginLanding container">
                <div className='login-landing-info-btn' 
                    onClick={() => this.setState({ isShowingBetaInfo: !this.state.isShowingBetaInfo })}>
                        <span className='fa fa-info-circle'/>
                </div>
                { this.state.isShowingBetaInfo ? 
                    <div className='login-landing-beta-info-area' ref='login-landing-beta-info-area'>
                        <p className='login-landing-beta-info-title'>Note: this is public beta, experience might change as we continue enhancing the application</p>
                        <button className='login-landing-beta-info-close-btn'
                                onClick={() => this.setState({ isShowingBetaInfo: false })}><span className='fa fa-times-circle'/></button>
                    </div>
                : <div></div> }

                <img src={Logo} alt="Find My Club" className="login-landing-logo" />
                <div className="login-landing-text" role='region' aria-live='polite'>
                    Find clubs that are just right for you
                </div>
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
                    role='region' aria-live='Login' aria-label='Click to Login'>Coming Soon</button>
                <img src={Promotion} alt="Promotion" className="login-landing-promotion" 
                    onClick={() => {
                        this.loginClickCounter = (this.loginClickCounter || 0) + 1;
                        if (this.loginClickCounter === 3) {
                            this.handleLogin();
                        }
                    }}
                />
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
