import { userAxiosInstance } from "./axiosInstance";

export async function signup(signupData) {
    const data = await userAxiosInstance.post('/signup', signupData)
    return data
}

export async function login(loginData) {
    const data = await userAxiosInstance.post('/login', loginData)
    return data
}

