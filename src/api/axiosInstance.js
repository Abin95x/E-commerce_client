import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const baseURl = import.meta.env.VITE_BASE_URL;
const userBaseURL = baseURl
const categoryBaseURL = `${baseURl}/category`
const productBaseURL = `${baseURl}/product`



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


export const productAxiosInstance = createAxiosInstance( productBaseURL);
productAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, 'usertoken');
    return modifiedReq;
});
productAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleAxiosError(error, 'user'),
);



const handleAxiosError = (error) => {
    console.log(error.response.data);
    if (error.response) {
        if (error.response.status === 409) {
            toast.error(error.response.data.message);
        }else if(error.response.status === 400){
            toast.error(error.response.data.message);
        }else if(error.response.status === 500){
            toast.error(error.response.data.message);

        }
    }
};



