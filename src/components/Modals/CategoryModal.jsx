import React from 'react'
import { Input, Modal } from 'antd';

const CategoryModal = ({isModalOpen1, setIsModalOpen1,category ,setCategory,handleSubmit}) => {
  return (
    <div>
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
    </div>
  )
}

export default CategoryModal