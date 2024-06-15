import { productAxiosInstance } from "./axiosInstance";

export async function getAllProducts(){
    const data = await productAxiosInstance.get('/get-products')
    return data
}

