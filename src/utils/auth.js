import axios from 'axios';
import { isEmpty } from './validations';

export const setAuthHeader = (jwtToken) => {
    if(isEmpty(jwtToken)) jwtToken = null;
    else if(jwtToken.indexOf('Bearer') != 0) jwtToken = 'Bearer ' + jwtToken;
    axios.defaults.headers.common['Authorization'] = jwtToken;
}

export const saveJwtTokenLocal = (jwtToken) => {
    localStorage.setItem('jwtToken', jwtToken);
}

export const getJwtTokenLocal = () => {
    return localStorage.getItem('jwtToken');
}

export const removeJwtToken = () => {
    localStorage.removeItem('jwtToken');
}

export const interceptResponse = (handleUnauthorizedAction) => {
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        console.log(error);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const responseURL = error.request.responseURL;
        if(responseURL.indexOf('/api/auth/login') > -1 || responseURL.indexOf('/api/auth/change-password') > -1) return Promise.reject(error);
     
        if(error.response && (error.response.status === 401 || error.response.status === 403)) return handleUnauthorizedAction();
        return Promise.reject(error);
    });
}

export const clearAuthorization = () => {
    removeJwtToken();
    setAuthHeader(null);
}

export const setAuthorization = (jwtToken) => {
    saveJwtTokenLocal(jwtToken);
    setAuthHeader(jwtToken);
}

