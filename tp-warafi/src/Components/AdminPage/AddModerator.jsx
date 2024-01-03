import React from 'react'
import Form from './Form';
import { addMod } from '../../api/admin/mod_api';
import { addFavorite } from '../../api/users/favorites_api';
import { useState } from 'react';
import { useRef } from 'react';

import { text } from '@fortawesome/fontawesome-svg-core';
export default function AddModerator ({ isOpen, onClose }) {
    
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
      });
    const formRef = useRef(null)
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);     
    
    const handleAddModerator= async (e) => {
        e.preventDefault() ;
        try {
            const response = await addFavorite( )
            if (response==true) {
                setMessage('Moderator Added Succesfully ') 
                setIsSuccess(true)
            } 
            else{
                setMessage(response) 
                setIsSuccess(false)
        } 
        }
        catch (error) {
            console.log(error); // Log the error to the console
            setMessage('unnexpected error occured, please try again') 
            setIsSuccess(false)
            
        }       

     } 
 return (

     <div className={` absolute w-full h-full flex items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
        <div className="absolute w-full h-full backdrop-blur-sm z-10" onClick={onClose}></div>
        <div className={`editDiv p-[30px] absolute z-20 flex flex-col items-center justify-around h-[380px] w-[380px] custom-sm:w-[80%] costum-sm:h-[50%] border-[5px] border-solid border-[#771079] bg-white rounded-[20px] font-gilory text-[18px] font-light transform transition-transform ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
           
            <div className=' h-[20%] w-full flex items-center justify-start '>
                <h1 className=' font-bold text-[30px] custom-sm:text-[25px] '>Add Moderator</h1>
            </div>
            
            <Form formData={formData} setFormData={setFormData} />
            {message &&
            (<div className={`${ isSuccess ? 'text-green-600' : 'text-red-600' }`}>
                 {message} 
                 </div> )
            }

          <div className=' pt-6 h-[20%] w-full flex flex-row items-center justify-between '>
          <button className='font-bold text-[14px] bg-gray-300 rounded px-4 py-2 ' onClick={onClose} > Cancel</button>
         <button onClick={handleAddModerator} className='font-bold text-white text-[16px] bg-[#F87F0F] rounded px-6 py-2 '> Add</button>
         </div>  
         
         </div>
       
  </div>
        );
     
}
