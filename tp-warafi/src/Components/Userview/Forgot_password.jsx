import React, {useState} from "react";
import logo from "../../assets/logo.svg";

export default function ForgotPassword () {
    return(
        <div className="h-full flex flex-col justify-center items-center">
            <img src={logo} className="h-64 mb-10 mt-32"></img>
            <p className="font2 text-xl">Check the URL We sent to your email</p>
        </div>
    );
}