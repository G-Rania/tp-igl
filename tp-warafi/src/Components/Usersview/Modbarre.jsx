import React /*{useState,useEffect}*/from "react";
import background from "../../assets/Usersview/bg_mod_admin.svg"
import logo from "../../Images/LogoBlanc.svg"
import article from "../../assets/Usersview/article.svg"
import signout from "../../assets/Usersview/signout.svg"

const Modbarre = () =>{

    return (
        <div className="flex flex-col justify-start h-screen" style={{backgroundImage: `url(${background})`}}>
            <img src={logo} alt="logo" className="mb-28 h-32 mt-6"></img>
            <div className="flex flex-row ml-6 mb-20">
                <img src={article} alt="non approved articles" className="mr-2"></img>
                <button className="bg-none text-white font1 text-base justify-start mr-3"> Non approved articles</button>
            </div>
            <div className="flex flex-row ml-6 mr-6">
                <img src={signout} alt="signout" className="mr-6 h-10"></img>
                <button className="bg-none text-white font1 text-base justify-start">Sign out</button>
            </div>
        </div>
    )
}
export default Modbarre