import React,{useState, useEffect} from "react";
import Modbarre from "../Components/Modview/Modbarre";
import Article from "../Components/Modview/Article";
import Signout from "../Components/AdminPage/Signout";
import { useNavigate} from "react-router-dom";
import { signOut, getData } from "../api/moderator/auth_api";
import { getNotApproved } from "../api/moderator/articles_api";


const Modview = () => {

    const [articles, setArticles] = useState([])

    /* ceci est pour le test*/


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

    const get_not_approved = async (e) => {
      const articles = await getNotApproved();
      if (articles != false){
        setArticles(Array.from(articles))
      }else{
        console.log("error");
      }
    }

    useEffect(() => {
      // Function to run when the component mounts
      get_mod_data();
      get_not_approved();
  }, []); 

    

    return(
        <div className="flex flex-row">
        <Modbarre handleSignout={handleSignout}></Modbarre>
        <div className="flex flex-col ml-44">
          {articles.map((article) => (
            <div  key={article.id}>
              <Article key={article.id} article={article}/>
            </div>
          
          ))}
        </div>
        <Signout isOpen={isOpen} onClose={onClose} signOut={onSignout}></Signout>
       </div>
        
    )
}
export default Modview