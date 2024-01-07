
import React from "react";
import { useState, useEffect } from "react";
import image from "../assets/Frame8.svg";
import logo from "../assets/logo.svg";
import userVector from "../assets/userVector.svg";
import lockVector from "../assets/lockVector.svg";
import eyeClosed from "../assets/eyeClosed.svg";
import eyeOpened from "../assets/eyeOpened.svg";
//import { Link } from "react-router-dom";
import {handleLogin, getData} from "../api/moderator/auth_api";
import { useNavigate } from 'react-router-dom';




export default function Login_mod() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await handleLogin(username, password);
          if (response == true){
            navigate('/mods')
          }else{
            setErrorMessage(response)
          }// After successful login, perform necessary actions
        } catch (error) {}
      };

     
  const [passwordVisible, setPasswordVisible ] = useState(false);



          

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const get_mod_data = async (e) => {
        
    const authenticated = await getData();
    if(authenticated == true) {
        navigate('/mods')
    }
  }
  useEffect(() => {
    get_mod_data();
}, []);

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

        </div>

        <div className="secondRow h-full w-[63vw] bg-white flex flex-col justify-center items-center">
          <div className="h-60  w-full pt-[40px]  flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-60 h-60 " />
          </div>

          <div className="inputUserName h-[40%] w-full flex flex-col items-center justify-center">
            <div className="flex items-center h-[30%] w-[80%] border-b-2 border-orange-500">
              <img src={userVector} alt="User Vector" className="h-[20px] w-[20px] mr-[10px]" />
              <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username or Email" className="w-[90%] h-full focus:outline-none font-bold text-[#771079]" />
            </div>
            <div className="flex items-center h-[30%] w-[80%] border-b-2 border-orange-500">
              <img src={lockVector} alt="Lock Vector" className="h-[20px] w-[20px] mr-[10px]" />
              <input onChange={(e) => setPassword(e.target.value)} type= { passwordVisible? "text" : "password"} placeholder="Enter Password" className="w-[90%] h-full focus:outline-none font-bold text-[#771079]" />
              <img src={ passwordVisible ? eyeOpened : eyeClosed} alt="" className="h-[20px] w-[20px] ml-[10px] cursor-pointer" onClick={handlePasswordVisibility} />
            </div>
            {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}
            <div className="hidden custom-sm:flex items-center justify-end h-[20%] w-full">
              <a href="idk yet" className="text-[#F87F0F] font-mada font-bold text-[12px]">
                Forgot Password ?
              </a>
            </div>
          </div>

          <div className="thirdDiv h-[30%] w-[65%] mb-[20px] flex custom-sm:flex-col items-center justify-around">
            <button onClick={handleSubmit} className="loginButton pr-[40px] pl-[40px] p-[18px] rounded-full bg-[#F87F0F] text-white font-gilroy font-bold text-2xl">
              LOGIN
            </button>
            <a href="idk yet " className="text-[#F87F0F] font-mada font-bold text-base custom-sm:hidden">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
