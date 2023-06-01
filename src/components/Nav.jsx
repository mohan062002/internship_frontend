import React from 'react'
import {Link} from 'react-router-dom';

export default function Nav() {
  return (
    <div className='bg-slate-800 text-center h-screen w-[200px] left-0 text-white'>
    <Link to={'Register'}>Register</Link>
    <Link to={'Login'}>Login</Link>
   </div>
  )
}
