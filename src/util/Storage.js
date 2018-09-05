import _ from 'lodash';

export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');

export const setGuideFinished = () => localStorage.setItem('guide_finished', true);
export const getGuideFinished = () => localStorage.getItem('guide_finished');
export const clearGuideFinished = () => localStorage.removeItem('guide_finished');

export const setSelectedInsterest = (interests) => localStorage.setItem('selected_interest', JSON.stringify(interests));
export const getSelectedInsterest = () => {
  try {
    return JSON.parse(localStorage.getItem('selected_interest'));
  } catch (err) {
    return undefined;
  }
};
export const clearSelectedInsterest = () => localStorage.removeItem('selected_interest');
