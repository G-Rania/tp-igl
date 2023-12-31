import React,{useState} from 'react';
import eyeopened from "../../assets/eyeOpened.svg"
import eyeclosed from "../../assets/eyeClosed.svg"
const Input = (props) => {

        const [isPassword, setPassword] = useState(true);
      
        const togglePassword = () => {
          setPassword(!isPassword);
        };
    
  return (
    <div className="w-[70%] flex items-center border-orange-500 border-b-2 mb-6">
    <div className="pl-2">
       <img
         src={props.path}
             alt="Email Icon"
            className="h-6 w-6 text-[#771079] mb-2"
        />
   </div>
    
       { props.show ?
       (
        <div className="w-[100%] flex items-center">
        <input
        type={isPassword ? ("password"):"text"}
        placeholder={props.text}
        className="mb-3 w-full h-full pl-2 border-t-0 border-r-0 border-l-0 focus:outline-none font-bold text-[#771079]"
       />
       <div className="pl-8">
          <button onClick={togglePassword}>
            <img
              src={isPassword ? eyeclosed : eyeopened}
              alt="Eye Icon"
              className="h-6 w-6 text-[#771079] mb-2 cursor-pointer"
            />
          </button>
       </div> 
       </div>) : 
        <input
        type={props.type}
        placeholder={props.text}
        className="mb-3 w-full h-full pl-2 border-t-0 border-r-0 border-l-0 focus:outline-none font-bold text-[#771079]"
       />
            }
   </div>
  );
};

export default Input ;
