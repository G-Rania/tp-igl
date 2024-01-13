import React,{useState, useEffect} from "react";
import Modbarre from "../Components/Modview/Modbarre";
import Article from "../Components/Modview/Article";
import Signout from "../Components/AdminPage/Signout";
import { useNavigate} from "react-router-dom";
import { signOut, getData } from "../api/moderator/auth_api";


const Modview = (setArticleSelectionné) => {
    

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


    const navigate = useNavigate();


      const onSignout = async (e) => {
        try{
            const signedOut = signOut()
            if (signedOut){
                navigate('/mods/login')
            }
        }catch(e){}
    }

    const get_mod_data = async (e) => {
      const authenticated = await getData();
      if(authenticated != true){
          navigate('/mods/login')
      }
    }
    useEffect(() => {
      // Function to run when the component mounts
      get_mod_data();
  }, []); 

    

    return(
       
        <div className="flex flex-row">
        <Modbarre handleSignout={handleSignout}></Modbarre>
        <div className="flex flex-col ml-44">
            <Article article={article} setArticleSelectionné={setArticleSelectionné}/>
            <Article article={article}/>
            <Article article={article}/>
            <Article article={article}/>
            <Article article={article}/>
        </div>
        <Signout isOpen={isOpen} onClose={onClose} signOut={onSignout}></Signout>
       </div>
        
    )
}
export default Modview
