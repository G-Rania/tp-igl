import React from "react";
import Adminbarre from "../Components/AdminPage/Adminbarre";
import cloud from "../assets/Usersview/cloud.svg"

const UploadFile = (props) => {
    return(
        <div className="flex flex-row justify-start">
            <Adminbarre/>

            <div className="w-[78vw] flex justify-center items-center">
              <div className="flex flex-col items-center w-[85%] h-[80%] border-dashed border-2 border-orange-500 rounded-lg p-4">
                      <img src={cloud} alt="" className="w-[26%] h-[30%] mt-5"/> 
                      <h1 className="text-black font1 text-2xl mt-7 mb-7 text-center">Drag and Drop your files here </h1>
                      <p className="text-black font1 text-2xl  mb-7 text-center">or </p>
                      <button class="bg-white  transition duration-300 ease-in-out hover:bg-orange-500 hover:text-white text-orange-500 border-2 border-solid border-opacity-75 border-orange-500 font1 py-4 px-12 rounded">
                          Browse Files
                      </button>

              </div>
            </div>

             
        </div>
    )
}
export default UploadFile