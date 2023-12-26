import React, {useState} from "react";
import showdetails from '../../assets/Usersview/showdetails.svg'
import pdf from '../../assets/Usersview/pdf.svg'
import approvedarticle from '../../assets/Usersview/approved.svg'
import nonapprovedarticle from '../../assets/Usersview/nonapproved.svg'


const Article = () => {

    const [approved, setApproved] = useState(false);
    const handleApproval = () =>{
        setApproved(!approved);
    }

    return(
        <div className="bg-[#E9E9E9] rounded-3xl ml-10 mt-16 mr-20 h-72 w-full shadow-xl flex flex-row">
            <div> 
            <h1 className="text-[#771079] font1 text-2xl ml-7 mr-32 mt-3">The application of artificial intelligence in clinical diagnosis and treatment of intracranial hemorrhage </h1>
            <p className="text-[#333333] font2 ml-7 mt-7">Jian-bo CHANG, Ren-zhi WANG, Ming FENG <br/> <br/>
            <span className="text-[#F87F0F]">September 2023</span> <br/> <br/>
            <span className="font1">Keywords: </span> <br/>
            intracranial hemorrhages, artificial intelligence, review
            </p>
            </div>
             <div className="bg-none flex flex-row w-120 ml-auto mr-3 mt-auto mb-7">
                <button className="bg-none ">
                    <img src={showdetails} alt="display details"></img>
                </button>
                <a href="vers pdf" className="ml-10">
                    <img src={pdf} alt="lien vers pdf"></img>
                </a>
                <img src={approved? approvedarticle : nonapprovedarticle} alt="state article" onClick={handleApproval} className="ml-10"></img>
             </div>
        </div>
    )
}

export default Article