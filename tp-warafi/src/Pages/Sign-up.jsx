import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/Frame8.svg"
import logo from "../assets/logo.svg"
import email from"../assets/email.svg"
import password from "../assets/password.svg"
import user from "../assets/user.svg"
import Input from "../Components/Signup/Input";
import {handleSignup, getData} from "../api/users/auth_api";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const [username, setUsername] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userEmail, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await handleSignup(userEmail, username, userPassword);
          if (response == true){
            navigate('/users/home')
          }else{
            setErrorMessage(response)
          }// After successful login, perform necessary actions
        } catch (error) {}
      };
    const get_user_data = async (e) => {
        const authenticated = await getData();
        if(authenticated == true){
            navigate('/users/home')
        }
      }
      useEffect(() => {
        get_user_data()
    }, []); 
  return(
        <>
    <div className="  fullPage h-screen w-screen flex flex-row justify-center items-center ">
            <style>
            {`
                @media (max-width: 600px) {
                .theImagerow {
                    display: none;
                }
                }
            `}
            </style>
        <div className="theImagerow h-full w-[33%] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center" style={{ backgroundImage: `url(${image})` }} >                
            <div className=" theTextDiv h-1/2 w-full flex flex-col justify-end items-center  "> 
            
                        <h2 className="text-white font-mada xl:text-3xl sm:text-[24px] font-semibold leading-[37px]  "> Nice to see you again</h2>
                        <h1 className="text-white font-mada xl:text-5xl sm:text-[30px]  font-bold leading-[37px] mt-[12px] mb-[48px] "> WELCOME BACK</h1>
                
            </div>

            <div className=" signInUpDiv w-full h-1/2 flex flex-col justify-center items-end ">
                        
                            
                        <button className="  text-white font-gilroy font-bold text-4xl pr-[24px] mt-[24px]" >
                          <Link to='/users/login'>LOGIN</Link>
                        </button>
                        
                        <button className="relative bg-white text-[#771079] font-gilroy font-bold text-4xl rounded-l-full p-[24px] mt-[24px] overflow-hidden">
                            <span className="relative z-10">SIGNUP</span>
                            <span className="absolute inset-0 top-0 z-0 bg-gradient-to-b from-gray-300 to-transparent h-4" />
                        </button>
                
                </div>
        </div>

        <div className="secondRow h-full w-[67vw] bg-white flex flex-col justify-center items-center" >

            <div className="  h-[60%] w-full flex items-center justify-center " >
                    <img src={logo} alt="" className=" w-40 h-40"/>
            </div>

            <div className="imputUserName  h-[40%] w-full flex flex-col items-center justify-center ">
                 <Input onChange={(e) => setEmail(e.target.value)} path={email} text="Email" type="text" show={false}/>
                 <Input onChange={(e) => setUsername(e.target.value)} path={user} text="Username"type="text"show={false}/>
                 <Input onChange={(e) => setPassword(e.target.value)} path={password} text="Password" show={true}/>
            </div>

            {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}

            <div className=" thirdDiv w-[100%] md:w-[70%] h-[10%] w-[70%] flex items-center  justify-center md:justify-end ">
                <button onClick={handleSubmit} className="signupButton h-[10%] w-[50%] md:w-[30%] pr-[20px] pl-[15px] pt-[10px] pb-[40px]  rounded-full bg-[#F87F0F] text-white font-gilroy font-bold text-xl  " > Signup </button>
            </div>

                
        </div>

    </div>
        </>
    )
}