import React,{useEffect,useState} from "react";
import Footer from "../Components/Footer";
import {signOut, getData} from "../api/users/auth_api";
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.svg";
import logo from "../assets/white_logo.svg";
import pdf from "../assets/Usersview/pdf.svg";
import fav from "../assets/Usersview/fav.svg";
import notfav from "../assets/Usersview/notfav.svg";


const ArticleDetails = () =>{

    /* ceci est pour le test*/
    const article = {
       title: "The application of artificial intelligence in clinical diagnosis and treatment of intracranial hemorrhage",
       authors: "Jian-bo CHANG, Ren-zhi WANG, Ming FENG",
       date: "September 2023",
       keywords:" intracranial hemorrhages, artificial intelligence, review",
   } 

   const [favorite, setApproved] = useState(false);

    const handleFavorite = async () =>{
        
        /*if(!favorite){
        const response = addFavorite();
        }else{
         const response = removeFavorite();   
        }*/

        setApproved(!favorite);
    }

   const navigate = useNavigate();
   const goToLandingPage = () => {
       navigate('/'); // Navigating to the specified route '/'
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
                   <img src={logo} alt="logo" className="h-20 lg:h-26"></img>
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
              <div className="w-screen ">
                  <h1 className="text-[#771079] font1 text-xl sm:text-2xl md:text-4xl ml-12 mt-12 md:mr-44 ">{article.title}</h1>
                  <div className="absolute flex flex-row bg-none space-x-10 sm:space-x-40 lg:space-x-[100vh]">
                    <p className="text-[#333333] font1 text-xl mt-12 ml-12">Published: 
                    <span className="font2 ml-4">{article.date}</span>
                    </p>
                    <div className="flex flex-row space-x-16 lg:space-x-28  justify-around items-center mt-12 ">
                    <a href="vers pdf" className="w-6 md:w-8  flex flex-row">
                       <img src={pdf} alt="lien vers pdf"></img>
                    </a>
                    <button onClick={handleFavorite}>
                         <img src={favorite? fav : notfav}  alt="favoris" className="w-6 md:w-8 "></img>
                    </button>
                  </div>
              </div>

              <div className="bg-[#E9E9E9] rounded-3xl mx-20 mt-40 h-72 shadow-xl flex flex-row mb-40">
                <div className="flex flex-row space-x-20">
                    <div className="flex flex-col">
                        <h1 className="font1 text-[#F87F0F] text-3xl mt-8 ml-8">Authors:</h1>
                        <p className="font2 text-[#333333] mt-10 ml-8">{article.authors}</p>
                    </div>
                </div>
              </div>
               </div>
               </div>
)

}

export default ArticleDetails

