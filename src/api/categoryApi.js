import {categoryAxiosInstance} from './axiosInstance'

export async function addCategory(category){
    const data = await categoryAxiosInstance.post('/add-category',{categoryName:category})
    return data
}

export async function getCategory(){
    const data = await categoryAxiosInstance.get('/get-category')
    return data
}

export async function addSubCategory(subCategoryData){
    const data = await categoryAxiosInstance.post('/add-subcategory',subCategoryData)
    return data
}

export async function getOneCategory(id){
    const data = await categoryAxiosInstance.get(`/get-onecategory?id=${id}`)
    return data
}