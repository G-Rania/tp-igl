import React from 'react'
import { Link } from 'react-router-dom'

const Loginbtn = () => {
  return (
    <div className=' group relative bg-none justify-around md:items-end'>
          <button className='bg-none mt-8 ml-2 md:ml-80 text-white text-xl font1 w-20 md:w-auto whitespace-nowrap'>
            <Link to="/users/login">Log in</Link>
          </button>
    <div className=" opacity-0 mt-0 ml-2 md:ml-80 p-0 w-2 transition duration-300 ease-in-out group-hover:opacity-100">
       <div className=" w-16 h-0.5 bg-white translate-x-3 xl:-translate-x-1"></div>
    </div>
    </div>
  )
}

export default Loginbtn