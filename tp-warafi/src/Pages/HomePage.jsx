import React, { useEffect } from "react";
import signOut from "../api/users/sign_out_api";
import getData from "../api/users/get_data_api";
import { useNavigate } from 'react-router-dom';




export default function Home(){
    const navigate = useNavigate();
    const userSignOut = async (e) => {
        try{
            const signedOut = signOut()
            if (signedOut){
                navigate('/users/login')
            }
        }catch(e){}
        
    }
    const get_user_data = async (e) => {
        const authenticated = await getData();
        if(authenticated != true){
            navigate('/users/login')
        }
      }
    useEffect(() => {
        // Function to run when the component mounts
        get_user_data();
    }, []); 
    return(
        <div>
            <h3>Home Page</h3>
            <button onClick={userSignOut}>sign out</button>
        </div>
    );
}