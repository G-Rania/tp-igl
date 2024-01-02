import React, { useState } from "react";
import AddModDiv from "../Components/AdminPage/AddModerator";
import EditModDiv from "../Components/AdminPage/EditModerator";
import RemoveModDiv from "../Components/AdminPage/RemoveMod";
import SignoutDiv from "../Components/AdminPage/Signout";
import Adminbarre from "../Components/AdminPage/Adminbarre";
import ModInfo from "../Components/Usersview/Modinfo";



const ManageMods = (props) => {
    const mod = {
        name :"wassim",
        email:"la_kireche@esi.dz",
         password:"123456"
    }

    const [isOpen,setIsSignoutOpen]= useState(false); 
    const onClose = ()=>{
      setIsSignoutOpen(false);
    }
    const handleSignout = ()=>{
      setIsSignoutOpen(true);
    }

    const [editIsOpen, setEditIsOpen]= useState(false);
    const closeEditDiv = ()=>{
        setEditIsOpen(false);
      }
      const handleEditMod = ()=>{
        setEditIsOpen(true);
      }

      const [removeIsOpen, setRemoveIsOpen]= useState(false);
      const closeRemovetDiv = ()=>{
          setRemoveIsOpen(false);
        }
        const handleRemoveMod = ()=>{
          setRemoveIsOpen(true);
        }

        const [addIsOpen, setAddIsOpen]= useState(false);
      const closeAddtDiv = ()=>{
          setAddIsOpen(false);
        }
        const handleAddMod = ()=>{
          setAddIsOpen(true);
        }

    return(
        <div className="flex flex-row justify-start">
            <Adminbarre onSignout={handleSignout} which={1}  />

            <div className="w-[78vw]">
              <div className="flex flex-row justify-between w-[89%] mt-12 mb-6">
                    <h1 className="font1 text-xl ml-16 1mt-">Moderators (4)</h1>
                    <button className="mt-1 bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
                    onClick={ handleAddMod }>
                       Add mod
                    </button>
             </div>
 
            <div className="flex flex-col justify-start items-center w-[100%] ">

                
              <div className="flex flex-row items-center w-[100%] ml-14 h-8  bg-[#F87F0F] bg-opacity-30 custom-sm:ml-6">
                  <div className="font1  ml-4 mr-56 custom-sm:mr-16">Name</div>
                  <div className= "font1 mr-56 ml-10 custom-sm:mr-20 custom-sm:ml-2">Email</div>
                  <div className="font1 ml-20 custom-sm:ml-10">Password</div>
              </div>
              <div className="w-[100%]  flex flex-col space-y-4 mt-5 ml-20 custom-sm:ml-6">
                 <ModInfo modInfo={mod} onEditMod={handleEditMod} onRemoveMod={handleRemoveMod} />
                 <ModInfo modInfo={mod} onEditMod={handleEditMod} onRemoveMod={handleRemoveMod} />
                 <ModInfo modInfo={mod} onEditMod={handleEditMod} onRemoveMod={handleRemoveMod} />
                 <ModInfo modInfo={mod} onEditMod={handleEditMod} onRemoveMod={handleRemoveMod} />

              </div>
              </div>
            </div>

            
         <EditModDiv isOpen={editIsOpen} onClose={closeEditDiv}></EditModDiv>
         <SignoutDiv isOpen={isOpen} onClose={onClose} ></SignoutDiv>
         <RemoveModDiv isOpen={removeIsOpen} onClose={closeRemovetDiv}></RemoveModDiv>
         <AddModDiv isOpen={addIsOpen} onClose={closeAddtDiv}></AddModDiv>

        </div>
    )
}
export default ManageMods