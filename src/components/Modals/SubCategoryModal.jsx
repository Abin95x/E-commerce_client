import React from 'react'
import { Input, Modal, Select, } from 'antd';


const SubCategoryModal = ({
    isModalOpen2,
    setIsModalOpen2,
    subCategory,
    selectedCategory,
    setSelectedCategory,
    setSubCategory,
    handleSubCategorySubmit,
    categoryList,
    subcategoryList
    
}) => {

    console.log(categoryList,'hiiiiiiiii');
    return (
        <div>
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
        </div>
    )
}

export default SubCategoryModal