import React from "react";
import Adminbarre from "../Components/Usersview/Adminbarre";
import ModInfo from "../Components/Usersview/Modinfo";
import triangle from "../assets/Usersview/triangle.svg"


const ManageMods = (props) => {
    return(
        <div className="flex flex-row justify-start">
            <Adminbarre/>

            <div className="w-[78vw]">
              <div className="flex flex-row justify-between w-[89%] mt-12 mb-6">
                    <h1 className="font1 text-xl ml-16 1mt-">Moderators (4)</h1>
                    <button className="mt-1 bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded">
                       Add mod
                    </button>
             </div>
 
            <div className="flex flex-col justify-start items-center w-[100%] ">

                
              <div className="flex flex-row items-center w-[100%] ml-14 h-8  bg-[#F87F0F] bg-opacity-30">
                  <div className="font1  ml-4 mr-56">Name</div>
                  <div className= "font1 mr-56 ml-10">Email</div>
                  <div className="font1 ml-20">Password</div>
              </div>
              <div className="w-[100%]  flex flex-col space-y-4 mt-5 ml-20">
                 <ModInfo name="wassim" email="la_kireche@esi.dz" password="123456"/>
                 <ModInfo name="wassim" email="la_kireche@esi.dz" password="123456"/>
                 <ModInfo name="wassim" email="la_kireche@esi.dz" password="123456"/>
                 <ModInfo name="wassim" email="la_kireche@esi.dz" password="123456"/>
                 <ModInfo name="wassim" email="la_kireche@esi.dz" password="123456"/>
                 <ModInfo name="wassim" email="la_kireche@esi.dz" password="123456"/>
                 <ModInfo name="wassim" email="la_kireche@esi.dz" password="123456"/>
                 
              </div>
              </div>
            </div>

             
        </div>
    )
}
export default ManageMods