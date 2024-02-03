import React, {useState, useEffect} from "react";
import logo from "../../assets/logo.svg";
import lockVector from "../../assets/lockVector.svg";
import eyeClosed from "../../assets/eyeClosed.svg";
import eyeOpened from "../../assets/eyeOpened.svg";
import { resetPassword } from "../../api/users/auth_api";
import { useNavigate } from 'react-router-dom';

export default function ResetPassword () {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible ] = useState(false);

    const handlePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    }

    const [resetToken, setResetToken] = useState('')

    const handleResetPassword = async () =>{
        const response = await resetPassword(resetToken,password);
        if(response === true){
            navigate("/users/login")
        }
    }

    useEffect(() => {
        // Function to run when the component mounts
        const queryParameters = new URLSearchParams(window.location.search)
        const resetToken = queryParameters.get("reset_token")
        setResetToken(resetToken)
    }, []); 
    return(
        <div className="flex flex-col justify-center items-center">
            <img src={logo} className="h-32 mb-7 mt-32"></img>
            <p className="font2 text-xl mb-7">reset your password</p>
            <div className="flex items-center h-[40%] w-[45%] border-b-2 border-orange-500 mb-10">
              <img src={lockVector} alt="Lock Vector" className="h-[20px] w-[20px] mr-[10px]" />
              <input onChange={(e) => setPassword(e.target.value)} id="password"  type= { passwordVisible? "text" : "password"} placeholder="Enter Password" className="w-[90%] h-16 focus:outline-none font-bold text-[#771079]" />
              <img src={ passwordVisible ? eyeOpened : eyeClosed} alt="" className="h-[20px] w-[20px] ml-[10px] cursor-pointer" onClick={handlePasswordVisibility} />
            </div>
            <div className="thirdDiv h-[30%] w-[65%] mb-[20px] flex custom-sm:flex-col items-center justify-around">
            <button onClick={handleResetPassword} className="text-white rounded-full bg-[#F87F0F] font-mada font-bold text-base custom-sm:hidden p-3">
              Reset Password
            </button>
            </div>
        </div>
    );
}