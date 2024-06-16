import { productAxiosInstance } from "./axiosInstance";

export async function addProduct(productData){
    const data = await productAxiosInstance.post('/add-product',productData)
    return data
}

export async function getAllProducts(){
    const data = await productAxiosInstance.get('/get-products')
    return data
}

export async function getDetails(id){
    const data = await productAxiosInstance.get(`/get-details?id=${id}`)
    return data
}

export async function editProduct(details){
    const data = await productAxiosInstance.post('/edit-details',details)
    return data
}

