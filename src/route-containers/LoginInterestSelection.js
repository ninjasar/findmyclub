import React, { Component } from 'react';

class LoginInterestSelection extends Component {

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
			<div className="LoginInterestSelection container">
				<button className='round-rect-button login-interests-finish-btn'
                        onClick={this.handleFinishSelectingInterests.bind(this)}>Next</button>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    handleFinishSelectingInterests() {
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

export default LoginInterestSelection;
