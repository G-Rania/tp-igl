import React, {useState} from "react";
import logo from "../../assets/logo.svg";
import OtpInput from 'react-otp-input';
import { verifyEmail } from "../../api/users/auth_api";
import { useNavigate } from 'react-router-dom';

export default function OTPVerification () {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const handleSubmit = async () =>{
        const response = await verifyEmail(otp);
        if (response === true){
            navigate("/users/home")
        }
    }
    return(
        <div className="flex flex-col justify-center items-center">
            <img src={logo} className="h-32 mb-10 mt-32"></img>
            <p className="font2 text-xl mb-10"> verify your email and enter the OTP Code</p>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={5}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                    border: '1px solid black',
                    textAlign: 'center',
                    height: '3rem', // h-12 translates to a height of 12 Tailwind units, which is 3rem by default
                    width: '2.5rem', // w-10 translates to a width of 10 Tailwind units, which is 2.5rem by default
                    paddingLeft: '0.5rem', // px-2 translates to horizontal padding of 0.5rem
                    paddingRight: '0.5rem', // px-2 translates to horizontal padding of 0.5rem
                    borderRadius: '0.375rem', // rounded-lg translates to a border-radius of 0.375rem (6px by default)
                  }}
            />
            <button onClick={handleSubmit} className="text-white mt-8 rounded-full bg-[#F87F0F] font-mada font-bold text-base custom-sm:hidden p-3">
              Verify Email
            </button>
        </div>
    );
}