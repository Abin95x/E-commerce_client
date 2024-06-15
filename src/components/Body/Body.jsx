import React, { useEffect, useState } from 'react'
import { Input, Modal } from 'antd';
import { addCategory, getCategory } from '../../api/categoryApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const Body = () => {
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);

    const [category, setCategory] = useState('')
    const [categoryList, setCategoryList] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryRegex = /^[A-Za-z]+$/;

        if (category.trim() === '') {
            toast.error('Enter category name');
        } else if (!categoryRegex.test(category)) {
            toast.error('Category name should only contain letters');
        } else {
            const response = await addCategory(category)
            console.log(response);
            toast(response?.data?.message)
            setIsModalOpen1(false)
            setCategory('')
        }
    }

    const getCategoryHandle = async () => {
        const response = await getCategory()
        setCategoryList(response?.data?.data)
    }

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
                        getCategoryHandle()
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
                <div className='grid justify-center'>
                    <h1 className='text-2xl font-medium text-center m-5'>Add sub category</h1>
                    <Input placeholder="Enter category name" className='mb-3' />
                    <Input placeholder="Enter category name" className='mb-3' />

                </div>
                <div className='flex justify-center gap-5'>
                    <button className=' p-3 bg-yellow-500 rounded-lg'>ADD</button>
                    <button className='p-3 bg-gray-300 rounded-lg'>DISCARD</button>
                </div>

            </Modal>

            <Modal title="Add product" open={isModalOpen3} onOk={() => {
                setIsModalOpen3(false)
            }} onCancel={() => {
                setIsModalOpen3(false)
            }}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default Body