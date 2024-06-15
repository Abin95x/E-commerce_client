import React, { useEffect, useState } from 'react';
import { Menu, Radio } from 'antd';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { getCategory } from '../../api/categoryApi';
import { getAllProducts } from '../../api/productsApi';

const SideBar = ({ productFn, search }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleDropdownClick = (categoryId) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleAllProductsClick = () => {
    setSelectedSubcategory(null);
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
        setFilteredProducts(response?.data || []);
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
      const filtered = products.filter(product => product.subcategory === selectedSubcategory);
      setFilteredProducts(filtered);
      productFn(filtered);
    } else {
      setFilteredProducts(products);
      productFn(products);
    }
  }, [selectedSubcategory, products, productFn]);

  useEffect(() => {
    if (search) {
      const filtered = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
      setFilteredProducts(filtered);
      productFn(filtered);
    } else {
      setFilteredProducts(products);
      productFn(products);
    }
  }, [search, products, productFn]);

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
          <h1
            className='text-sm mx-7 mb-2 cursor-pointer'
            onClick={handleAllProductsClick}
          >
            All products
          </h1>
          <Menu
            mode="inline"
            defaultOpenKeys={[openDropdown]}
            onClick={({ key }) => handleDropdownClick(key)}
          >
            {category && category.map((item) => (
              <Menu.SubMenu
                key={item._id}
                title={item.name}
              >
                {item.subcategories.map((subcategory, index) => (
                  <Menu.Item key={`${item._id}-${index}`}>
                    <Radio
                      onChange={() => toggleSubcategory(subcategory)}
                      checked={selectedSubcategory === subcategory}
                    >
                      {subcategory}
                    </Radio>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
