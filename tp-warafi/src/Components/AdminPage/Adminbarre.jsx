import React ,{useState} from "react";
import background from "../../assets/Usersview/bg_mod_admin.svg"
import logo from "../../Images/LogoBlanc.svg"
import upload from "../../assets/Usersview/uploadFile.svg"
import manage from "../../assets/Usersview/manageMods.svg"
import signout from "../../assets/Usersview/signout.svg"
import triangle from "../../assets/Usersview/triangle.svg"


const Adminbarre = ({onSignout }) =>{
    const [whichPage, setWhichPage ] = useState(0);

    const SignoutPage = () => {
        setWhichPage(2);
    }
    const UploadPage = () => {
        setWhichPage(0);
    }
    const ManagePage = () => {
        setWhichPage(1);
    }
    
    

    return (
        <div className="flex flex-col justify-start items-center h-screen w-[21%vw]" style={{backgroundImage: `url(${background})`}}>
          <img src={logo} alt="logo" className="mb-20 h-20 lg:h-32 mt-6"></img>
          <div className="flex flex-col w-[100%] ">
            <div className="flex flex-row mb-14 justify-between w-[100%]">
              <div className="flex flex-col lg:flex-row ml-4 mr-4 md:mr-6 ">
                  <img src={upload} alt="upload articles" className=" mb-1  lg:mr-6 h-6 lg:h-10"></img>
                  <button onClick={UploadPage}className="bg-none text-white font1 text-xs lg:text-base justify-start "> Upload Articles</button>
               </div>
               <img src={whichPage===0 ? triangle : null} alt="" className=""></img>

            </div>
            <div className="flex flex-row mb-14 justify-between w-[100%] ">
             <div className="flex  flex-col lg:flex-row ml-4 mr-4 md:mr-6 ">
                   <img src={manage} alt="manage mods" className=" mb-1 lg:mr-6 h-6 lg:h-10"></img>
                  <button onClick={ManagePage}className="bg-none text-white font1 text-xs lg:text-base justify-start ">Manage Mods</button>
             </div>
             <img src={whichPage===1 ? triangle : null} alt="" className=""></img>

 
             </div>
             <div className="flex flex-row  w-[100%]">
                 <div className="flex  flex-col lg:flex-row ml-4 mr-6 md:mr-16">
                      <img src={signout} alt="signout" className=" mb-1 lg:mr-6 h-6 lg:h-10"></img>
                     <button className="bg-none text-white font1 text-xs lg:text-base justify-start"
                     onClick={ ()=>  {SignoutPage() ; onSignout()} } 
                     >Sign out</button>
                 </div>
                 <img src={whichPage===2 ? triangle : null} alt="" className=""></img>

              </div> 
           </div> 
        </div>
 )
}

export default Adminbarre