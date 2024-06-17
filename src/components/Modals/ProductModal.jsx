import React from 'react'
import { Input, Modal, Select, Form } from 'antd';


const ProductModal = ({
  isModalOpen3,
  setIsModalOpen3,
  productName,
  setProductName,
  handleProduct,
  productBrand,
  setProductBrand,
  price,
  setPrice,
  productCategory,
  handleCategory,
  setProductSubCategory,
  categoryList,
  subcategoryList,
  productDescription,
  setProductDescription,
  handleImgChange,
  imgs,
  productSubCategory


}) => {
  return (
    <div>
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
          <Form.Item label="Price">
            <Input
              placeholder="Enter part number"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) { // regex to allow only numbers and optionally a decimal point
                  setPrice(value);
                }
              }}
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
              onChange={handleImgChange}
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

export default ProductModal