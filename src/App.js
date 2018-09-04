import React, { Component } from 'react';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import { HashRouter as Router, Route } from "react-router-dom";
// import { createStore } from 'redux';
import './fonts/fonts.css';
import './css/App.css';



// // Create the redux store
// const defaultState = {
    
// }
// const ReduxStore = (state = defaultState, action) => {
//     switch (action.type) {
//         default:
//             break;
//     }
//     return state;
// };
// const store = createStore(ReduxStore);


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
