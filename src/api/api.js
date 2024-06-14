import { axiosInstance } from "./axiosInstance";

export async function signup(signupData){
    console.log(signupData ,'apiiiiiiiiiiii');
    const data = await axiosInstance.post('/signup',signupData)
    console.log(data);
    return data
}