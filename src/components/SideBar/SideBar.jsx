import React, { useState } from 'react';

const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  return (
    <div>
      <h1 className='m-8'>Home</h1>
      <div className='bg-white w-96 md:w-64 sm:w-full h-screen'>
        <h1 className='m-8 text-blue-700 font-medium'>Categories</h1>
        <div>
          <ul className='px-8 space-y-4'>
            <li className='cursor-pointer flex justify-between items-center' onClick={() => handleDropdownClick('allCategories')}>
              All Categories
              <span>{openDropdown === 'allCategories' ? '▲' : '▼'}</span>
            </li>
            {openDropdown === 'allCategories' && (
              <ul className='pl-4 mt-2 space-y-2'>
                <li>Subcategory 1</li>
                <li>Subcategory 2</li>
              </ul>
            )}
            
            <li className='cursor-pointer flex justify-between items-center' onClick={() => handleDropdownClick('laptop')}>
              Laptop
              <span>{openDropdown === 'laptop' ? '▲' : '▼'}</span>
            </li>
            {openDropdown === 'laptop' && (
              <ul className='pl-4 mt-2 space-y-2'>
                <li>Gaming Laptops</li>
                <li>Ultrabooks</li>
              </ul>
            )}
            
            <li className='cursor-pointer flex justify-between items-center' onClick={() => handleDropdownClick('tablet')}>
              Tablet
              <span>{openDropdown === 'tablet' ? '▲' : '▼'}</span>
            </li>
            {openDropdown === 'tablet' && (
              <ul className='pl-4 mt-2 space-y-2'>
                <li>Android Tablets</li>
                <li>iPads</li>
              </ul>
            )}
            
            <li className='cursor-pointer flex justify-between items-center' onClick={() => handleDropdownClick('headphone')}>
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
  );
};

export default SideBar;
