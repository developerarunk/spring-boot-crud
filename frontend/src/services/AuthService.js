import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (username, password) => {
    return axios.post(API_URL + 'signup', {
        username,
        password,
    });
};

const login = (username, password) => {
    return axios.post(API_URL + 'login', {
        username,
        password,
    })
    .then((response) => {
        if (response.data) {
            // For Basic Auth, we store the credentials. 
            // In a real app with JWT, we would store the token.
            const user = { username, password, authdata: window.btoa(username + ':' + password) };
            localStorage.setItem('user', JSON.stringify(user));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};
