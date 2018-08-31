import thumbnailUrl from "../images/defaultClubThumbnail.svg";


export default {
    CONTAINER_TRANSITION_TIME: 750,
    OVERLAY_TRANSITION_TIME: 350,
    clubThumbnailDefaultPath: thumbnailUrl,
    setToken: (token) => {
        localStorage.setItem('token', token);
    },
    clearToken: () => localStorage.clear('token'),
    token: () => localStorage.getItem('token'),
    BASE_URL: 'https://dev.findmyclub.nyu.edu' /*'https://d1hmwr991s6qf2.cloudfront.net'*/ /*'https://findmyclub.nyu.edu/'*/
};
