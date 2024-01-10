import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
export default function Form({ setFormData, resetData, resetTime, setResetTime }) {

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  
  const mailRef= useRef(null)
  const usernameRef= useRef(null)
  const passwordRef= useRef(null)

    useEffect(() => {
    setFormData(resetData)
    //console.log(resetTime)
     if (resetTime) {
      mailRef.current.value = resetData.email;
      usernameRef.current.value = resetData.username;
      passwordRef.current.value = resetData.password;
      //setResetTime(false);
    } 
  
  }, [resetTime, resetData.email, resetData.username, resetData.password]); 

  return (
    <form className='h-[60%] w-full flex flex-col items-center justify-around'>
      <div className='  h-[20%] w-full flex flex-col items-start justify-evenly'>
        <label htmlFor='email'>Email</label>
        <input ref={mailRef}
          type='email'
          id='email'
          onChange={(e) => handleChange('email', e.target.value)}
          className='w-full rounded bg-gray-300'
        />
      </div>

      <div className='h-[20%] w-full flex flex-col items-start justify-evenly'>
        <label htmlFor='username'>Username</label>
        <input ref={usernameRef} 
          type='text'
          id='username'
          onChange={(e) => handleChange('username', e.target.value)}
          className='w-full rounded bg-gray-300 text-black '
        />
      </div>

      <div className='  h-[20%] w-full  flex flex-col items-start justify-evenly'>
        <label htmlFor='password'>Password</label>
        <input ref={passwordRef}
          type='password'
          id='password'
          onChange={(e) => handleChange('password', e.target.value)}
          className='w-full rounded bg-gray-300'
        />
      </div>
    
    </form>
  );
}
