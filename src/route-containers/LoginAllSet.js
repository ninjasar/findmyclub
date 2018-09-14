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

    componentDidMount() {
        document.title = 'Find My Club | All Set';
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="LoginAllSet container">
				<div className='login-allset-banner-image-area' aria-hidden={true}>
                    <img src={BannerImage} alt='All Set' className='login-allset-banner-image'/>
                </div>

                <div className='login-allset-content'>
                    <p className='login-allset-icon'><span className='far fa-check-circle'/></p>
                    <h3 className='login-allset-header' tabIndex={0}
                        role='region' aria-label="You're all set!">You're all set!</h3>
                    <p className='login-allset-description' tabIndex={0}
                        role='region' aria-label={"Subtitle: We have collected your chosen clubs in another page. Click \"Finish\" below to see them!"}>
                        We have collected your chosen clubs in another page. Click "Finish" below
                        to see them!
                    </p>
                </div>
                <NavLink to='dashboard' 
                        className='round-rect-button login-allset-next-btn'
                        role='button'
                        aria-label='Finish Button: Click to go to the next page'
                        tabIndex={0}>
                    Finish
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
