import React, {useState} from "react";
import pdf from "../../assets/Usersview/pdf.svg";
import fav from "../../assets/Usersview/fav.svg";
import notfav from "../../assets/Usersview/notfav.svg";
import details from "../../assets/Usersview/showdetails.svg"
import {addFavorite, removeFavorite} from "../../api/users/favorites_api"
import { set } from "date-fns";



const Article = ({article}) => {


    
    const [favorite, setFavorite] = useState(article.favorite)
    const handleFavorite = async () =>{

        
        
        if(!favorite){
        const response = await addFavorite(article.id);
        }else{
         const response = await removeFavorite(article.id);   
        }
        setFavorite(!favorite)
    }



    return(
        <div className="bg-[#E9E9E9] rounded-3xl mx-10 mt-16 h-72 shadow-xl flex flex-row">
            <div className="bg-none"> 
            <h1 className="text-[#771079] font1 text-sm sm:text-lg md:text-2xl ml-7 mt-3">{article.title}</h1>
            <p className="text-[#333333] font2 text-xs lg:text-sm ml-7 mt-7">
            {article.authors.map((author,index) => (
            <span key={index}>{author}{index!==(article.authors.length-1) && (<span>,</span>)}  </span>
        ))}
                 <br/> <br/>
            <span className="text-[#F87F0F]">{article.publication_date}</span> <br/> <br/>
            <span className="font1">Keywords: </span> <br/>
            {article.keywords.map((keyword,index) => (
            <span key={index}>{keyword}{index!==(article.keywords.length-1) && (<span>,</span>)}  </span>
        ))}
            </p>
            </div>
             <div className="flex justify-start flex-col h-28 lg:flex-row lg:justify-around w-64 sm:w-120 ml-auto mt-5 sm:mt-auto sm:mr-14 md:mr-24 md:mb-7 lg:mb-0 ">
                <button className="ml-16 w-5 mb-5 lg:w-8 lg:m-4">
                    <img src={details} alt="display details"></img>
                </button>
                <a href="vers pdf" className="w-6 ml-14 translate-x-1 mb-5 lg:w-8 lg:m-4 lg:mt-10">
                    <img src={pdf} alt="lien vers pdf"></img>
                </a>
                <button>
                <img src={favorite? fav : notfav} alt="state article" onClick={handleFavorite} className="w-6 ml-16 lg:w-8 lg:m-4"></img>

                </button>
             </div>
        </div>
    )
}

export default Article