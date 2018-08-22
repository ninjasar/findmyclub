import superagent from 'superagent';


/** Returns the query params */
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/** Authenticates the user when the login button is clicked. */
const authenticateUser = async () => {
    if(document.cookie.includes('token')) {

    } else {
        const currentLocation = window.location.toString();
        const newLocation = `https://d1hmwr991s6qf2.cloudfront.net/auth/login?redirect=${currentLocation}`;
        window.location = newLocation;
    }
}







export default {
    getParameterByName: getParameterByName,
    authenticateUser: authenticateUser
}