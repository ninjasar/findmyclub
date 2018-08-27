import superagent from 'superagent';
import dateformat from 'dateformat';
import Constants from './Constants';
import { getInterestFromCategory } from './InterestsAndCategories';


/****************************
*                           *
*           OTHER           *
*                           *
*****************************/

/** Returns the query params from a url. */
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const get = (path) => {
    return superagent.get(`${Constants.BASE_URL}/${path}`).
        set({
            'Authorization': `Bearer ${Constants.token}`,
        });
};

const post = (path) => {
    return superagent.get(`${Constants.BASE_URL}/${path}`).
        set({
            'Authorization': `Bearer ${Constants.token}`,
        });
};



/****************************
*                           *
*         API CALLS         *
*                           *
*****************************/

/** Authenticates the user when the login button is clicked. */
const authenticateUser = async () => {
    const currentLocation = window.location.toString();
    const newLocation = `${Constants.BASE_URL}/auth/login?redirect=${currentLocation}`;
    window.location = newLocation;
}


/** Returns all of the categories from NYU Engage. 
* @returns {Promise} Will either return an array of category objects or an error. */
const getCategories = async () => {
    const response = await superagent.get(`${Constants.BASE_URL}/v1/categories`);
    return new Promise((res, rej) => {
        if(response.error === true) {
            rej(response.text);
        } else {
            res(response.body.map((val) => {
                return {
                    ...val,
                    interest: getInterestFromCategory(val.Name)
                }
            }));
        }
    })
}


/** Returns a list of clubs that are associated with the given categories.
* @param {Array} categoryID The array of ids of the category to look for clubs in. 
* @returns {Promise} Returns either an array of clubs or an error. */
const getClubs = async (categoryIDs) => {
    const response = await superagent.get(`${Constants.BASE_URL}/v1/category_portals`)
                                    .query({
                                        category_id: categoryIDs
                                    });
    return new Promise((res, rej) => {
        if(response.error === true) {
            rej(response.text);
        } else {
            res(response.body);
        }
    });
}


/** Makes the user follow the selected club. 
* @param {Number} clubID The id for the club that you want to follow. 
* @returns {Bool} Returns whether or not the club was successfully followed. */
const followClub = async (clubID) => {
    const response = await post(`/v1/user/follow?portal_id=${clubID}`);
    return response.error;
}


/** Makes the user unfollow the selected club. 
* @param {Number} clubID The id for the club that you want to unfollow. 
* @returns {Bool} Returns whether or not the club was successfully unfollowed. */
const unfollowClub = async (clubID) => {
    const response = await post(`/v1/user/unfollow?portal_id=${clubID}`);
    return response.error;
}


/** Retrieves a list of clubs that the user is following.
* @returns {Array} Returns an array of club objects that the user is following. */
const getFollowedClubs = async () => {
    const response = await get(`/v1/user/follow`);
    return new Promise((res, rej) => {
        if(response.error === true) {
            rej(response.text);
        } else {
            res(response.body);
        }
    })
}


/** Retrieves all of the events for a particular club.
* @param {Number} clubID The id for the club that you want to find events for.
* @param {Date} startDate The start date of the events.
* @param {Date} endDate The end date of the events.
* @returns {Array} Returns an array of event objects for the specified club. */
const getEventsForClub = async (clubID, startDate, endDate) => {
    const response = await get(`/v1/user/events`)
        .query({
            portal_id: clubID,
            start_date: dateformat(startDate, 'yyyy-mm-dd'),
            end_date: dateformat(endDate, 'yyyy-mm-dd'),
        });
    return new Promise((res, rej) => {
        if (response.error === true) {
            rej(response.text);
        } else {
            res(response.body);
        }
    })
}

/** Returns information about a given club. 
* @param {Number} clubID The id for the club that you want to get information about.
* @returns {Object} Returns an object containing all the important information about a club. */
const getClubInformation = async (clubID) => {
    const response = await get(`/v1/user/portal`)
        // .set({
        //     'Content-Type': 'application/x-www-form-urlencode',
        // })
        .query({
            portal_id: clubID
        });
    return new Promise((res, rej) => {
        if (response.error === true) {
            rej(response.text);
        } else {
            res(response.body);
        }
    })
}

export default {
    getParameterByName,
    authenticateUser,
    getCategories,
    getClubs,
    followClub,
    unfollowClub,
    getFollowedClubs,
    getEventsForClub,
    getClubInformation,
}