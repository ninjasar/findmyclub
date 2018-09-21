import $ from 'jquery';
import React, { Component } from 'react';
import Networking from '../util/Networking';

import Logo from '../images/FindMyClub_NEWLOGO.svg';
import NyuLogo from '../images/FMC_NYU_logo.png';
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
        this.setState({ isShowingBetaInfo: true });
    }



	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    render() {
        return (
            <div className="LoginLanding container">
              <main>
                  <img src={Logo} alt="" className="login-landing-logo" />
                  <h1 className="login-landing-app-name">Find My Club</h1>
                  <h2 className="login-landing-text">
                      Find clubs that are just right for you.
                  </h2>
                  <button className="login-landing-login-btn"
                      ref={(loginButton) => this.loginButton = loginButton}
                      onClick={this.handleLogin.bind(this)}
                      tabIndex={0}
                      role='button'
                      aria-label='Button: Click to Login'>Login</button>
                  <img src={Promotion} alt="" className="login-landing-promotion"/>
              </main>
              <div className='login-landing-nyuLogo'>
                <img src={NyuLogo} alt='' width='70px'/>
              </div>
                <div className='login-landing-info-btn'
                    tabIndex={0}
                    role='button'
                    aria-label='Information'
                    onClick={() => this.setState({ isShowingBetaInfo: !this.state.isShowingBetaInfo })}>
                    <img className="login-landing-info-icon"
                        src={require('../images/info_icon.svg')}
                        alt="Tooltip"
                        aria-hidden={true} />
                </div>
                {this.state.isShowingBetaInfo ?
                    <div className='login-landing-beta-info-area' ref='login-landing-beta-info-area'
                        aria-label='Popup Alert: Note that this is a public beta, experience might change as we continue enhancing the application'>
                        <p className='login-landing-beta-info-title' tabIndex={0} aria-hidden={true}>
                            Note: this is public beta, experience might change as we continue enhancing the application
                        </p>
                        <button className='login-landing-beta-info-close-btn'
                                tabIndex={0}
                                role='button'
                                aria-label='Close Button: Click to close the beta alert.'
                                onClick={() => this.setState({ isShowingBetaInfo: false })}><span aria-hidden={true} className='fa fa-times-circle' /></button>
                    </div>
                    : <div></div>}
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
