import React, { useState, useEffect } from "react";
import AddModDiv from "../Components/AdminPage/AddModerator";
import EditModDiv from "../Components/AdminPage/EditModerator";
import RemoveModDiv from "../Components/AdminPage/RemoveMod";
import SignoutDiv from "../Components/AdminPage/Signout";
import Adminbarre from "../Components/AdminPage/Adminbarre";
import ModInfo from "../Components/AdminPage/Modinfo";
import { getMods } from "../api/admin/mod_api";

import { signOut, getData } from "../api/admin/auth_api";
import { useNavigate } from "react-router-dom";




const ManageMods = (props) => {

  const moderator = {
    id :"",
    username:"",
    email:"",
    password : ""
  }
  const [modSelectionné, setModSelectionné ]=useState(moderator)

  const [modTable, setModTable] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const moderators = await getMods();
        setModTable(moderators);
      } catch (error) {
        console.error("Error fetching moderators:", error);
      }
    };

    fetchData();
  }, []);

    

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
              navigate('/admin/login')
          }
      }catch(e){}
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

    
    const removeModFromTable = (moderatorId) => {
      setModTable((prevMods) => prevMods.filter((mod) => mod.id !== moderatorId));
    };
    const addModToTable = (newModerator) => {
      setModTable((prevMods) => [...prevMods, newModerator]);
    };
    const updateModinTable = (updatedModerator) => {
      setModTable((prevMods) => {
        // Find the index of the moderator to be updated
        const index = prevMods.findIndex((mod) => mod.id === updatedModerator.id);
    
        // If the moderator is found, update its information
        if (index !== -1) {
          // Create a new array with the updated moderator
          const newMods = [...prevMods];
          newMods[index] = updatedModerator;
    
          return newMods;
        }
    
        // If the moderator is not found, return the previous array as it is
        return prevMods;
      });
    };
    
  
        const get_admin_data = async (e) => {
          const authenticated = await getData();
          if(authenticated != true){
              navigate('/admin/login')
          }
        }
        useEffect(() => {
          // Function to run when the component mounts
          get_admin_data();
      }, []); 

    return(
        <div className="flex  flex-row justify-start">
            <Adminbarre onSignout={handleSignout} which={1}  />

            <div className="w-[78vw]">
              <div className="flex flex-row justify-between w-[89%] mt-12 mb-6">
                    <h1 className="font1 text-xl ml-16 1mt-">Moderators ({modTable.length})</h1>
                    <button className="mt-1 bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
                    onClick={ handleAddMod }>
                       Add mod
                    </button>
             </div>
 
            <div className="flex  flex-col justify-start items-center w-[100%] ">

                
              <div className="flex flex-row items-center w-[100%] ml-14 h-8  bg-[#F87F0F] bg-opacity-30 custom-sm:ml-6">
                  <div className="font1  ml-4 mr-56 custom-sm:mr-16">Name</div>
                  <div className= "font1 mr-56 ml-10 custom-sm:mr-20 custom-sm:ml-2">Email</div>
                  <div className="font1 ml-20 custom-sm:ml-10">Password</div>
              </div>
              <div className="w-[100%]  flex flex-col space-y-4 mt-5 ml-20 custom-sm:ml-6">
                {modTable.map((mod)=>(
                <ModInfo key={mod.id} modInfo={mod} onEditMod={handleEditMod} onRemoveMod={handleRemoveMod} setModSelectionné={setModSelectionné} />
                ))}

              </div>
              </div>
            </div>
         <EditModDiv isOpen={editIsOpen} onClose={closeEditDiv} ancienMod={modSelectionné} updateTable={updateModinTable} ></EditModDiv>
         <SignoutDiv isOpen={isOpen} onClose={onClose} ></SignoutDiv>
         <RemoveModDiv isOpen={removeIsOpen} onClose={closeRemovetDiv} id={modSelectionné.id} updateTable={removeModFromTable} ></RemoveModDiv>
         <AddModDiv isOpen={addIsOpen} onClose={closeAddtDiv} updateTable={addModToTable}></AddModDiv>

        </div>
    )
}
export default ManageMods