import React, { Component } from 'react';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import { HashRouter as Router, Route } from "react-router-dom";
import ReactGA from 'react-ga';
import history from './util/history';
import Networking from './util/Networking';
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
    constructor() {
        super();
        ReactGA.initialize('UA-124576805-1');

        const trackPath = (path) => {
            try { ReactGA.set({ userEmail: Networking.getJWTPayload().email }); }
            catch (err) { }

            ReactGA.set({ page: path });
            ReactGA.pageview(path);
        };

        history.listen((location) => {
            trackPath(location.hash);
        });
        trackPath(window.location.hash);
   }

	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
        return (
			<Router history={history}>
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
