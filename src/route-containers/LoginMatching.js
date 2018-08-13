import React, { Component } from 'react';
import '../css/containers/LoginMatching.css';

class LoginMatching extends Component {

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
			<div className="LoginMatching container">
                <div className='login-matching-bubbles-holder'>
                    <div className='login-matching-loading-bubble'></div>
                    <div className='login-matching-loading-bubble'></div>
                    <div className='login-matching-loading-bubble'></div>
                    <div className='login-matching-loading-bubble'></div>
                    <div className='login-matching-loading-bubble'></div>
                    <div className='login-matching-loading-bubble'></div>
                    <div className='login-matching-loading-bubble'></div>
                </div>

                <h2>Searching for the perfect match for you.</h2>
                <p>This may take a few seconds. Please do not exit or refresh the page. </p>

			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/





	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginMatching;
