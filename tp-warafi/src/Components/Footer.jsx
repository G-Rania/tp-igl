import React from "react";
import background from "../Images/Footer.svg"
import logo from "../Images/LogoBlanc.svg"

const Footer = () =>  {
    return(
        <div className=' top-0 left-0 bottom-0 bg-white bg-center bg-no-repeat flex flex-col justify-center items-center'  style={{ 
            backgroundImage: `url(${background})`,
            margin: 0,
            padding: 0,
            backgroundSize: 'cover',
            height:'50vh'
            }}>
                  <img src={logo} alt="logoblanc" className='flex w-28 h-28 mt-10 lg:w-36 lg:h-36'></img>
                  <div className='bg-none' style={{ padding: "28px" }}></div>
                  <p className="font2 text-justify text-white">Copyright © 2023 DataLink G05. All Rights Reserved.</p>
             
        </div>
    )
}

export default Footer