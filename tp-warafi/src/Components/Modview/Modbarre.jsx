import React ,{useState} from "react";
import background from "../../assets/Usersview/bg_mod_admin.svg"
import logo from "../../Images/LogoBlanc.svg"
import article from "../../assets/Usersview/article.svg"
import signout from "../../assets/Usersview/signout.svg"
import triangle from "../../assets/Usersview/triangle.svg"


const Modbarre = ({handleSignout}) =>{    
    
    
    const [page, setPage] = useState(0);

    const handleArticlesPage = () => {
        setPage(0);
    }

    const handleSignoutPage = () => {
        setPage(1);
    }

    return (
        <div className="flex flex-col fixed justify-start items-center w-52 " style={{backgroundImage: `url(${background})`  , minHeight: '100vh'}}>
            <img src={logo} alt="logo" className="mb-28 h-20 xl:h-32 mt-6"></img>
            <div className="flex flex-row">
              <div className="flex flex-col xl:flex-row ml-6 mb-20">
                  <img src={article} alt="non approved articles" className=" ml-4 mb-3 w-5 sm:w-9 "></img>
                  <button className="bg-none text-white font1 text-xs sm:text-sm xl:text-base justify-start mr-3" onClick={handleArticlesPage}> Non approved articles</button>
              </div>
              <img src={page===0? triangle : null} alt="" className="-translate-x-4 ml-4 -translate-y-8 xl:translate-x-1 sm:-translate-x-4 md:-translate-x-4"></img>
            </div>
            <div className="flex flex-row">
               <div className="flex  flex-col xl:flex-row ml-6 mr-6">
                  <img src={signout} alt="signout" className=" mb-3 h-6 sm:h-10 xl:ml-3"></img>
                  <button className="bg-none text-white font1 text-xs sm:text-sm xl:text-base lg:ml-3 justify-start" onClick={()=>{handleSignoutPage(); handleSignout()}}>Sign out</button>
               </div>

               <img src={page===1? triangle : null} alt="" className="translate-x-1 xl:translate-x-12 lg:translate-x-1 sm:translate-x-1"></img>
            </div>
        </div>
    )
}
export default Modbarre