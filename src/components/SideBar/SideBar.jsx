import React, { useEffect, useState } from 'react';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { getCategory } from '../../api/categoryApi';
import { getAllProducts } from '../../api/productsApi';

const SideBar = ({ productFn }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  
  const handleDropdownClick = (categoryId) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory); 
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategory();
        setCategory(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response?.data || []);
        productFn(response?.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategory();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedSubcategory) {
      const filteredProducts = products.filter(product => product.subcategory === selectedSubcategory);
      productFn(filteredProducts);
    } else {
      productFn(products);
    }
  }, [selectedSubcategory, products, productFn]);

  return (
    <div>
      <button
        className='md:hidden p-3 text-black bg-transparent rounded-xl fixed top-[65px] left-0 z-20'
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaToggleOn className='h-6 w-6' /> : <FaToggleOff className='h-6 w-6' />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-96 md:w-64 sm:w-full bg-white z-10 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
      >
        <h1 className='m-8'>Home</h1>
        <div className='bg-white h-[800px]'>
          <h1 className='m-8 text-blue-700 font-medium'>Categories</h1>
          <div>
            <ul className='px-8 space-y-4'>
              {category && category.map((item) => (
                <li key={item._id}>
                  <div
                    className='cursor-pointer flex justify-between items-center'
                    onClick={() => handleDropdownClick(item._id)}
                  >
                    {item.name}
                    <span>{openDropdown === item._id ? '▲' : '▼'}</span>
                  </div>
                  {openDropdown === item._id && item.subcategories.length > 0 && (
                    <ul className='pl-8 space-y-2'>
                      {item.subcategories.map((subcategory, index) => (
                        <li key={index}>
                          <label>
                            <input
                              type="radio"
                              onChange={() => toggleSubcategory(subcategory)}
                              checked={selectedSubcategory === subcategory}
                            />
                            {subcategory}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
