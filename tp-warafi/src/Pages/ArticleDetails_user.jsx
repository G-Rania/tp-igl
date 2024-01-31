import React,{useEffect,useState} from "react";
import Footer from "../Components/Footer";
import {signOut, getData} from "../api/users/auth_api";
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.svg";
import logo from "../assets/white_logo.svg";
import pdf from "../assets/Usersview/pdf.svg";
import fav from "../assets/Usersview/fav.svg";
import notfav from "../assets/Usersview/notfav.svg";
import { useLocation } from 'react-router-dom';
import {addFavorite, removeFavorite} from "../api/users/favorites_api"

function NewlineText(full_text) {
    const formattedText = full_text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    
      return (
        
        <pre>
          {formattedText}
        </pre>
     
      );
}

const ArticleDetails_user = () =>{

    /* ceci est pour le test*/
    const _article23 = {
       title: "The application of artificial intelligence in clinical diagnosis and treatment of intracranial hemorrhage",
       authors: "Jian-bo CHANG, Ren-zhi WANG, Ming FENG",
       date: "September 2023",
       keywords:" intracranial hemorrhages, artificial intelligence, review",
       abstract: "Ceci est initialement mon test du abstract",
       content: "ceci est initialement mon test du content",
       references: "ceci est initialement mon test des références",
   } 
   const location = useLocation();

   const [favorite, setApproved] = useState(false);
   const [article, setArticle] = useState(null)
   

    const handleFavorite = async () =>{
        
        if(!favorite){
            const response = await addFavorite(article.id);
            }else{
             const response = await removeFavorite(article.id);   
            }

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
    const articleUser  = location.state;
    setArticle(articleUser)
    setApproved(articleUser.favorite)
   }, []); 
if (article != null){
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
                    <span className="font2 ml-4">{article.publication_date}</span>
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
              </div>
              
              <div className="flex justify-center items-center ">
              <div className="bg-[#E9E9E9] w-[80vh] sm:w-[90vh] md:w-[150vh] rounded-3xl mx-20 mt-40 h-60 shadow-xl flex flex-row space-x-28 md:space-x-60 items-center mb-40 ">
               
                    <div className="flex flex-col">
                        <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl  ml-8">Authors:</h1>
                        <p className="font2 text-[#333333] text-base md:text-lg mt-6 ml-8">        {article.authors.map((author, index) => (
            <span key={index}>
                {author}
                {index !== article.authors.length - 1 && ", "}
            </span>
        ))}</p>
                    </div>
                    <div className="h-44 rounded-full w-1.5 md:w-1 bg-[#771079]"></div>
                    <div className="flex flex-col -translate-x-10 md:-translate-x-40">
                        <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl  ">Keywords:</h1>
                        <p className="font2 text-[#333333] text-base md:text-lg mt-6 ">        {article.keywords.map((keyword, index) => (
            <span key={index}>
                {keyword}
                {index !== article.keywords.length - 1 && ", "}
            </span>
        ))}</p>
                    </div>
                    </div>
              </div>
              <div className="w-screen">
              <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl ml-20">Abstract:</h1>
              <p className="font2 text-[#333333] text-base md:text-lg mt-6 ml-20 mb-24">{article.abstract}</p>
              <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl ml-20">Content:</h1>
              <p className="font2 text-[#333333] text-base md:text-lg mt-6 ml-20 mb-24">{NewlineText(article.full_text)}</p>
              <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl ml-20">References:</h1>
              <p className="font2 text-[#333333] text-base md:text-lg mt-6 ml-20 mb-24">{article.references.map((keyword, index) => (
            <div key={index}>
                -{keyword}
                {index !== article.keywords.length - 1 && " "}
            </div>
        ))}</p>
              </div>

              <div className="h-32"></div>
              <Footer/>
               </div>
               
)
        }
}

export default ArticleDetails_user

