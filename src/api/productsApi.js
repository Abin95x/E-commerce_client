import { productAxiosInstance } from "./axiosInstance";

export async function addProduct(productData){
    console.log(productData,'apip');
    const data = await productAxiosInstance.post('/add-product',productData)
    return data
}

export async function getAllProducts(){
    console.log('broooooooo');
    const data = await productAxiosInstance.get('/get-products')
    return data
}

