import React from 'react'

const Body = () => {
    return (
        <div className='w-full p-5'>
            <div className=' flex justify-end gap-5'>
                <button className="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 h-12 rounded-2xl">
                    Add category
                </button>
                <button className="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                    Add sub category
                </button>
                <button className="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">
                    Add product
                </button>
            </div>
        </div>
    )
}

export default Body