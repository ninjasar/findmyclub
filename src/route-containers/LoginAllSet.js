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

                <p className='login-allset-icon'><span className='far fa-check-circle'/></p>
                <h3 className='login-allset-header'>You're all set!</h3>
                <p className='login-allset-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris suscipit, aliquet ex vitae, maximus sem. Etiam fringilla justo id leo molestie consectetur. Duis felis odio, sodales a varius a, vulputate vitae diam.
                </p>
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
