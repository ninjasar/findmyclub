import React, { Component } from 'react';
import $ from 'jquery';

/* CONTAINERS */
import LoginLanding from '../route-containers/LoginLanding';
import LoginWelcome from '../route-containers/LoginWelcome';
import LoginInterestSelection from '../route-containers/LoginInterestSelection';
import Constants from '../util/Constants';
/* CONTAINERS */

import '../css/Login.css';


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
            currentContainer: <div className='container'></div>
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.transitionContainer(<LoginLanding onLogin={this.handleGoToIntroductionContainer.bind(this)}/>, 800);
        }, 200);
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

    /** Transitions to the introduction container. */
    handleGoToIntroductionContainer() {
        this.transitionContainer(<LoginWelcome onNext={this.handleGoToSelectInterests.bind(this)} />);
    }


    /** Transitions to the view that lets people select their interests. */
    handleGoToSelectInterests() {
        this.transitionContainer(<LoginInterestSelection onNext={() => {
            alert('Finished selecting interests!');
        }}/>);
    }






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
    * @param {Number} duration How long the transition should last.
    * @param {Function} then What to do after the transition is done. */
    transitionContainer(newContainer, duration = Constants.CONTAINER_TRANSITION_TIME, then) {
        // 1.) Animate away the current one.
        $('.container').animate({
            opacity: 0
        }, duration || Constants.CONTAINER_TRANSITION_TIME, () => {
            // 2.) Switch to the new one.
            this.setState({ currentContainer: newContainer }, () => {
                // 3.) Animate in the new one.
                $('.container').css('opacity', 0);
                $('.container').animate({
                    opacity: 1
                }, duration || Constants.CONTAINER_TRANSITION_TIME, () => {
                    if(then) then();
                });
            })
        })
    }


}

export default Login;
