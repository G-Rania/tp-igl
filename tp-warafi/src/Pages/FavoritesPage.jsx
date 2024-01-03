import React from "react";
import Article from '../Components/Userview/Article_user' 
import Footer from "../Components/Footer";



const FavoritesPage = () =>{

     /* ceci est pour le test*/
     const article = {
        title: "The application of artificial intelligence in clinical diagnosis and treatment of intracranial hemorrhage",
        authors: "Jian-bo CHANG, Ren-zhi WANG, Ming FENG",
        date: "September 2023",
        keywords:" intracranial hemorrhages, artificial intelligence, review",
    } 

    return (
        /*ici on rajoute la barre*/
        <div className="flex flex-col justify-center">
            <Article article={article}/>
            <Article article={article}/>
            <Article article={article}/>
            <Article article={article}/>
            <Article article={article}/>
            <div className="h-16"></div>
            <Footer/>
        </div>
    )

}

export default FavoritesPage