import React from 'react'
import Image from "next/image";
import NavLinks from './NavLinks';

const SideBar = () => {
  return (
    <div className='h-screen md:w-64 bg-white  p-3'>
      {/* Logo */}
      <div className="flex justify-center">
        <Image src="/Google.png" alt="Logo OBA COLOR" width={100} height={100} />
      </div>


      {/* Navigation Links */}
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 mt-5'>
        <NavLinks />
      </div>
    </div>
  )
}

export default SideBar;
