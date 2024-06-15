import React, { useEffect, useState } from 'react'
import { Input, Modal, Select, Button, Upload, Form, InputNumber } from 'antd';
import { addCategory, getCategory, addSubCategory, getOneCategory } from '../../api/categoryApi';
import { addProduct } from '../../api/productsApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const Body = ({ products }) => {
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [category, setCategory] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategory, setSubCategory] = useState('')
    const [productCategory, setProductCategory] = useState(null);
    const [productSubCategory, setProductSubCategory] = useState(null)
    const [subcategoryList, setSubcategoryList] = useState([]);
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [partNumber, setPartNumber] = useState('');
    const [imgs, setImgs] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const productsPerPage = 6;

    // const indexOfLastProduct = currentPage * productsPerPage;
    // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryRegex = /^[A-Za-z ]+$/;

        if (category.trim() === '') {
            toast.error('Enter category name');
        } else if (!categoryRegex.test(category)) {
            toast.error('Category name should only contain letters');
        } else {
            const response = await addCategory(category)
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
            toast.success(response.data.message)
            setIsModalOpen2(false)
            setSelectedCategory(null)
            setSubCategory('')
        } else {
            toast.error(response.data.message)
        }
    }


    const handleIngChange = (e) => {
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
            partNumber.trim() === '' ||
            imgs.length === 0) {

            toast.error('Please fill out all fields before submitting.')
            return;
        }

        const response = await addProduct({
            name: productName,
            brand: productBrand,
            partno: partNumber,
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
            setPartNumber('')
            setImgs([])

        }

    }

    useEffect(() => {
        async function fetchCategory() {
            const response = await getCategory()
            setCategoryList(response?.data?.data)
        }
        fetchCategory()
    }, [category,products])





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
            {products.length>0 ? (products.map(product => (
                    <div key={product._id} className="bg-white rounded-lg border w-80 p-5">
                        <img src={product.images[0]} alt={product.name} className=" w-full h-48 object-cover mb-4" />
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-2">{product.description}</p>
                        <p className="text-gray-600">Brand: {product.brand}</p>
                        <p className="text-gray-600">Part No: {product.partno}</p>
                    </div>
                ))):     <div className='text-center col-span-full'>No Products</div>
            }
            </div>

            {/* category modal */}

            <Modal
                className='mt-40 '
                width={400}
                open={isModalOpen1}
                footer={null}
                onCancel={() => {
                    setIsModalOpen1(false)
                }}>
                <form onSubmit={handleSubmit}>
                    <div className='grid justify-center'>
                        <h1 className='text-2xl font-medium text-center m-5'>Add category</h1>
                        <Input
                            placeholder="Enter category name"
                            className='mb-3'
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                        />
                    </div>
                    <div className='flex justify-center gap-5'>
                        <button
                            type='submit'
                            className='p-3 bg-yellow-500 rounded-lg'>ADD
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setIsModalOpen1(false)
                                setCategory('')
                            }}
                            className='p-3 bg-gray-300 rounded-lg'>DISCARD
                        </button>
                    </div>
                </form>
            </Modal>

            {/* sub category modal */}

            <Modal
                className='mt-40 '
                width={400}
                footer={null}
                open={isModalOpen2}
                onOk={() => {
                    setIsModalOpen2(false)
                }} onCancel={() => {
                    setIsModalOpen2(false)
                }}>
                <form onSubmit={handleSubCategorySubmit}>
                    <div className='grid justify-center'>
                        <h1 className='text-2xl font-medium text-center m-5'>Add sub category</h1>

                        <Select
                            placeholder="Select category"
                            className='mb-3 w-full'
                            value={selectedCategory}
                            onChange={(value) => setSelectedCategory(value)}
                        >
                            {categoryList && categoryList.map((category) => (
                                <Select.Option key={category._id} value={category._id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                        <Input
                            value={subCategory}
                            onChange={(e) => {
                                setSubCategory(e.target.value)
                            }}
                            placeholder="Enter sub category name"
                            className='mb-3'
                        />

                    </div>
                    <div className='flex justify-center gap-5'>
                        <button
                            className=' p-3 bg-yellow-500 rounded-lg'
                            type='submit'
                        >
                            ADD
                        </button>
                        <button
                            type='button'
                            className='p-3 bg-gray-300 rounded-lg'
                            onClick={() => {
                                setIsModalOpen2(false)
                                setSelectedCategory(null)
                                setSubCategory('')
                            }}
                        >
                            DISCARD
                        </button>
                    </div>
                </form>

            </Modal>

            {/* add product modal*/}

            <Modal
                className=''
                width={600}
                footer={null}
                open={isModalOpen3}
                onCancel={() => setIsModalOpen3(false)}
            >
                <div>
                    <h1 className='text-2xl font-medium text-center m-5'>Add Product</h1>
                </div>
                <form onSubmit={handleProduct}>
                    <Form.Item label="Product Name">
                        <Input
                            placeholder="Enter product name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Brand">
                        <Input
                            placeholder="Enter brand"
                            value={productBrand}
                            onChange={(e) => setProductBrand(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Part Number">
                        <Input
                            placeholder="Enter part number"
                            value={partNumber}
                            onChange={(e) => setPartNumber(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Category">
                        <Select
                            placeholder="Select category"
                            value={productCategory}
                            onChange={(value) => {
                                handleCategory(value)
                                setProductSubCategory('')
                            }}
                        >
                            {categoryList && categoryList.map((category) => (
                                <Select.Option key={category._id} value={category._id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Subcategory">
                        <Select
                            placeholder="Select subcategory"
                            value={productSubCategory}
                            onChange={(value) => setProductSubCategory(value)}
                        >
                            {subcategoryList && subcategoryList.map((subcategory, i) => (
                                <Select.Option key={i} value={subcategory}>
                                    {subcategory.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input
                            placeholder="Enter description"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Images">
                        <input
                            type='file'
                            className='file-input file-input-bordered file-input-info w-full max-w-xs'
                            onChange={handleIngChange}
                            multiple // Allow multiple file selection
                            required
                        />
                        <div className="flex flex-wrap"> {/* Flex container for images */}
                            {imgs.map((image, index) => (
                                <div key={index} className="m-2"> {/* Margin for spacing */}
                                    <img
                                        src={image}
                                        alt={`Selected ${index + 1}`}
                                        className="max-w-20 max-h-20" // Adjust image size as needed
                                    />
                                </div>
                            ))}
                        </div>
                    </Form.Item>


                    <div className='flex justify-center gap-5'>
                        <button
                            type='submit'
                            className='p-3 bg-yellow-500 rounded-lg'>ADD
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setIsModalOpen3(false)
                            }}
                            className='p-3 bg-gray-300 rounded-lg'>DISCARD
                        </button>
                    </div>
                </form>
            </Modal>

        </div>
    )
}

export default Body