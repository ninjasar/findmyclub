import React, { Component } from 'react';
import '../css/containers/LoginWelcome.css';

import BannerImage from '../images/WelcomeBanner.svg';

class LoginWelcome extends Component {

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
			<div className="LoginWelcome container">
				<div className='login-welcome-banner-image-area'>
                    <img src={BannerImage} alt='Welcome' className='login-welcome-banner-image'/>
                </div>

                <h3 className='login-welcome-header'>Welcome to <br/>Find My Club!</h3>
                <p className='login-welcome-description'>
                    A quick tool to help students find clubs that match their interest. 
                    We’re here to help you find the right clubs and organizations at NYU.
                </p>
                <button className='round-rect-button login-welcome-login-btn'
                        onClick={this.handleGoToNextSlide.bind(this)}>Next</button>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** Goes to the next slide in the login sequence. */
    handleGoToNextSlide() {
        if(this.props.onNext) {
            this.props.onNext();
        }
    }





	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginWelcome;
