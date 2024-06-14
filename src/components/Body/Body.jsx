import React, { useState } from 'react'
import { Button, Modal } from 'antd';


const Body = () => {
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);


    const handleOk = () => {
        setIsModalOpen1(false);
    };
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

            <Modal title="Add category" open={isModalOpen1} onOk={() => {
                setIsModalOpen1(false)
            }} onCancel={() => {
                setIsModalOpen1(false)
            }}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <Modal title="Add sub category" open={isModalOpen2} onOk={() => {
                setIsModalOpen2(false)
            }} onCancel={() => {
                setIsModalOpen2(false)
            }}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
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