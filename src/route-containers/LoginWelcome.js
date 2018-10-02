import React, { Component } from 'react';
import '../css/containers/LoginWelcome.css';

import BannerImage from '../images/welcome_image.png';

class LoginWelcome extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    componentDidMount() {
        document.title = 'Find My Club | Welcome';
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="LoginWelcome container">
				<div className='login-welcome-banner-image-area'>
                    <img src={BannerImage} alt='' className='login-welcome-banner-image'/>
                </div>

                <h1 className='login-welcome-header'
                    tabIndex={0}
                    role='region'
                    aria-label='Welcome to Find My Club!'>Welcome to <br/>Find My Club!</h1>
                <p className='login-welcome-description'
                    tabIndex={0}
                    role='region'>
                    A quick tool to help students find clubs that match their interest. 
                    We’re here to help you find the right clubs and organizations at NYU.
                </p>
                <button className='round-rect-button login-welcome-login-btn'
                        tabIndex={0}
                        aria-label='Next Button: Click to go to the next page'
                        onClick={this.handleGoToNextSlide.bind(this)}>Let's get started!</button>
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
