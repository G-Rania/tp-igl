import React,{useEffect,useState} from "react";
import Footer from "../Components/Footer";
import {signOut} from "../api/moderator/auth_api";
import { useNavigate } from 'react-router-dom';
import background from "../assets/background.svg";
import logo from "../assets/white_logo.svg";
import pdf from "../assets/Usersview/pdf.svg";
import approved_icon from "../assets/Usersview/approved.svg";
import nonapproved from "../assets/Usersview/nonapproved.svg";
import trash from "../assets/Usersview/trash.svg";
import pen from "../assets/Usersview/pen.svg";
import save from "../assets/save-icon.svg";
import { useLocation } from 'react-router-dom';
import { approve, desapprove, updateArticle } from "../api/moderator/articles_api";
import { set } from "date-fns";
import RemoveArticle from "../Components/Modview/Remove_article";




const ArticleDetails_mod = () =>{
    const [removeIsOpen, setRemoveIsOpen]= useState(false);
    const closeRemovetDiv = ()=>{
        setRemoveIsOpen(false);
      }
      const handleRemoveMod = ()=>{
        setRemoveIsOpen(true);
      }

    const transformRefrencesToString = (refrences) =>{
        var text = "";
        for (let i = 0; i < refrences.length; i++) {
            text +=refrences[i].trim();
            if(i!==(refrences.length-1)){
                text = text+'#\n'
            }
        }
        return text;
    }
    const transformStringToRefrences = (referencesString) =>{
        return referencesString.split('#\n').map(word => word.trim())
    }
    const transformAuthorsToString = (authors) =>{
        var text=""
        for (let i = 0; i < authors.length; i++) {
            text = text+authors[i]
            if(i!==(authors.length-1)){
                text = text+', '
            }
        }
        return text
    }
    const transformStringToAuthors = (authorsString) => {
        return authorsString.split(',').map(word => word.trim());
        
    }
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [updatedAbstract, setUpdatedAbstract] = useState('');
    const [updatedAuthors, setUpdatedAuthors] = useState(null)
    const [authors_string, setAuthorString] = useState('')
    const [updatedKeywords, setUpdatedKeywords] = useState(null)
    const [keywords_string, setKeywordsString] = useState('')
    const [updatedRefrences, setUpdatedRefrences] = useState(null)
    const [references_string, setRefrencesString] = useState('')

    const [isRemoved, setRemoved] = useState(false);
    const handleEditClick = () => {
            setIsEditing(true);
    };
  
    const handleSaveClick = async () => {
      
      const params = {
        id: article.id,
        title: updatedTitle,
        publish_date: updatedDate,
        authors: transformStringToAuthors(authors_string),
        keywords: transformStringToAuthors(keywords_string),
        abstract: updatedAbstract,
        references: transformStringToRefrences(references_string)
      };
      const response = await updateArticle(params);
      setIsEditing(false);
      setUpdatedAuthors(transformStringToAuthors(authors_string))
      setUpdatedKeywords(transformStringToAuthors(keywords_string))
      setUpdatedRefrences(transformStringToRefrences(references_string))
    };

    const handleChange = (e) => {
        setUpdatedTitle(e.target.value);
      };

    const handleChangeDate =(e) =>{
        setUpdatedDate(e.target.value)
    }
    const handleChangeAbstract = (e) =>{
        setUpdatedAbstract(e.target.value)
    }  
    const handleChangeAuthors = (e) =>{
        setAuthorString(e.target.value)   
    }
    const handleChangeKeywords = (e) =>{
        setKeywordsString(e.target.value)
    }
    const handleChangeReferences = (e) =>{
        setRefrencesString(e.target.value)
    }
    

    function NewlineText(full_text) {
        const formattedText = full_text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ));
        
          return (
            
            <pre>
              {formattedText}
            </pre>
         
          );
    }

    const location = useLocation();
    
    /* ceci est pour le test*/
    const article2 = {
       title: "The application of artificial intelligence in clinical diagnosis and treatment of intracranial hemorrhage",
       authors: "Jian-bo CHANG, Ren-zhi WANG, Ming FENG",
       date: "September 2023",
       keywords:" intracranial hemorrhages, artificial intelligence, review",
       abstract: "Ceci est initialement mon test du abstract",
       content: "ceci est initialement mon test du content",
       references: "ceci est initialement mon test des références",
   } 

   const [article, setArticle] = useState(null)
   const [approved, setApproved] = useState(false);
   const handleApproval = async () =>{
    if(!approved){
        const response = await approve(article.id)
    }else{
        const response = await desapprove(article.id)
    }
       setApproved(!approved);
   }

       


   const navigate = useNavigate();
   const goToLandingPage = () => {
       navigate('/'); // Navigating to the specified route '/'
     };


   const modSignOut = async (e) => {
       try{
           const signedOut = signOut()
           if (signedOut){
               navigate('/mods/login')
           }
       }catch(e){}
       
   }
   useEffect(()=>{
    const articleMod  = location.state.article;
    setArticle(articleMod)
    setApproved(articleMod.approved)
    setUpdatedTitle(articleMod.title)
    setUpdatedDate(articleMod.publication_date)
    setUpdatedAbstract(articleMod.abstract)
    setUpdatedAuthors(articleMod.authors)
    setAuthorString(transformAuthorsToString(articleMod.authors))
    setUpdatedKeywords(articleMod.keywords)
    setKeywordsString(transformAuthorsToString(articleMod.keywords))
    setUpdatedRefrences(articleMod.references)
    setRefrencesString(transformRefrencesToString(articleMod.references))
    console.log(articleMod.references);
   }, [])
   /*const get_user_data = async (e) => {
       const authenticated = await getData();
       if(authenticated != true){
           navigate('/users/login')
       }
     }
   useEffect(() => {
       // Function to run when the component mounts
       get_user_data();
   }, []); */
if( article !== null){
   return (
            
          <div className="w-full">

           <div className=' top-0 left-0 bg-white bg-cover bg-center bg-no-repeat flex h-[20vh]  w-full'  style={{ 
               backgroundImage: `url(${background})`,
               margin: 0,
           }}>
               <div className="flex flex-col items-center space-y-12 w-full">
               <div className="flex flex-row justify-between items-start w-full pt-6  px-4 lg:px-8">
                   <img src={logo} alt="logo" className="h-20 lg:h-26"></img>
                   <div className="flex flex-row space-x-10 lg:space-x-20">
                       <div className=' group relative bg-none justify-around md:items-end'>
                           <button onClick={goToLandingPage} className='bg-none  text-white text-md lg:text-lg font1 w-20 md:w-auto whitespace-nowrap'>Home</button>
                           <div className=" opacity-0  p-0 w-full transition duration-300 ease-in-out group-hover:opacity-100">
                               <div className=" w-full h-0.5 bg-white"></div>
                           </div>
                       </div>
                      
                           <button onClick={modSignOut} className='  text-white bg-orange-500 text-md lg:text-lg rounded-lg font1 px-4   md:w-auto whitespace-nowrap'>Sign out</button>
                      
                   </div>
               </div>
               </div>
               </div>
              <div className="w-screen ">
              
              <h1 className="text-[#771079] font1 text-xl sm:text-2xl md:text-4xl ml-12 mt-12 md:mr-44 ">
                {isEditing ? (
                    <textarea
                    type="text"
                    className="w-full border-b border-[#771079] outline-none"
                    value={updatedTitle}
                    onChange={handleChange}
                    rows={2}
                    
                    />
                ) : (
                    <>
                    {updatedTitle}
                    </>
                )}
                
    </h1>
                  
                 
                  <div className="absolute flex flex-row bg-none space-x-10 sm:space-x-40 lg:space-x-[100vh]">

                    <p className="text-[#333333] font1 text-xl mt-12 ml-12">Published: 
                    {isEditing ?(
                                            <textarea
                                            type="text"
                                            className="font2 ml-2"
                                            value={updatedDate}
                                            onChange={handleChangeDate}
                                            rows={1}
                                            
                                            />
                    ):<span className="font2 ml-2">
                    {updatedDate}</span>}
                    
                    
                    </p>
                    
                    <div className="flex flex-row space-x-4 lg:space-x-10  justify-around items-center mt-12 ">
                    <a href={article.pdf_url} target="_blank" rel="noopener noreferrer" className="w-8 md:w-10  flex flex-row">
                       <img src={pdf} alt="lien vers pdf"></img>
                    </a>
                    <button onClick={handleApproval}>
                         <img src={approved? approved_icon : nonapproved}  alt="approval" className="w-6 md:w-8 "></img>
                    </button>
                    {isEditing ?(
                                            <button onClick={handleSaveClick} >
                                            <img src={save}  alt="edit" className="w-6 md:w-8 "></img>
                                       </button>
                    ):<button onClick={handleEditClick} >
                    <img src={pen}  alt="edit" className="w-6 md:w-8 "></img>
               </button>}
                        {!isRemoved?(
                    <button onClick={handleRemoveMod}>
                         <img src={trash}  alt="delete" className="w-6 md:w-8 "></img>
                    </button>)
                    : <span className="text-red-600"> This article is removed</span>
}
                  </div>
              </div>
              </div>
              <RemoveArticle isOpen={removeIsOpen} onClose={closeRemovetDiv} id={article.id} onRemove={setRemoved}></RemoveArticle>
              <div className="flex justify-center items-center ">
              <div className="bg-[#E9E9E9] w-[80vh] sm:w-[90vh] md:w-[150vh] rounded-3xl mx-20 mt-40 h-60 shadow-xl flex flex-row space-x-16 md:space-x-20 items-center mb-40 ">
               
              <div className="flex flex-col">
    <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl ml-8">Authors:</h1>
    <p className="font2 text-[#333333] text-base md:text-lg mt-6 ml-8">
        {isEditing ?(
            <>
            <textarea
                type="text"
                className=" font2 w-72 ml-2"
                value={authors_string}
                onChange={handleChangeAuthors}
                rows={3}
                                            
                                            />
            
            </>
        ): 
        <>
        {updatedAuthors.map((author, index) => (
            <span key={index}>
                {author}
                {index !== updatedAuthors.length - 1 && ", "}
            </span>
            
        ))}
        </>}
        
    </p>
</div>
        
                     
                    <div className="h-44 rounded-full w-1.5 md:w-1 bg-[#771079]"></div>
                    <div className="flex flex-col -translate-x-6 md:-translate-x-10">
                        <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl ">Keywords:</h1>
                        <p className="font2 text-[#333333] text-base md:text-lg mt-6 ">
                        {isEditing ?(
            <>
            <textarea
                type="text"
                className=" font2 w-90 ml-2"
                value={keywords_string}
                onChange={handleChangeKeywords}
                rows={3}
                                            
                                            />
            
            </>
        ): 
        <>
        {updatedKeywords.map((author, index) => (
            <span key={index}>
                {author}
                {index !== updatedKeywords.length - 1 && ", "}
            </span>
            
        ))}
        </>}
    </p>
                    </div>
                    </div>
              </div>
              <div className="w-full">
              <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl ml-20">Abstract:</h1>
              <p className="font2 text-[#333333] text-base md:text-lg mt-6 ml-20 mb-24">
                {isEditing ?(
                    <textarea
                    type="text"
                    className="w-full font2 ml-2"
                    value={updatedAbstract}
                    onChange={handleChangeAbstract}
                    rows={20}></textarea>
                ):
                <>
                {updatedAbstract}
                
                </>}
                
                
                </p>
              <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl ml-20">Content:</h1>
              {<p className="font2 text-[#333333] text-base md:text-lg mt-6 ml-6 mb-24" >{NewlineText(article.full_text)}</p>}
              
              <h1 className="font1 text-[#F87F0F] text-2xl md:text-3xl ml-20">References:</h1>
              <p className="font2 text-[#333333] text-base md:text-lg mt-6 ml-20 mb-24">
              {isEditing ?(
            <>
            <div className="w-full">
            <textarea
                type="text"
                className="w-full font2  ml-2"
                value={references_string}
                onChange={handleChangeReferences}
                rows={6}
                
                                            
                                            />
            </div>
            </>
        ): 
        <>
        {updatedRefrences.map((keyword, index) => (
            <div key={index}>
                -{keyword}
                {index !== updatedRefrences.length - 1 && " "}
            </div>
        ))}
        </>}
              
              </p>
              </div>
              
              <div className="h-32"></div>
              <Footer/>
              
               </div>
               
               
               
)
        }
}

export default ArticleDetails_mod

