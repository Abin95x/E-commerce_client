import axios from 'axios';
const baseURl = 'http://localhost:3000/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const createAxiosInstance = (baseURL) => {
    const instance = axios.create({
        baseURL,
        timeout: 200000,
        timeoutErrorMessage: 'Request Timeout...!',
    });
    return instance;
};

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName);
    if (authToken) {
        req.headers.Authorization = authToken;
    }
    return req;
};

export const axiosInstance = createAxiosInstance(baseURl);

axiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, 'usertoken');
    return modifiedReq;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleAxiosError(error, 'user'),
);

const handleAxiosError = (error, role) => {
    if (error.response) {
        if (error.response.status === 409) {
            toast('This email is already registered.');
        }
    }
};



