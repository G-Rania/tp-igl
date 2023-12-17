import React from 'react'
import image from '../Images/datalink.svg'

const Logo = () =>{
    return(
        <div className='flex items-start'>
            <div className='p-1.5 bg-white rounded-full'>
             <img src={image} alt='Logo principal' className='w-24 lg:w-36 sm:w-32 xl:w-44'></img>
            </div>
        </div>
      
    )
}

export default Logo
