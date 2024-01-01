import React from 'react'
import Form from './Form';
export default function EditModerator ({ isOpen, onClose }) {
   
 return (
     <div className={` absolute w-full h-full flex items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
        <div className="absolute w-full h-full backdrop-blur-sm z-10" onClick={onClose}></div>
        <div className={`editDiv p-[40px] absolute z-20 flex flex-col items-center justify-around h-[380px] w-[380px] custom-sm:w-[80%] costum-sm:h-[50%] border-[5px] border-solid border-[#771079] bg-white rounded-[20px] font-gilory text-[18px] font-light transform transition-transform ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
           
            <div className=' h-[20%] w-full flex items-center justify-start '>
                <h1 className=' font-bold text-[30px] custom-sm:text-[25px] '>Edit Moderator</h1>
            </div>
            
            <Form></Form>

          <div className=' pt-6 h-[20%] w-full flex flex-row items-center justify-between '>
          <button className='font-bold text-[14px] bg-gray-300 rounded px-7 py-2 ' onClick={onClose} > Cancel</button>
         <button className='font-bold text-white text-[16px] bg-[#F87F0F] rounded px-4 py-2 '> Apply Changes</button>
         </div>  
         
         </div>
       
  </div>
        );
     
}
