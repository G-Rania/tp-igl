import React from 'react'
import Form from './Form';
import { useState , useEffect } from 'react';
import { updateMod } from '../../api/admin/mod_api';
export default function EditModerator ({ isOpen, onClose, updateTable , ancienMod }) {
   
  useEffect(()=>{
    setResetTime(true)
  } )
    const [message, setMessage] = useState(''); /*For the message response of the request to the server */
    const [isSuccess, setIsSuccess] = useState(false);/** for the color of the message */
  
    /*when the add button is clicked */
    const handleEditMod = async (e) => {
        e.preventDefault();
        try {
        const response = await updateMod(formData);
        if (response === true) {
          setMessage('Moderator Updated Successfully ');
          updateTable(formData);
          setIsSuccess(true);
        } else {
          setMessage(response);
          setIsSuccess(false);
        }
      } catch (error) {
        console.log(error);
        setMessage('Unexpected , please try again');
        setIsSuccess(false);
      }
    };

      const handleClose = () => {
        //setResetTime(true);
        setMessage('');
        setIsSuccess(false);
        onClose();
      };

    

      
      const [formData, setFormData] = useState(ancienMod); /*used to track the imput fields inside the Form component */
      const[resetTime , setResetTime]= useState(false); /**to reset all the fields when the page is closed */
      
      console.log(ancienMod)
      console.log(formData)


      return (
     <div className={` absolute w-screen h-screen flex items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
        <div className="absolute w-screen h-screen backdrop-blur-sm z-10" onClick={handleClose}></div>
        <div className={`editDiv p-[40px] absolute z-20 flex flex-col items-center justify-around h-[380px] w-[380px] custom-sm:w-[80%] costum-sm:h-[50%] border-[5px] border-solid border-[#771079] bg-white rounded-[20px] font-gilory text-[18px] font-light transform transition-transform ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
           
            <div className=' h-[20%] w-full flex items-center justify-start '>
                <h1 className=' font-bold text-[30px] custom-sm:text-[25px] '>Edit Moderator</h1>
            </div>
            
            <Form setFormData={setFormData} resetData={ancienMod} resetTime={resetTime} setResetTime={setResetTime} />
            {message && (
          <div className={`text-[14px] font-normal ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
          <div className=' pt-6 h-[20%] w-full flex flex-row items-center justify-between '>
          <button className='font-bold text-[14px] bg-gray-300 rounded px-7 py-2 ' onClick={handleClose} > Cancel</button>
         <button onClick={handleEditMod } className='font-bold text-white text-[16px] bg-[#F87F0F] rounded px-4 py-2 '> Apply Changes</button>
         </div>  
         
         </div>
       
  </div>
        );
     
}
