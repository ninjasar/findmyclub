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
    const currentLocation = window.location.toString();
    const newLocation = `https://d1hmwr991s6qf2.cloudfront.net/auth/login?redirect=${currentLocation}`;
    window.location = newLocation;
}


/** Returns all of the categories from NYU Engage. 
* @returns {Promise} Will either return an array of category objects or an error. */
const getCategories = async () => {
    const response = await superagent.get('https://d1hmwr991s6qf2.cloudfront.net/v1/categories');
    return new Promise((res, rej) => {
        if(response.error === true) {
            rej(response.text);
        } else {
            res(response.body);
        }
    })
}


/** Returns a list of clubs that are associated with the given interest.
* @param {Number} categoryID The id of the interest to look for clubs in. 
* @returns {Promise} Returns either an array of clubs or an error. */
const getClubs = async (categoryID) => {
    const response = await superagent.get(`https://d1hmwr991s6qf2.cloudfront.net/v1/category_portals?category_id=${categoryID}`);
    return new Promise((res, rej) => {
        if(response.error === true) {
            rej(response.text);
        } else {
            res(response.body);
        }
    });
}


/** Makes the user follow the selected club. 
* @param {Number} clubID The id for the club that you want to follow. */
const followClub = async (clubID) => {
    const response = await superagent.post(`https://d1hmwr991s6qf2.cloudfront.net/v1/user/follow?portal_id=${clubID}`)
                                    .set('Authorization', 'Bearer xxxxxxxx')
                                    .set('Content-Type', 'application/x-www-form-urlencoded');
    console.log(response);
}






export default {
    getParameterByName,
    authenticateUser,
    getCategories,
    getClubs,
    followClub,
}