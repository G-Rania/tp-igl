import React from 'react'

const Signoutbtn = () =>  {

  return (
    <div className=' group relative bg-none justify-around'>
    <button className='bg-none mt-8 ml-20 mr-12 text-white text-xl font1 w-20 '>Sign out</button>
    <div className="opacity-0 mt-0 ml-20 p-0 w-2  transition duration-300 ease-in-out group-hover:opacity-100">
      <div className=" w-20 h-0.5 bg-white"></div>
    </div>
    </div>
  )
}

export default Signoutbtn
