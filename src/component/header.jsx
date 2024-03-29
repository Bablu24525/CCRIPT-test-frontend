import React from 'react'
import { MdLogout } from "react-icons/md";
import { PrivateInstance } from '../config/axios';
import nookies from "nookies";
import toast from 'react-hot-toast';

export default function Header() {

  const handleLogout = async () => {
    console.log("logging out");
    let res = await PrivateInstance({
      url: "/api/log-out",
      method: "GET"      
    })
    if(res.data.success) {
      toast.success(res.data.message);      
      nookies.destroy(null, "access_token", { path: "/" });
      nookies.destroy(null, "refresh_token", { path: "/" });
      window.location = "/login";
    } else {
      toast.error(res.data.message);
    }
  }

  return (
    <header className='bg-white shadow-lg py-4 px-8 flex items-center justify-between'>
        <img 
            src='/ccript-logo.png'
            alt='ccript-logo'
            className='w-[100px]'
        />
        <button type='button' onClick={handleLogout} className="bg-red-500 text-white p-2 text-lg rounded-md">
            <MdLogout />
        </button>
    </header>
  )
}
