import React from 'react'
import { useState } from 'react';
import { removeModerator } from '../../api/admin/mod_api';

export default function RemoveMod({ isOpen, onClose }) {
  const [message, setMessage] = useState(''); /*For the message response of the request to the server */
  const [isSuccess, setIsSuccess] = useState(false);/** for the color of the message */

  /*when the add button is clicked */
  const handleRemoveMod = async (e) => {
    e.preventDefault();
    try {
      const response = await removeModerator();
      if (response === true) {
        setMessage('Moderator Removed Successfully ');
        setIsSuccess(true);
      } else {
        setMessage(response);
        setIsSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setMessage('Unexpected error occurred, please try again');
      setIsSuccess(false);
    }
  };

 const handleClose= () =>{
  onClose()
  setMessage('')
 }

 return (
     <div className={`absolute w-full h-full flex items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
        <div className="absolute w-full h-full backdrop-blur-sm z-10" onClick={handleClose}></div>
        <div className=' absolute z-20 flex flex-col items-center justify-around h-[380px] w-[380px] custom-sm:w-[80%] costum-sm:h-[50%] flex border-[5px] border-solid border-[#771079] bg-white rounded-[20px]'>      
            <div >
                <h1 className='text-black font-gilroy font-bold text-[30px]  '>Remove Moderator</h1>
            </div>

            <div className='w-full text-black text-center font-gilroy font-light text-[30px] px-[20px]'>
                <p>Are you sure you want to remove this user from the moderators list?</p>
            </div>
           
            <div className=' h-[20%] w-full flex flex-row items-center justify-evenly '>
           <button className=" font-bold text-white text-[16px] bg-[#F87F0F] rounded px-4 py-2 " 
                onClick={handleClose}>
                  Cancel
            </button>
            <button onClick={handleRemoveMod} className=" font-bold text-white text-[16px] bg-[#F87F0F] rounded px-4 py-2 ">
                  Remove
            </button>
           </div>
           {message && (
          <div className={`${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
  </div>
       
  </div>
        );
     
}
