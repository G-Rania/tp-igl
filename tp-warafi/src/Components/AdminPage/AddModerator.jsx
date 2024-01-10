import React from 'react';
import Form from './Form';
import { addMod, updateMod } from '../../api/admin/mod_api';
import { useState } from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';

export default function AddModerator({ isOpen, onClose, updateTable }) {
  
    const initialFormData = {
    id:'',
    email: '',
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData); /*used to track the imput fields inside the Form component */
  const [message, setMessage] = useState(''); /*For the message response of the request to the server */
  const [isSuccess, setIsSuccess] = useState(false);/** for the color of the message */
  const[resetTime , setResetTime]= useState(false); /**to reset all the fields when the page is closed */
  /*when the add button is clicked */
  const handleAddModerator = (e) => {
    e.preventDefault();
  
     addMod( formData )
      .then(response => {
        if (response.status === 200) {
          setMessage('Moderator Added Successfully ');
          //console.log(response)
          formData.id=response.data['mod_id']
          updateTable(formData);
          console.log('added mod is :', formData);
          setIsSuccess(true);
        } else {
          setMessage(response);
          setIsSuccess(false);
        }
      })
      .catch(error => {
        console.log(error);
        setMessage('Unexpected error occurred, please try again');
        setIsSuccess(false);
      });
  };
  
  /**when the add moderator page is closed */
  const handleClose = () => {
    setResetTime(true);
    setMessage('');
    setIsSuccess(false);
    onClose();
  };


  return (
    <div className={` absolute w-full h-full flex items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="absolute w-full h-full backdrop-blur-sm z-10" onClick={handleClose}></div>
      <div className={`editDiv p-[30px] absolute z-20 flex flex-col items-center justify-around h-[380px] w-[380px] custom-sm:w-[80%] costum-sm:h-[50%] border-[5px] border-solid border-[#771079] bg-white rounded-[20px] font-gilory text-[18px] font-light`}>
        <div className=' h-[20%] w-full flex items-center justify-start '>
          <h1 className=' font-bold text-[30px] custom-sm:text-[25px] '>Add Moderator</h1>
        </div>
        <Form setFormData={setFormData} resetData={initialFormData} resetTime={resetTime} setResetTime={setResetTime}/>
        {message && (
          <div className={`text-[14px] font-normal ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
        <div className=' pt-6 h-[20%] w-full flex flex-row items-center justify-between '>
          <button className='font-bold text-[14px] bg-gray-300 rounded px-4 py-2' onClick={handleClose}> Cancel</button>
          <button onClick={handleAddModerator} className='font-bold text-white text-[16px] bg-[#F87F0F] rounded px-6 py-2 '> Add</button>
        </div>
      </div>
    </div>
  );
}
