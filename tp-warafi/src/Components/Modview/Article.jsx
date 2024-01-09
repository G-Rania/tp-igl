import React, {useState} from "react";
import showdetails from '../../assets/Usersview/showdetails.svg'
import pdf from '../../assets/Usersview/pdf.svg'
import approvedarticle from '../../assets/Usersview/approved.svg'
import nonapprovedarticle from '../../assets/Usersview/nonapproved.svg'
import { approve, desapprove } from "../../api/moderator/articles_api";


const Article = ({article}) => {

    const [approved, setApproved] = useState(article.approved);
    const handleApproval = async () =>{
        if(!approved){
            const response = await approve(article.id)
        }else{
            const response = await desapprove(article.id)
        }
        setApproved(!approved);
    }

    return(
        <div className="bg-[#E9E9E9] rounded-3xl mr-80 ml-16  mt-16 sm:mr-20 h-72  shadow-xl flex flex-row">
            <div className="bg-none"> 
            <h1 className="text-[#771079] font1 text-sm sm:text-lg md:text-2xl ml-7 sm:mr-32 mt-3">{article.title}</h1>
            <p className="text-[#333333] font2 text-xs lg:text-sm ml-7 mt-7">
            {article.authors.map((author,index) => (
            <span key={index}>{author}{index!==(article.authors.length-1) && (<span>,</span>)}  </span>
        ))}
            <br/> <br/>
            <span className="text-[#F87F0F]">{article.publication_date}</span> <br/> <br/>
            <span className="font1">Keywords: </span> <br/>
            {article.keywords.map((keyword,index) => (
            <span key={index}>{keyword}{index!==(article.keywords.length-1) && (<span>,</span>)}  </span>
        ))}
            </p>
            </div>
             <div className="flex justify-start flex-col h-28 lg:flex-row lg:justify-around w-64 sm:w-120 ml-auto mt-5 sm:mt-auto sm:mr-14 md:mr-24 md:mb-7 lg:mb-0 ">
                <button className="ml-16 w-5 mb-5 lg:w-8 lg:m-4">
                    <img src={showdetails} alt="display details"></img>
                </button>
                <a href="vers pdf" className="w-6 ml-14 translate-x-1 mb-5 lg:w-8 lg:m-4 lg:mt-10">
                    <img src={pdf} alt="lien vers pdf"></img>
                </a>
                <img src={approved? approvedarticle : nonapprovedarticle} alt="state article" onClick={handleApproval} className="w-6 ml-16 lg:w-8 lg:m-4"></img>
             </div>
        </div>
    )
}

export default Article