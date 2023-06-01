import React from 'react';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
   <>
   
   <div className='h-screen flex  justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-slate-600' >
   <div className='flex flex-col  border-4 border-violet-950 p-6 rounded-xl shadow-2xl shadow-black bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'>
   <h1 className=' twxt-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold font-serif  text-center text-violet-950'>WELCOME TO THE ASSIGNMENT</h1>
    <div className='flex justify-center gap-10 my-10'>
      <button className='common-btn'><Link to={'Register'}>Register</Link></button>
      <button className='common-btn'> <Link to={'Login'}>Login</Link></button>
    </div>
   </div>
   </div>
   
   
   </>
   
  )
}
