import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import { DateRangePicker } from "rsuite"; 
import "rsuite/dist/rsuite-no-reset.min.css";
import { useParams } from 'react-router-dom';
import { search } from '../../api/users/search_api';


export default function Filter ({ close, query, setArticles }) {

    const [author, setAuthor] = useState(null)
    const [keyword, setKeyword] = useState(null)
    const [institution, setInstitution] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [value, setValue] =  useState([null, null]);

    const applyFilter = async()=>{
        try{
        const params = {
            q:query
        }
        if(keyword){
            params.keyword = keyword
        }
        if(author){
            params.author = author
        }
        if (institution){
            params.institution = institution
        }
        if (value[0]){
            params.start_date = value[0]
            params.end_date = value[1]
        }
        const articles = await search(params)
        setArticles(Array.from(articles))
    }catch(e){}
        
    }

   
 return (
     <div className={` absolute w-full h-full flex items-center justify-center dialog-filter left-[50%] md:left-[45.5%]`}>
        <div className="absolute w-full h-full" onClick={close}></div>
        <div className={`editDiv  p-[40px] absolute flex flex-col items-start justify-between h-[60%] w-[29rem] md:w-[31rem]    border-[5px] border-solid border-[#771079] bg-white rounded-[20px] font-gilory text-[18px] md:text-[18px] transform transition-transform ease-in-out`}>
           
            
            
            <div className='flex flex-col space-y-7'>
                <div className='flex flex-row justify-between space-x-4'>
                <label>
                    Keywords : 
                </label>
                <input onChange={(e) => setKeyword(e.target.value)} className=' bg-gray-200 rounded-xl w-64 md:w-72 px-3'></input>
                </div>

                <div className='flex flex-row justify-between'>
                <label>
                    Authors : 
                </label>
                <input onChange={(e) => setAuthor(e.target.value)} className=' bg-gray-200 rounded-xl w-64 md:w-72 px-3'></input>
                </div>

                <div className='flex flex-row justify-between'>
                <label>
                    Institutions : 
                </label>
                <input onChange={(e) => setInstitution(e.target.value)} className=' bg-gray-200 rounded-xl w-64 md:w-72 px-3'></input>
                </div>
                
                <div className='flex flex-row justify-between'>
                <label>
                    Date : 
                </label>
                <DateRangePicker
                value={value}  
                onChange={setValue} /> 
                </div>
  

            </div>

          <div className=' pt-6 h-[20%] w-full flex flex-row items-center justify-between '>
          <button className='font-bold text-[14px] bg-gray-300 rounded px-4 py-2 ' onClick={close} > Cancel</button>
         <button onClick={applyFilter} className='font-bold text-white text-[16px] bg-[#F87F0F] rounded px-6 py-2 '> Apply filter</button>
         </div>  
         
         </div>
       
  </div>
        );
     
}
