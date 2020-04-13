import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const axiosInstance = axios.create({
    baseURL: API_BASE_URL
});

const getHeader = () => {
    return {
        headers: {
            'auth-token': localStorage.getItem('auth-token'),
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    };
}

export const login = (credentials, success, fail) => {
    axiosInstance.post('login', credentials).then(success).catch(fail);
};

export const signup = (user, success, fail) => {
    axiosInstance.post('register', user).then(success).catch(fail);
};

export const getUser = (id, success, fail) => {
    axiosInstance.get('user/' + id, getHeader()).then(success).catch(fail);
};

export const updateUser = (user, success, fail) => {
    axiosInstance.put('user', user, getHeader()).then(success).catch(fail);
};

export const getUsers = (success, fail) => {
    axiosInstance.get('users', getHeader()).then(success).catch(fail);
};