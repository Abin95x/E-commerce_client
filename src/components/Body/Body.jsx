import React, { useEffect, useState } from 'react'
import {  Pagination } from 'antd';
import { addCategory, getCategory, addSubCategory, getOneCategory } from '../../api/categoryApi';
import { addProduct } from '../../api/productsApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import CategoryModal from '../Modals/CategoryModal';
import ProductModal from '../Modals/ProductModal';
import SubCategoryModal from '../Modals/SubCategoryModal';

const Body = ({ products, setCategories }) => {
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [category, setCategory] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategory, setSubCategory] = useState('')
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [productCategory, setProductCategory] = useState(null);
    const [productSubCategory, setProductSubCategory] = useState(null)
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imgs, setImgs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const totalProducts = products.length;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryRegex = /^[A-Za-z ]+$/;
        if (category.trim() === '') {
            toast.error('Enter category name');
        } else if (!categoryRegex.test(category)) {
            toast.error('Category name should only contain letters');
        } else {
            const response = await addCategory(category)
            console.log(response.data.data, 'broooooooooo');
            setCategories(response?.data?.data || []);
            toast(response?.data?.message)
            setIsModalOpen1(false)
            setCategory('')
        }
    }

    const handleCategory = async (value) => {
        setProductCategory(value)
        const response = await getOneCategory(value)
        setSubcategoryList(response?.data?.subcategories)
    }

    const handleSubCategorySubmit = async (e) => {
        e.preventDefault();
        if (selectedCategory === null) {
            toast.error('Select category')
        }
        if (subCategory.trim() === '') {
            toast.error('Enter sub category name')
        }
        const response = await addSubCategory({ category: selectedCategory, subCategory: subCategory })
        if (response.status === 200) {
            toast.success(response?.data?.message)
            setIsModalOpen2(false)
            setSelectedCategory(null)
            setSubCategory('')
        } else {
            toast.error(response?.data?.message)
        }
    }

    const handleImgChange = (e) => {
        const selectedCertificates = e.target.files;
        setImgToBase(selectedCertificates);
    };

    const setImgToBase = async (files) => {
        const imgArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
                imgArray.push(reader.result);
                setImgs([...imgArray]);
            };
        }
    };

    const handleProduct = async (e) => {
        e.preventDefault()
        if (productCategory === null ||
            productSubCategory === null ||
            productName.trim() === '' ||
            productBrand.trim() === '' ||
            productDescription.trim() === '' ||
            price.trim() === '' ||
            imgs.length === 0) {
            toast.error('Please fill out all fields before submitting.')
            return;
        }

        if (isNaN(Number(price))) {
            toast.error('Price should be number')
            return;
        }

        const response = await addProduct({
            name: productName,
            brand: productBrand,
            price: price,
            description: productDescription,
            category: productCategory,
            subcategory: productSubCategory,
            images: imgs
        })
        if (response?.status === 200) {
            toast.success('Signup successful')
            setIsModalOpen3('')
            setProductCategory('')
            setProductSubCategory('')
            setProductName('')
            setProductBrand('')
            setProductDescription('')
            setPrice('')
            setImgs([])
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleClick = (id) => {
        console.log(id);
        try {
            navigate(`/details?id=${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchCategory() {
            const response = await getCategory()
            setCategoryList(response?.data?.data)
        }
        fetchCategory()
    }, [])

    console.log(categoryList);

    return (
        <div className='w-full p-5'>
            <div className=' flex justify-end gap-5'>
                <button
                    onClick={() => {
                        setIsModalOpen1(true)
                    }}
                    className="bg-yellow-500 hover:bg-[#003F62] text-white font-bold py-2 px-4  rounded-2xl transition-colors duration-300"
                >
                    Add category
                </button>

                <button
                    onClick={() => {
                        setIsModalOpen2(true)
                    }} className="bg-yellow-500 hover:bg-[#003F62] text-white font-bold py-2 px-4 rounded-2xl transition-colors duration-300">
                    Add sub category
                </button>

                <button
                    onClick={() => {
                        setIsModalOpen3(true)
                    }} className="bg-yellow-500 hover:bg-[#003F62] text-white font-bold py-2 px-4 rounded-2xl transition-colors duration-300">
                    Add product
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mt-4 gap-5 sm:px-4 md:px-8 lg:px-24">
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <div onClick={() => handleClick(product._id)} key={product._id} className="bg-white rounded-lg border w-80 p-5">
                            <img src={product.images[0]} alt={product.name} className=" w-full h-48 object-cover mb-4" />
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-700 mb-2">{product.description}</p>
                            <p className="text-gray-600">Brand: {product.brand}</p>
                            <p className="text-gray-600">Price:  ₹ {product.price}</p>
                        </div>
                    ))
                ) : (
                    <div className='text-center col-span-full'>No Products</div>
                )}
            </div>

            <div className="mt-5 flex justify-center">
                <Pagination
                    current={currentPage}
                    pageSize={productsPerPage}
                    total={totalProducts}
                    onChange={handlePageChange}
                />
            </div>
            {/* category modal */}
            <CategoryModal
                isModalOpen1={isModalOpen1}
                setIsModalOpen1={setIsModalOpen1}
                category={category}
                setCategory={setCategory}
                handleSubmit={handleSubmit}
            />
            {/* add product modal*/}
            <ProductModal
                isModalOpen3={isModalOpen3}
                setIsModalOpen3={setIsModalOpen3}
                productName={productName}
                setProductName={setProductName}
                handleProduct={handleProduct}
                productBrand={productBrand}
                setProductBrand={setProductBrand}
                price={price}
                setPrice={setPrice}
                productCategory={productCategory}
                handleCategory={handleCategory}
                setProductSubCategory={setProductSubCategory}
                categoryList={categoryList}
                subcategoryList={subcategoryList}
                productDescription={productDescription}
                setProductDescription={setProductDescription}
                handleImgChange={handleImgChange}
                imgs={imgs}
                productSubCategory={productSubCategory}
            />
            {/* sub category modal */}
            <SubCategoryModal
                isModalOpen2={isModalOpen2}
                setIsModalOpen2={setIsModalOpen2}
                subCategory={subCategory}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSubCategory={setSubCategory}
                handleSubCategorySubmit={handleSubCategorySubmit}
                categoryList={categoryList}
                subcategoryList={subcategoryList}
            />
        </div>
    )
}

export default Body