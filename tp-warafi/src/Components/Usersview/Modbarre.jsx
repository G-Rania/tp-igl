import React /*{useState,useEffect}*/from "react";
import background from "../../assets/Usersview/bg_mod_admin.svg"
import logo from "../../Images/LogoBlanc.svg"
import article from "../../assets/Usersview/article.svg"
import signout from "../../assets/Usersview/signout.svg"

const Modbarre = () =>{

    return (
        <div className="flex flex-col justify-start h-screen w-80" style={{backgroundImage: `url(${background})`}}>
            <img src={logo} alt="logo" className="mb-28 h-20 lg:h-32 mt-6"></img>
            <div className="flex flex-col lg:flex-row ml-6 mb-20">
                <img src={article} alt="non approved articles" className=" ml-4 mb-3 w-5 lg:w-9"></img>
                <button className="bg-none text-white font1 text-xs lg:text-base justify-start mr-3"> Non approved articles</button>
            </div>
            <div className="flex  flex-col lg:flex-row ml-6 mr-6">
                <img src={signout} alt="signout" className=" mb-3 lg:mr-6 h-6 lg:h-10"></img>
                <button className="bg-none text-white font1 text-xs lg:text-base justify-start">Sign out</button>
            </div>
        </div>
    )
}
export default Modbarre