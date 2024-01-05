import React, {useState, useEffect } from "react";
import {signOut, getData} from "../api/users/auth_api";
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.svg";
import logo from "../assets/white_logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Article from "../Components/Userview/Article_user";
import User from "../models/user";
import SignoutDiv from "../Components/AdminPage/Signout";
import filter from "../assets/filter.svg";
import Filter from "../Components/Userview/Filter";
import { search } from "../api/users/search_api";




export default function Home(){
    const [isOpen,setIsSignoutOpen]= useState(false); 

    const [query, setQuery] = useState("")
    const [articles, setArticles] = useState([])

    const user_serach=async()=>{
        try{
        const params = {
            q:query
        }
        const response = await search(params)
        
        setArticles(Array.from(response))

        }catch(e){}
    }

    const onClose = ()=>{
      setIsSignoutOpen(false);
    }
    const handleSignout = ()=>{
      setIsSignoutOpen(true);
    }

    const [isFilter, setFilter] = useState(false);
    const closeFilter = ()=>{
        setFilter(false)
    }
    const openFilter = () => {
        setFilter(true)
    }

    const navigate = useNavigate();
    const goToLandingPage = () => {
        navigate('/'); // Navigating to the specified route '/'
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
    return(
        <div className="w-full">
            <div className=' top-0 left-0 bg-white bg-cover bg-center bg-no-repeat flex h-[45vh]  w-full'  style={{ 
                backgroundImage: `url(${background})`,
                margin: 0,
            }}>
                <div className="flex flex-col items-center space-y-12 w-full">
                <div className="flex flex-row justify-between items-start w-full pt-6  px-4 lg:px-8">
                    <img src={logo} className="h-20 lg:h-28"></img>
                    <div className="flex flex-row space-x-10 lg:space-x-20">
                        <div className=' group relative bg-none justify-around md:items-end'>
                            <button onClick={goToLandingPage} className='bg-none  text-white text-md lg:text-lg font1 w-20 md:w-auto whitespace-nowrap'>Home</button>
                            <div className=" opacity-0  p-0 w-full transition duration-300 ease-in-out group-hover:opacity-100">
                                <div className=" w-full h-0.5 bg-white"></div>
                            </div>
                        </div>
                        <div className=' group relative bg-none justify-around md:items-end'>
                            <button className='bg-none  text-white text-md lg:text-lg font1 w-20 md:w-auto whitespace-nowrap'>Favorites</button>
                            <div className=" opacity-0  p-0 w-full transition duration-300 ease-in-out group-hover:opacity-100">
                                <div className=" w-full h-0.5 bg-white "></div>
                            </div>
                        </div>
                    
                            <button onClick={handleSignout} className='  text-white bg-orange-500 text-md lg:text-lg rounded-lg font1 px-4   md:w-auto whitespace-nowrap'>Sign out</button>
                       
                    </div>
                </div>
                <div className="flex flex-row space-x-4 items-center">
                    <div className=" pr-3 flex flex-row items-center outline-none w-80 md:w-120 rounded-[2rem] h-12 bg-grey">
                    
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Enter your username"
                        className="px-3 outline-none w-80 md:w-120 rounded-[2rem] h-12 bg-grey "
                    />
                    <button onClick={user_serach}>
                    <FontAwesomeIcon icon={faSearch} className=" text-white text-xl bg-orange-500 p-2 rounded-full" />
                    </button>
                    </div>
                    <button onClick={openFilter} className="bg-orange-500 rounded-xl h-[80%] px-3 text-white text-lg font1">
                        <div className="flex flex-row space-x-2">
                            <img src={filter}></img>
                            <p>Filter</p>
                        </div>
                    </button>
                </div>    
               
                </div>
            </div>
            <div>
            {articles.map((article) => (
          <div  key={article.id}>
            <Article key={article.id} article={article}/>
          </div>
        
        ))}
        </div>

            
            <SignoutDiv  isOpen={isOpen} onClose={onClose} signOut={userSignOut}></SignoutDiv>
            {isFilter && (
                    <Filter close={closeFilter} query={query} setArticles={setArticles}></Filter>
                )}
            
            
        </div>
        
    );
}