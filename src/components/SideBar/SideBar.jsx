import React, { useEffect, useState } from 'react';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { getCategory } from '../../api/categoryApi';
import { getAllProducts } from '../../api/productsApi';

const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const handleDropdownClick = (categoryId) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategories(prevState => {
      if (prevState.includes(subcategory)) {
        return prevState.filter(item => item !== subcategory);
      } else {
        return [...prevState, subcategory];
      }
    });
  };

  const getProducts = async ()=>{
    const response = await getAllProducts()
    console.log(response.data.data);
  }

  useEffect(() => {
    async function fetchCategory() {
      const response = await getCategory();
      setCategory(response?.data?.data || []);
    }
    fetchCategory();
  }, [category]);

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
                    onClick={() => {
                      handleDropdownClick(item._id)
                      getProducts()
                    }}
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
                              type="checkbox"
                              onChange={() => toggleSubcategory(subcategory)}
                              checked={selectedSubcategories.includes(subcategory)}
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
