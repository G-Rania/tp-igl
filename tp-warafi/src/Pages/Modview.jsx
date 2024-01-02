import React,{useState} from "react";
import Modbarre from "../Components/Modview/Modbarre";
import Article from "../Components/Modview/Article";
import Signout from "../Components/AdminPage/Signout";


const Modview = () => {

    /* ceci est pour le test*/
    const article = {
        title: "The application of artificial intelligence in clinical diagnosis and treatment of intracranial hemorrhage",
        authors: "Jian-bo CHANG, Ren-zhi WANG, Ming FENG",
        date: "September 2023",
        keywords:" intracranial hemorrhages, artificial intelligence, review",
    }

    const [isOpen,setIsSignoutOpen]= useState(false); 
    const onClose = ()=>{
      setIsSignoutOpen(false);
    }
    const handleSignout = ()=>{
      setIsSignoutOpen(true);
    }

    return(
        <div className="flex flex-row">
        <Modbarre onSignout={handleSignout}></Modbarre>
        <div className="flex flex-col ml-44">
            <Article article={article}/>
            <Article article={article}/>
            <Article article={article}/>
            <Article article={article}/>
            <Article article={article}/>
        </div>
        <Signout isOpen={isOpen} onClose={onClose} ></Signout>
       </div>
        
    )
}
export default Modview