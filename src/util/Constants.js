import thumbnailUrl from "../images/FindMyClub_Logo.svg";


export default {
    CONTAINER_TRANSITION_TIME: 250,
    OVERLAY_TRANSITION_TIME: 350,
    clubThumbnailDefaultPath: thumbnailUrl,
    API_BASE_URL: `${process.env.REACT_APP_BASE_URL}/v1`,
    AUTH_BASE_URL: `${process.env.REACT_APP_BASE_URL}/auth`,
};
