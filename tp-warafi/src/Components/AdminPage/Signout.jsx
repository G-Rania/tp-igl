import React from 'react'

export default function Signout({ isOpen, onClose }) {
   
 return (
     <div className={`absolute w-full h-full flex items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
        <div className="absolute w-full h-full backdrop-blur-sm z-10" onClick={onClose}></div>
        <div className=' absolute z-20 flex flex-col items-center justify-around h-1/2 xl:w-1/3 flex border-[5px] border-solid border-[#771079] bg-white rounded-[20px]'>      
            <div className=' '>
                <h1 className='text-black font-gilroy font-bold text-[30px] '>Sign Out</h1>
            </div>
            <div className='w-full text-black text-center font-gilroy font-light text-[35px] px-[20px]'>
                <p> Are you sure you want to sign out?</p>
            </div>
            <div>
            <button className=" font-bold text-white text-[16px] bg-[#F87F0F] rounded px-4 py-2" 
                onClick={() => {
                  // Add sign-out logic here
                onClose();}}>
                  Sign Out
            </button>
            </div>
        </div>
       
  </div>
        );
     
}
