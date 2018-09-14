import React, { Component } from 'react';
import LoadingBubbles from '../components/LoadingBubbles';
import '../css/containers/LoginMatching.css';

class LoginMatching extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    componentDidMount() {
        document.title = 'Find My Club | Matching';
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="LoginMatching container" role='region' aria-label='Sit tight while we find some clubs for you!'>
                <LoadingBubbles />
                <h2 tabIndex={0}>Searching for the perfect match for you.</h2>
                <p tabIndex={0}>This may take a few seconds. Please do not exit or refresh the page. </p>
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
