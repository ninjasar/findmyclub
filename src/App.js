import $ from 'jquery';
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

        // Accessibility.
        window.addEventListener('keypress', (e) => {
            if(e.keyCode !== 32 && e.keyCode !== 13) return;
            if(e.target) $(e.target).click();
        });

        window.addEventListener('keydown', (e) => {

            let { keyCode, shiftKey } = e;
            let adder = 1;
            if (shiftKey) adder = -1;

            if (keyCode === 9) {
                // Tab
                let tabs = document.querySelectorAll("[aria-label]:not(h1):not(.dashboard-umbrella-label):not(.dashboard-club-item)");
                let current = 0;
                tabs.forEach((t, i) => {
                    if (t.getAttribute("aria-label") === this.currentTab) current = i + adder;
                });
                while (current < tabs.length && current >= 0 && tabs[current].style.visibility) current += adder;
                if (current >= tabs.length) current = 0;
                else if (current < 0) current = tabs.length - 1;

                this.currentTab = tabs[current].getAttribute("aria-label");
                tabs[current].focus();
                
                e.preventDefault();
            }

        });
        this.currentTab = "";
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
