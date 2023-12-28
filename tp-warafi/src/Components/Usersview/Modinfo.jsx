import React from "react";
import edit from "../../assets/Usersview/pen.svg"
import trash from "../../assets/Usersview/trash.svg"


const ModInfo =(props)=> {
    return ( 
        <div className="flex flex-row justify-between h-10 items-center w-[100%] ml-1 transition duration-300 ease-in-out hover:bg-[#771079] hover:bg-opacity-20">
             <div className="font2 font-light text">{props.name}</div>
             <div className= "font2 ml-10 mr-16">{props.email}</div>
             <div className="font2 mr-22 ">{props.password}</div>
             <div>
                <button>
                    <img src={edit} alt="" className="  mr-10  h-5" />
                </button>
                <button>
                    <img src={trash} alt="" className="mr-6 h-5"/>
                </button>
             </div>
        </div>
     );
}

export default ModInfo;