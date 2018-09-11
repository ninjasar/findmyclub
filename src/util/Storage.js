export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');

export const setEditPreference = () => localStorage.setItem('edit_preference', true);
export const getEditPreference = () => localStorage.getItem('edit_preference');
export const clearEditPreference = () => localStorage.removeItem('edit_preference');
