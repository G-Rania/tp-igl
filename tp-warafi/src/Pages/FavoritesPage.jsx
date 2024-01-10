import React, {useEffect} from "react";
import Article from '../Components/Userview/Article_user' 
import Footer from "../Components/Footer";
import {signOut, getData} from "../api/users/auth_api";
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.svg";
import logo from "../assets/white_logo.svg";



const FavoritesPage = () =>{


    const navigate = useNavigate();
    const goToLandingPage = () => {
        navigate('/users/home'); // Navigating to the specified route '/'
      };

    const goToFavoritesPage = () => {
        navigate('/users/favorites');
    }; 

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

    return (
      
           <div className="w-full">
            <div className=' top-0 left-0 bg-white bg-cover bg-center bg-no-repeat flex h-[20vh]  w-full'  style={{ 
                backgroundImage: `url(${background})`,
                margin: 0,
            }}>
                <div className="flex flex-col items-center space-y-12 w-full">
                <div className="flex flex-row justify-between items-start w-full pt-6  px-4 lg:px-8">
                    <img src={logo} className="h-20 lg:h-26"></img>
                    <div className="flex flex-row space-x-10 lg:space-x-20">
                        <div className=' group relative bg-none justify-around md:items-end'>
                            <button onClick={goToLandingPage} className='bg-none  text-white text-md lg:text-lg font1 w-20 md:w-auto whitespace-nowrap'>Home</button>
                            <div className=" opacity-0  p-0 w-full transition duration-300 ease-in-out group-hover:opacity-100">
                                <div className=" w-full h-0.5 bg-white"></div>
                            </div>
                        </div>
                        <div className=' group relative bg-none justify-around md:items-end'>
                            <button onClick={goToFavoritesPage} className='bg-none  text-white text-md lg:text-lg font1 w-20 md:w-auto whitespace-nowrap'>Favorites</button>
                            <div className=" opacity-0  p-0 w-full transition duration-300 ease-in-out group-hover:opacity-100">
                                <div className=" w-full h-0.5 bg-white "></div>
                            </div>
                        </div>
                    
                            <button onClick={userSignOut} className='  text-white bg-orange-500 text-md lg:text-lg rounded-lg font1 px-4   md:w-auto whitespace-nowrap'>Sign out</button>
                       
                    </div>
                </div>
                </div>
                </div>

    
                <div className="h-52"></div>
              <Footer/>
            </div>
           

        
    )

}

export default FavoritesPage