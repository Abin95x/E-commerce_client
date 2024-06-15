import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const baseURl = 'http://localhost:3000/';
const userBaseURL = baseURl
const categoryBaseURL = `${baseURl}category`


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



export const userAxiosInstance = createAxiosInstance(userBaseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, 'usertoken');
    return modifiedReq;
});
userAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleAxiosError(error, 'user'),
);



export const categoryAxiosInstance = createAxiosInstance(categoryBaseURL);
categoryAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, 'usertoken');
    return modifiedReq;
});
categoryAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleAxiosError(error, 'user'),
);



const handleAxiosError = (error) => {
    console.log(error.response.data.message);
    if (error.response) {
        if (error.response.status === 409) {
            toast(error.response.data.message);
        }
    }
};



