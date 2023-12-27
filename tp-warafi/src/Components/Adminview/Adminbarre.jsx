import React /*{useState,useEffect}*/from "react";
import background from "../../assets/Usersview/bg_mod_admin.svg"
import logo from "../../Images/LogoBlanc.svg"
import upload from "../../assets/Usersview/uploadFile.svg"
import manage from "../../assets/Usersview/manageMods.svg"
import signout from "../../assets/Usersview/signout.svg"

const Adminbarre = () =>{

    return (
        <div className="flex flex-col justify-start items-center h-screen w-[21%]" style={{backgroundImage: `url(${background})`}}>
            <img src={logo} alt="logo" className="mb-20 h-20 lg:h-32 mt-6"></img>
          <div className="flex flex-col  ">
              <div className="flex flex-col lg:flex-row ml-6 mr-6 mb-14">
                  <img src={upload} alt="upload articles" className=" mb-1  lg:mr-6 h-6 lg:h-10"></img>
                  <button className="bg-none text-white font1 text-xs lg:text-base justify-start mr-3"> Upload Articles</button>
               </div>
             <div className="flex  flex-col lg:flex-row ml-6 mr-6 mb-14">
                   <img src={manage} alt="manage mods" className=" mb-1 lg:mr-6 h-6 lg:h-10"></img>
                  <button className="bg-none text-white font1 text-xs lg:text-base justify-start ">Manage Mods</button>
             </div>
             <div className="flex  flex-col lg:flex-row ml-6 mr-6 ">
                   <img src={signout} alt="signout" className=" mb-1 lg:mr-6 h-6 lg:h-10"></img>
                  <button className="bg-none text-white font1 text-xs lg:text-base justify-start">Sign out</button>
               </div>
           </div>  
        </div>
 )
}

export default Adminbarre