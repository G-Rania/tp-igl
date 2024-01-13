import React ,{useState, useEffect}from "react";
import { text } from '@fortawesome/fontawesome-svg-core';
import Adminbarre from "../Components/AdminPage/Adminbarre";
import cloud from "../assets/Usersview/cloud.svg"
import SignoutDiv from "../Components/AdminPage/Signout"
import Form from './Form';
import { getData } from "../api/admin/auth_api";
import { useNavigate } from "react-router-dom";
import { addArticle } from "../api/admin/article_api";


const UploadFile = (props) => {


  const initialFormData = {
    id:'',
    email: '',
    username: '',
  };

 const [formData, setFormData] = useState(initialFormData); /*used to track the imput fields inside the Form component */
  const [message, setMessage] = useState(''); /*For the message response of the request to the server */
  const [isSuccess, setIsSuccess] = useState(false)
  
  const handleAddArticle = (e) => {
  e.preventDefault();

   addArticle( formData )
    .then(response => {
      if (response.status === 200) {
        setMessage('Article Added Successfully ');
        //console.log(response)
        formData.id=response.data['mod_id']
        console.log('Added Article is :', formData);
        setIsSuccess(true);
      } else {
        setMessage(response);
        setIsSuccess(false);
      }
    })
    .catch(error => {
      console.log(error);
      setMessage('Unexpected error occurred, please try again');
      setIsSuccess(false);
    });
};


    const navigate = useNavigate();
    const [isOpen,setIsSignoutOpen]= useState(false); 
    const onClose = ()=>{
      setIsSignoutOpen(false);
    }
    const handleSignout = ()=>{
      setIsSignoutOpen(true);
    } 

    const [isUpload,setUpload]= useState(false); 
    const Upload = ()=>{
      setUpload(true);
    }
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
        <div className="flex flex-row justify-start">
             <Adminbarre onSignout={handleSignout} which={0} />



            <div className="w-[78vw] flex flex-col justify-center items-center">
            <h1 className=" absolute top-20 font1 text-4xl text-blac text-center"> Upload File</h1>

                <div className="relative mt-20 w-[80%] ">
                  <div className={isUpload?"absolute -mt-3 mr-2 pr-2 pl-1 top-0 left-2 bg-white pb-1 px-1  text-green-500 font1" :"absolute -mt-3 mr-2 pr-2 pl-1 top-0 left-2 bg-white pb-1 px-1  text-orange-500 font1"}>Enter the Url</div>
                
                  <input
                    type="text"
                    className={isUpload ? "w-full px-4 py-4 border-2 border-opacity-100 border-green-500 rounded-md" : "w-full px-4 py-4 border-2 border-opacity-100 border-orange-500 rounded-md"}
                  />

                 
                 {isUpload ? ( <p className="font2 text-[#5E5E5E] text-sm text-center mt-4">Upload successful !</p>) 
                  : ( <p className="font2 text-[#5E5E5E] text-sm text-center mt-4">Please make sure the URL is valid, and the file is accessible.</p> )}
                 
               </div>

               <button  onClick={{Upload,handleAddArticle}} className=" absolute bottom-16 right-52 m-2 transform translate-x-1/2 bg-orange-500 text-white   border-2 border-solid border-opacity-75 border-orange-500 font1 py-2 px-6 rounded">
                          Upload
             </button>

            </div>

            {/*<SignoutDiv isOpen={isOpen} onClose={onClose} ></SignoutDiv>*/}

        </div>
    )
}
export default UploadFile