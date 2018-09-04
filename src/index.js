import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactGA from 'react-ga';
// import registerServiceWorker from './registerServiceWorker';
import './css/index.css';


ReactGA.initialize('UA-124576805-1', { 
    debug: true
});
ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
