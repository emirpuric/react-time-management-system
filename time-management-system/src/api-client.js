import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const axiosInstance = axios.create({
    baseURL: API_BASE_URL
});

export const login = (credentials, success, fail) => {
    axiosInstance.post('login', credentials).then(success).catch(fail);
};

export const signup = (user, success, fail) => {
    axiosInstance.post('register', user).then(success).catch(fail);
}