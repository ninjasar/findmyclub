import superagent from 'superagent';
import dateformat from 'dateformat';
import _ from 'lodash';
import Constants from './Constants';
import * as Storage from '../util/Storage';
import { getInterestFromCategory } from './InterestsAndCategories';
import * as jwt_decode from 'jwt-decode';

/****************************
*                           *
*           OTHER           *
*                           *
*****************************/

/** Returns the query params from a url. */
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const redirectToLoginIfTokenExpires = () => {
    if (shouldExpireToken()) {
        Storage.clearToken();
        window.location.href = '/';
        return true;
    }
    return false;
};

const get = (path) => {
    if (redirectToLoginIfTokenExpires()) {
        // return a promise that never resolves
        return new Promise(() => { });
    }
    return superagent.get(`${Constants.BASE_URL}${path}`)
        .set({
            'Authorization': `Bearer ${Storage.getToken()}`,
        });
};

const post = (path) => {
    if (redirectToLoginIfTokenExpires()) {
        // return a promise that never resolves
        return new Promise(() => { });
    }
    return superagent.post(`${Constants.BASE_URL}${path}`)
        .set({
            'Authorization': `Bearer ${Storage.getToken()}`,
        });
};

const shouldExpireToken = () => {
    try {
        const payload = getJWTPayload();
        if (!payload) {
            return true;
        }
        // 1 minutes before expire
        return new Date(payload.exp * 1000).getTime() - new Date().getTime() < 60 * 1000;
    }
    catch (err) {
        console.error(err);
        return true;
    }
};

const getJWTPayload = () => {
    return jwt_decode(Storage.getToken());
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
                    ...getInterestFromCategory(val.Name)
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
            res(response.body.map((val) => {
                return {
                    ...val,
                    ...getInterestFromCategory(val.Name)
                }
            }));
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
        if (response.error === true) {
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
            // turn each occurrence of event to single event objects
            res(_.flatMap(response.body, (event) => {
                return event.dates.map((date) => {
                    const eventCopy = JSON.parse(JSON.stringify(event));
                    eventCopy.date = date;
                    return eventCopy;
                });
            }));
        }
    })
}

/**
 * clubID => clubDetailObject
 */
const clubDetailCache = { };

const _getClubInformation = async (clubID) => {
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

/** Returns information about a given club. 
* @param {Number} clubID The id for the club that you want to get information about.
* @returns {Object} Returns an object containing all the important information about a club. */
const getClubInformation = async (clubID, withCache=true) => {
    if (!withCache) {
        return _getClubInformation(clubID);
    }
    if (!clubDetailCache[clubID]) {
        clubDetailCache[clubID] = await _getClubInformation(clubID);
    }
    return clubDetailCache[clubID];
}

export default {
    shouldExpireToken,
    getParameterByName,
    authenticateUser,
    getCategories,
    getClubs,
    followClub,
    unfollowClub,
    getFollowedClubs,
    getEventsForClub,
    getClubInformation,
    getJWTPayload,
}