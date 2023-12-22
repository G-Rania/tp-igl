import React, { useEffect } from "react";
import signOut from "../api/sign_out_api";
import getData from "../api/get_data_api";
import { useNavigate } from 'react-router-dom';




export default function Home(){
    const navigate = useNavigate();
    const userSignOut = async (e) => {
        try{
            signOut()
        }catch(e){}
        finally{
            navigate('/users/login')
        }
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