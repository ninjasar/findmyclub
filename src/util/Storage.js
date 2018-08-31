export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.clear('token');

export const setGuideFinished = () => localStorage.setItem('guide_finished', true);
export const getGuideFinished = () => localStorage.getItem('guide_finished');
export const clearGuideFinished = () => localStorage.clear('guide_finished');
