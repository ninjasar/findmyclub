import React, { Component } from 'react';
import Login from './routes/Login';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './fonts/fonts.css';
import './css/App.css';
import Dashboard from './routes/Dashboard';

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
			<Router>
                <div className="App">
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/dashboard' component={Dashboard}/>
			    </div>
            </Router>
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
