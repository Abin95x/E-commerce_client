import React, { useState } from 'react';
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";




const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDropdownClick = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button
        className='md:hidden p-3 text-black bg-transparent rounded-xl fixed top-[65px] left-0 z-20'
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaToggleOn className='h-6 w-6' />
          : <FaToggleOff className='h-6 w-6'/>

        }
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
              <li
                className='cursor-pointer flex justify-between items-center'
                onClick={() => handleDropdownClick('allCategories')}
              >
                All Categories
                <span>{openDropdown === 'allCategories' ? '▲' : '▼'}</span>
              </li>
              {openDropdown === 'allCategories' && (
                <ul className='pl-4 mt-2 space-y-2'>
                  <li>Subcategory 1</li>
                  <li>Subcategory 2</li>
                </ul>
              )}

              <li
                className='cursor-pointer flex justify-between items-center'
                onClick={() => handleDropdownClick('laptop')}
              >
                Laptop
                <span>{openDropdown === 'laptop' ? '▲' : '▼'}</span>
              </li>
              {openDropdown === 'laptop' && (
                <ul className='pl-4 mt-2 space-y-2'>
                  <li>Gaming Laptops</li>
                  <li>Ultrabooks</li>
                </ul>
              )}

              <li
                className='cursor-pointer flex justify-between items-center'
                onClick={() => handleDropdownClick('tablet')}
              >
                Tablet
                <span>{openDropdown === 'tablet' ? '▲' : '▼'}</span>
              </li>
              {openDropdown === 'tablet' && (
                <ul className='pl-4 mt-2 space-y-2'>
                  <li>Android Tablets</li>
                  <li>iPads</li>
                </ul>
              )}

              <li
                className='cursor-pointer flex justify-between items-center'
                onClick={() => handleDropdownClick('headphone')}
              >
                Headphone
                <span>{openDropdown === 'headphone' ? '▲' : '▼'}</span>
              </li>
              {openDropdown === 'headphone' && (
                <ul className='pl-4 mt-2 space-y-2'>
                  <li>Over-Ear</li>
                  <li>In-Ear</li>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
