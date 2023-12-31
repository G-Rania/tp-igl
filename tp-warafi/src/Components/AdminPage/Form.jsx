import React from 'react'

export default function () {
  return (
    <form className='h-[60%] w-full flex flex-col items-center justify-around '>
        
          <div className='  h-[20%] w-full flex flex-col items-start justify-evenly ' >
            <label htmlFor="email"> email</label>
            <input type="email"id='email' className=' w-full rounded bg-gray-300 ' />
          </div>

          <div className='   h-[20%] w-full flex flex-col items-start justify-evenly '>
          <label htmlFor="username"> username</label>
            <input type="text" id='username' className='w-full rounded bg-gray-300' />
          </div>

          <div className='  h-[20%] w-full  flex flex-col items-start justify-evenly '>
          <label htmlFor="Password"> password</label>
            <input type="password" id='password' className='w-full rounded bg-gray-300' />
          </div>
    </form>
    )
}
