import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDetails } from '../../api/productsApi';
import { Typography, Divider, Button, Space, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import { editProduct } from '../../api/productsApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const { Title, Paragraph } = Typography;

const ProductDetails = () => {
    const [details, setDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [render, setRender] = useState(true);

    const location = useLocation();
    const params = useParams();

    const id = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await getDetails(id);
                setDetails(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDetails();
        console.log('ingggggggggg');
    }, [id,render]);

    const handleProduct = async (e) => {
        e.preventDefault()
        if (
            productName.trim() === '' ||
            productBrand.trim() === '' ||
            productDescription.trim() === '' ||
            price.trim() === '' ||
            imgs.length === 0) {

            toast.error('Please fill out all fields before submitting.')
            return;
        }
    
        
        const response = await editProduct({
            name: productName,
            brand: productBrand,
            price: price,
            description: productDescription,
            images: imgs,
            id:id
        })
        console.log(response,'hiiiiiid');
        if (response?.status === 200) {
            toast.success('Signup successful')
            setIsModalOpen3('')
            setProductName('')
            setProductBrand('')
            setProductDescription('')
            setPrice('')
            setImgs([])
            setRender(prevRender => !prevRender);

        }

    }
  

    // Define or remove these variables if not needed
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [price, setPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [imgs, setImgs] = useState([]);

    console.log(productName);
    console.log(productBrand);
    console.log(price);
    console.log(productDescription);
    console.log(imgs);

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

    return (
        <>
            <Header />
            <div className="container mx-auto p-8">
                {details && (
                    <div className="flex flex-col md:flex-row justify-center gap-14">
                        <div>
                            <img src={details.images[0]} alt={details.name} className="w-full md:w-96 h-96 mb-4" />
                        </div>
                        <div className="w-full md:w-[500px]">
                            <div className="bg-white rounded-lg shadow-lg p-4 border">
                                <Title level={2}>{details.name}</Title>
                                <Paragraph>{details.description}</Paragraph>
                                <div className="flex justify-between items-center ">
                                    <span className="text-lg font-semibold">₹{details.price}</span>
                                    <span className="text-sm text-gray-500">In Stock</span>
                                </div>

                                <Divider />
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Part Number:</span>
                                    <span className="font-semibold">{details.price}</span>
                                </div>
                                <Divider />
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Availability:</span>
                                    <span className="font-semibold">✔️</span>
                                </div>
                                <Divider />
                                <div className="flex items-center space-x-2 p-5">
                                    <span className="text-gray-600">Quantity:</span>
                                    <div className='flex gap-7'>
                                        <Button onClick={() => {
                                            setQuantity(quantity + 1);
                                        }}>+</Button>
                                        <span className="font-semibold">{quantity}</span>
                                        <Button onClick={() => {
                                            if (quantity > 0) {
                                                setQuantity(quantity - 1);
                                            }
                                        }}>-</Button>
                                    </div>
                                </div>
                                <Space>
                                    <Button className='bg-yellow-400 p-6 rounded-xl'
                                        icon={<ShoppingCartOutlined />}
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button className='bg-yellow-400 p-6 rounded-xl'
                                        type="default"
                                        icon={<EditOutlined />}
                                        onClick={() => setIsModalOpen3(true)}
                                    >
                                        Edit Product
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Modal
                className=''
                width={600}
                footer={null}
                open={isModalOpen3}
                onCancel={() => setIsModalOpen3(false)}
            >
                <div>
                    <h1 className='text-2xl font-medium text-center m-5'>Edit Product</h1>
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
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value)) { // regex to allow only numbers and optionally a decimal point
                                    setPrice(value);
                                }
                            }}
                        />
                    </Form.Item>

                   
                    <Form.Item label="Description">
                        <Input.TextArea
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
                        <Button type='primary' htmlType='submit'>Save</Button>
                        <Button onClick={() => setIsModalOpen3(false)}>Cancel</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default ProductDetails;
