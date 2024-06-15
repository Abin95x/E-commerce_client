import { productAxiosInstance } from "./axiosInstance";

export async function addProduct(productData){
    const data = await productAxiosInstance.post('/add-product',productData)
    return data
}

export async function getAllProducts(){
    const data = await productAxiosInstance.get('/get-products')
    return data
}

