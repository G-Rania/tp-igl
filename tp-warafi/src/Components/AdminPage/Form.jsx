import React from 'react';

export default function () {
  return (
    <form className='h-[60%] w-full flex flex-col items-center justify-around'>
      <div className='  h-[20%] w-full flex flex-col items-start justify-evenly'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          onChange={(e) => handleChange('email', e.target.value)}
          className='w-full rounded bg-gray-300'
        />
      </div>

      <div className='   h-[20%] w-full flex flex-col items-start justify-evenly'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          onChange={(e) => handleChange('username', e.target.value)}
          className='w-full rounded bg-gray-300'
        />
      </div>

      <div className='  h-[20%] w-full  flex flex-col items-start justify-evenly'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          onChange={(e) => handleChange('password', e.target.value)}
          className='w-full rounded bg-gray-300'
        />
      </div>
    </form>
  );
}
