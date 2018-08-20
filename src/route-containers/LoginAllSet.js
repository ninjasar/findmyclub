import React, { Component } from 'react';
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
                    <img src={''} alt='All Set' className='login-allset-banner-image'/>
                </div>

                <p className='login-allset-icon'><span className='far fa-check-circle'/></p>
                <h3 className='login-allset-header'>You're all set!</h3>
                <p className='login-allset-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris suscipit, aliquet ex vitae, maximus sem. Etiam fringilla justo id leo molestie consectetur. Duis felis odio, sodales a varius a, vulputate vitae diam.
                </p>
                <button className='round-rect-button login-allset-next-btn'
                        onClick={() => {
                            if(this.props.onNext) {
                                this.props.onNext();
                            }
                        }}>Finish</button>
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
