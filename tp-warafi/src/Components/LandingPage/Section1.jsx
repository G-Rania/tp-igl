import React, {useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import Logo from '../Logo'
import background from '../../Images/LandingPage/FondDegrade.svg'
import chimie from '../../Images/LandingPage/Chimie.svg'
import informatique from '../../Images/LandingPage/Informatique.svg'
import maths from '../../Images/LandingPage/Mathematiques.svg'
import medecine from '../../Images/LandingPage/Medecine.svg'
import Loginbtn from './Loginbtn'
import Signupbtn from './Signupbtn'

const Section1 = ()=> {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [chimie,informatique,medecine,maths];
  

  useEffect (() => {
    const timer = setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage +1 )% images.length);
    },3000);
    return() => clearTimeout(timer);
  }, [currentImage,images.length]);

    return (
      <div className='w-full'>
      <div className=' bg-white bg-center bg-cover bg-no-repeat flex justify-start h-[140vh] min-w-full overflow-hidden m-0 p-0'  style={{ 
        backgroundImage: `url(${background})`,
        }}>
          <div className='z-10 flex flex-col justify-start p-4 h-full'>
           <Logo/>
           <h1 className='font1 text-white mt-32 ml-10 text-2xl sm:text-3xl lg:text-3xl xl:text-4xl xl:w-150'>
             Connecting Minds, <br/>
             Unraveling Mysteries: <br/> <br/>
             Welcome to the <span className='text-[#F87F0F]'>Scientific</span> Frontier <br/>
            </h1>
            <button className='bg-[#F87F0F] mt-16 ml-10 text-white text-xl font1 rounded-full w-40 h-11 hover:shadow-xl'>
              <Link to='/users/signup'>Start now</Link>
            </button>
          </div>
          <div className='flex flex-col '>
             <div className='flex flex-row bg-none h-20 justify-around top-4 right-4'>
               <Loginbtn className='text-sm lg:text-base xl:text-lg'/>
               <Signupbtn className='text-sm lg:text-base xl:text-lg'/> 
             </div>
             <div className='bg-none mt-20 bg-no-repeat flex flex-col justify-start h-full '>
                <img src={images[currentImage]} alt='Chimie' className=' -translate-x-10 mt-10 w-72 h-72 sm:w-96 sm:mt-3 sm:-translate-x-20 sm:h-96 lg:w-120 lg:h-120 lg:mt-0 lg:-translate-x-8 xl:w-120 xl:h-120 xl:ml-52 xl:mt-0 xl:-translate-x-32 lg:ml-32 sm:ml-24 '></img>
              </div>
          </div>
          </div>
      </div>
    )
  }


export default Section1