import React from "react";
import search from '../../Images/LandingPage/Search.svg'
import find from '../../Images/LandingPage/Find.svg'
import download from '../../Images/LandingPage/Download.svg'
import learn from '../../Images/LandingPage/Learn.svg'



const Section3 = () => {
    return(
        <div className="flex flex-row justify-around ml-0 ">
             <img src={search} alt='illustration' className=' h-20 sm:h-28 lg:h-36 xl:h-40 xl:ml-0  '></img>
             <img src={find} alt='illustration' className='   h-20 sm:h-28 lg:h-36 xl:h-40 '></img>
             <img src={download} alt='illustration' className=' h-20 sm:h-28 lg:h-36 xl:h-40 '></img>
             <img src={learn} alt='illustration' className=' h-20 sm:h-28 lg:h-36  xl:h-40 '></img>
        </div>
    )
}

export default Section3