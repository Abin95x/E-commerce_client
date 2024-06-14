import React, { useState } from 'react'
import { Input, Modal } from 'antd';



const Body = () => {
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);



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

            <Modal
                className='mt-56 '
                width={400}
                open={isModalOpen1}
                footer={null}
                onCancel={() => {
                    setIsModalOpen1(false)

                }}>
                <div className='grid justify-center'>
                    <h1 className='text-2xl font-medium text-center m-5'>Add category</h1>
                    <Input placeholder="Enter category name" className='mb-3' />
                </div>
                <div className='flex justify-center gap-5'>
                    <button className=' p-3 bg-yellow-500 rounded-lg'>ADD</button>
                    <button className='p-3 bg-gray-300 rounded-lg'>DISCARD</button>
                </div>

            </Modal>


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