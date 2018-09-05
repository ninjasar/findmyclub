import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import BannerImage from '../images/allset_image.png';
import '../css/containers/LoginAllSet.css';

class LoginAllSet extends Component {

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
			<div className="LoginAllSet container">
				<div className='login-allset-banner-image-area'>
                    <img src={BannerImage} alt='All Set' className='login-allset-banner-image'/>
                </div>

                <div className='login-allset-content'>
                    <p className='login-allset-icon'><span className='far fa-check-circle'/></p>
                    <h3 className='login-allset-header'>You're all set!</h3>
                </div>
                <NavLink to='dashboard' className='round-rect-button login-allset-next-btn'>
                    <p>Finish</p>
                </NavLink>
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

export default LoginAllSet;
