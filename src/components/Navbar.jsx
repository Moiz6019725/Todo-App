import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-indigo-900 py-2 text-white flex justify-between items-center'>
            <div className="logo">
                <span className='text-2xl font-bold mx-9'>iTask</span>
            </div>
            <ul className='flex gap-8 mx-9'>
                <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all duration-100'>Tasks</li>
            </ul>

        </nav>
    )
}

export default Navbar
