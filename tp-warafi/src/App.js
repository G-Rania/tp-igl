
import './App.css'

import Adminbarre from './Components/AdminPage/Adminbarre.jsx';
import Modview from './Pages/Modview';
import './index.css'
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Home from './Pages/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Pages/Sign-up.jsx';
import FavoritesPage from './Pages/FavoritesPage.jsx';
import ManageMods from './Pages/ManageMods.jsx';
import UploadFile from './Pages/UploadFile.jsx';
import AddModerator from './Components/AdminPage/AddModerator.jsx';
import Login_mod from './Pages/Login_mod.jsx';
import Login_admin from './Pages/Login_admin.jsx';
import ArticleDetails_user from './Pages/ArticleDetails_user.jsx';
import ArticleDetails_mod from './Pages/ArticleDetails_mod.jsx';
import React,{useEffect,useState}  from 'react';

function App() {
  const [articleSelectionné, setarticleSelectionné ]=useState()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/home" element={<Home />} />
        <Route path='/users/signup' element ={<Signup />}></Route>
        <Route path='/mods' element={<Modview setarticleSelectionné={setarticleSelectionné}/>}></Route>
        <Route path='/mods/article_details' element={<ArticleDetails_mod articleSelectionné={articleSelectionné}/>}></Route>
        <Route path='/admin/upload' element={<UploadFile />}></Route>
        <Route path='/admin/managemods' element={<ManageMods />}></Route>
        <Route path="/admin/login" element={<Login_admin/>} />
        <Route path="/mods/login" element={<Login_mod/>} />
        <Route path='/users/favorites' element={<FavoritesPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;


//-----------------Ceci pour tester l'authentification du user ------------------------------
/*<Route path="/" element={<LandingPage />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/home" element={<Home />} />
        <Route path='/users/signup' element ={<Signup />}></Route>
        <Route path='/users/favorites' element={<FavoritesPage/>}></Route>*/
        

//----------------------Ceci pour tester l'authentification du admin----------------------------------
        /*<Route path="/users/login" element={<Login_admin/>} />
        <Route path='/admin' element={<ManageMods/>}/>*/


//---------------------Ceci pour tester l'authentification du moderator--------------------
/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users/login" element={<Login_mod/>} />
        <Route path='/mods' element={<Modview/>}/>
      </Routes>
    </BrowserRouter> */





    /**/