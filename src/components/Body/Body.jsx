import React, { useEffect, useState } from 'react'
import { Input, Modal, Select, Button, Upload, Form, InputNumber } from 'antd';
import { addCategory, getCategory, addSubCategory, getOneCategory } from '../../api/categoryApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UploadOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';





const Body = () => {
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
        console.log(response);
        setSubcategoryList(response.data.subcategories)
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

    useEffect(() => {
        async function fetchCategory() {
            const response = await getCategory()
            setCategoryList(response?.data?.data)
        }
        fetchCategory()
    }, [category])





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

            {/* category modal */}

            <Modal
                className='mt-56 '
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
                className='mt-56 '
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
                <form action="">
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
                            {subcategoryList && subcategoryList.map((subcategory,i) => (
                                <Select.Option key={i} value={subcategory}>
                                    {subcategory.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </form>
            </Modal>
        </div>
    )
}

export default Body