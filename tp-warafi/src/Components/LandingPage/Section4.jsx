import React from "react";
import img from '../../Images/LandingPage/Section4.svg'

const Section4 = () => {
    return(
        <div className="bg-[#E9E9E9] flex h-full">
            <div className=' flex flex-col justify-end w-96 p-4 mr-24 ml-0 lg:translate-x-20 items-end '>
                <h1 className=' font1 text-[#771079]  ml-10 xs:text-2xl lg:text-3xl xl:text-4xl items-end'>
                Feed your minds with information from all fields of science</h1>
                <p className=" font2 text-justify text-[#333333] mt-10 ml-10 mr-10">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            </div>
            <div className='flex flex-col justify-center ml-0 mr-auto -translate-x-20 lg:translate-x-20 '>
                <img src={img} alt='illustration' className=' mr-0 mt-22 ml-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96 xl:ml-52 xl:mt-10 lg:ml-32 sm:ml-24 '></img>
            </div>
        </div>
    )
}

export default Section4