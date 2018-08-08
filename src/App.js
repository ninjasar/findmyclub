import React, { Component } from 'react';
import Login from './routes/Login';
import './fonts/fonts.css';
import './css/App.css';

class App extends Component {

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
			<div className="App">
				<Login />
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

export default App;
