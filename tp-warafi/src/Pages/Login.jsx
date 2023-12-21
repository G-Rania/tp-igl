import React, {useState} from "react";
import image from "../assets/Frame8.svg"
import logo from "../assets/logo.svg"
import handleLogin from "../api/auth_api"



export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log(username)
          const response = await handleLogin(username, password);
          if (response == true){

          }else{
            setErrorMessage(response)
          }// After successful login, perform necessary actions
        } catch (error) {}
      };
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
        <div className="theImagerow h-full w-[37vw] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center" style={{ backgroundImage: `url(${image})` }} >                
            <div className=" theTextDiv h-1/2 w-full flex flex-col justify-end items-center  "> 
            
                        <h2 className="text-white font-mada xl:text-4xl sm:text-[24px] font-semibold leading-[37px]  "> Nice to see you again</h2>
                        <h1 className="text-white font-mada xl:text-6xl sm:text-[30px]  font-bold leading-[37px] mt-[12px] mb-[48px] "> WELCOME BACK</h1>
                
            </div>

            <div className=" signInUpDiv w-full h-1/2 flex flex-col justify-center items-end ">
                        <button className="relative bg-white text-[#771079] font-gilroy font-bold text-4xl rounded-l-full p-[24px] mb-[24px] overflow-hidden">
                            <span className="relative z-10">LOGIN</span>
                            <span className="absolute inset-0 top-0 z-0 bg-gradient-to-b from-gray-300 to-transparent h-4" />
                        </button>
                            
                        <button className="  text-white font-gilroy font-bold text-4xl pr-[24px] mt-[24px]" >SIGNUP</button>
                
                </div>
        </div>

        <div className="secondRow h-full w-[63vw] bg-white flex flex-col justify-center items-center" >

            <div className="  h-[40%] w-full flex items-center justify-center " >
                    <img src={logo} alt="" className=" w-60 h-60"/>
            </div>

            <div className="imputUserName  h-[40%] w-full flex flex-col items-center justify-center ">
                <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username or Email" className="  w-[80%] h-[20%] mb-[12px]  border-t-0 border-r-0 border-l-0 border-b-2 border-orange-500 focus:outline-none font-bold  text-[#771079]" />
                <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Enter Password" className="  w-[80%] h-[20%] border-t-0 border-r-0 border-l-0 border-b-2 border-orange-500 focus:outline-none font-bold text-[#771079] " />
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}
             </div>

            <div className=" thirdDiv h-[20%] w-[65%] flex items-center justify-between">
                <button onClick={handleSubmit} className="loginButton  pr-[48px] pl-[48px] p-[24px] pr-[32px]  rounded-full bg-[#F87F0F] text-white font-gilroy font-bold text-2xl  " > Login </button>
                <a href="" className="text-[#F87F0F] font-mada font-bold text-base ">Forgot Password?</a>
            </div>

                
        </div>

     </div>
        </>
    )
}