import React, { Component } from 'react';
import $ from 'jquery';

/* CONTAINERS */
import LoginLanding from '../route-containers/LoginLanding';
import LoginIntroduction from '../route-containers/LoginIntroduction';
import LoginInterestSelection from '../route-containers/LoginInterestSelection';
import Constants from '../util/Constants';
/* CONTAINERS */

/** THe login page, which should be the first page of thsi app. */
class Login extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            currentContainer: <LoginLanding />
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.transitionContainer(<LoginIntroduction />, () => {
                setTimeout(() => {
                    this.transitionContainer(<LoginInterestSelection />);
                }, 2000);
            })
        }, 5000);
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="Login">
				{this.state.currentContainer}
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



    /****************************
    *                           *
    *           OTHER           *
    *                           *
    *****************************/

    /** Animates away the current container, switches it to something else  and animates into the new one.
    * @param {Component} newContainer The new container component to switch to.
    * @param {Function} then What to do after the transition is done. */
    transitionContainer(newContainer, then) {
        // 1.) Animate away the current one.
        $('.container').animate({
            opacity: 0
        }, Constants.CONTAINER_TRANSITION_TIME, () => {
            // 2.) Switch to the new one.
            this.setState({ currentContainer: newContainer }, () => {
                // 3.) Animate in the new one.
                $('.container').css('opacity', 0);
                $('.container').animate({
                    opacity: 1
                }, Constants.CONTAINER_TRANSITION_TIME, () => {
                    if(then) then();
                });
            })
        })
    }


}

export default Login;
