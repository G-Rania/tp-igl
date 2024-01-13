import React from 'react'
import { useState } from 'react';
import { removeArticle } from '../../api/admin/article_api';

export default function RemoveArticle({ isOpen, onClose ,id,updateTable }) {
  const [message, setMessage] = useState(''); /*For the message response of the request to the server */
  const [isSuccess, setIsSuccess] = useState(false);/** for the color of the message */

  /*when the add button is clicked */
 const handleRemoveArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await removeArticle(id);
      if (response === true) {
        setMessage('Article Removed Successfully ');
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
        <div className=' absolute z-20 flex flex-col items-center justify-around h-[380px] w-[380px] custom-sm:w-[80%] costum-sm:h-[50%] border-[5px] border-solid border-[#771079] bg-white rounded-[20px]'>      
            <div className='' >
                <h1 className='text-black font-gilroy font-bold text-[30px]  '>Remove Article</h1>
            </div>

            <div className=' w-full text-black text-center font-gilroy font-light text-[30px] px-[20px]'>
                <p>Are you sure you want to remove this article</p>
            </div>
            {message && (
          <div className={` ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
            <div className=' h-[20%] w-full flex flex-row items-center justify-evenly '>
           <button className=" font-bold text-white text-[16px] bg-[#F87F0F] rounded px-4 py-2 " 
                onClick={handleClose}>
                  Cancel
            </button>
            <button onClick={handleRemoveArticle} className=" font-bold text-white text-[16px] bg-[#F87F0F] rounded px-4 py-2 ">
                  Remove
            </button>
           </div>
           
  </div>
       
  </div>
        );
     
}
