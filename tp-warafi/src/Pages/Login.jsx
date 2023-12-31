
import React from "react";
import { useState } from "react";
import image from "../assets/Frame8.svg";
import logo from "../assets/logo.svg";
import or from "../assets/or.svg";
import userVector from "../assets/userVector.svg";
import lockVector from "../assets/lockVector.svg";
import eyeClosed from "../assets/eyeClosed.svg";
import eyeOpened from "../assets/eyeOpened.svg";
import { Link } from "react-router-dom";




export default function Login() {


  const [passwordVisible, setPasswordVisible ] = useState(false);



          

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <div className="fullPage h-screen w-screen flex flex-row justify-center items-center">
        <div
          className="theImagerow h-full w-[37vw] custom-sm:hidden bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="theTextDiv h-1/2 w-full flex flex-col justify-end items-center">
            <h2 className="text-white font-mada xl:text-4xl sm:text-[24px] font-semibold leading-[37px]">
              Nice to see you again
            </h2>
            <h1 className="text-white font-mada xl:text-6xl sm:text-[30px] font-bold leading-[37px] mt-[12px] mb-[48px]">
              WELCOME BACK
            </h1>
          </div>

          <div className="signInUpDiv w-full h-1/2 flex flex-col justify-center items-end">
            <button className="relative bg-white text-[#771079] font-gilroy font-bold text-4xl rounded-l-full p-[24px] mb-[24px] overflow-hidden">
              <span className="relative z-10">LOGIN</span>
              <span className="absolute inset-0 top-0 z-0 bg-gradient-to-b from-gray-300 to-transparent h-4" />
            </button>
            <button className="text-white font-gilroy font-bold text-4xl pr-[24px] mt-[24px]"> 
              <Link to='/signup' >SIGNUP</Link>            
             </button>
          </div>
        </div>

        <div className="secondRow h-full w-[63vw] bg-white flex flex-col justify-center items-center">
          <div className="h-60  w-full pt-[40px]  flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-60 h-60 " />
          </div>

          <div className="inputUserName h-[40%] w-full flex flex-col items-center justify-center">
            <div className="flex items-center h-[30%] w-[80%] border-b-2 border-orange-500">
              <img src={userVector} alt="User Vector" className="h-[20px] w-[20px] mr-[10px]" />
              <input type="text" placeholder="Username or Email" className="w-[90%] h-full focus:outline-none font-bold text-[#771079]" />
            </div>
            <div className="flex items-center h-[30%] w-[80%] border-b-2 border-orange-500">
              <img src={lockVector} alt="Lock Vector" className="h-[20px] w-[20px] mr-[10px]" />
              <input type= { passwordVisible? "text" : "password"} placeholder="Enter Password" className="w-[90%] h-full focus:outline-none font-bold text-[#771079]" />
              <img src={ passwordVisible ? eyeOpened : eyeClosed} alt="" className="h-[20px] w-[20px] ml-[10px] cursor-pointer" onClick={handlePasswordVisibility} />
            </div>
            <div className="hidden custom-sm:flex items-center justify-end h-[20%] w-full">
              <a href="idk yet" className="text-[#F87F0F] font-mada font-bold text-[12px]">
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="thirdDiv h-[30%] w-[65%] mb-[20px] flex custom-sm:flex-col items-center justify-around">
            <button className="loginButton pr-[40px] pl-[40px] p-[18px] rounded-full bg-[#F87F0F] text-white font-gilroy font-bold text-2xl">
              LOGIN
            </button>
            <a href="idk yet " className="text-[#F87F0F] font-mada font-bold text-base custom-sm:hidden">
              Forgot Password?
            </a>
            <div className="h-[10%] w-full hidden custom-sm:flex">
              <img src={or} alt="Or" className="h-full w-full" />
            </div>
            <button className="signupButton hidden custom-sm:flex pr-[32px] pl-[32px] p-[18px] rounded-full bg-[#D416D8] text-[#771079] font-gilroy font-bold text-2xl">
            <Link to='/signup' >SIGNUP</Link>            
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
