import React from 'react'
export default function Filter ({ close }) {
   
 return (
     <div className={` absolute w-full h-full flex items-center justify-center dialog-filter left-[50%] md:left-[45.5%]`}>
        <div className="absolute w-full h-full z-10" onClick={close}></div>
        <div className={`editDiv  p-[40px] absolute z-20 flex flex-col items-start justify-between h-[60%] w-[29rem] md:w-[31rem]    border-[5px] border-solid border-[#771079] bg-white rounded-[20px] font-gilory text-[18px] md:text-[18px] transform transition-transform ease-in-out`}>
           
            
            
            <div className='flex flex-col space-y-7'>
                <div className='flex flex-row justify-between space-x-4'>
                <label>
                    Keywords : 
                </label>
                <input className=' bg-gray-200 rounded-xl w-64 md:w-72 px-3'></input>
                </div>

                <div className='flex flex-row justify-between'>
                <label>
                    Authors : 
                </label>
                <input className=' bg-gray-200 rounded-xl w-64 md:w-72 px-3'></input>
                </div>

                <div className='flex flex-row justify-between'>
                <label>
                    Institutions : 
                </label>
                <input className=' bg-gray-200 rounded-xl w-64 md:w-72 px-3'></input>
                </div>
                
                <div className='flex flex-row justify-between'>
                <label>
                    Date : 
                </label>
                <input className=' bg-gray-200 rounded-xl w-64 md:w-72 px-3'></input>
                </div>

            </div>

          <div className=' pt-6 h-[20%] w-full flex flex-row items-center justify-between '>
          <button className='font-bold text-[14px] bg-gray-300 rounded px-4 py-2 ' onClick={close} > Cancel</button>
         <button className='font-bold text-white text-[16px] bg-[#F87F0F] rounded px-6 py-2 '> Apply filter</button>
         </div>  
         
         </div>
       
  </div>
        );
     
}
