
import './App.css'


//import Adminbarre from './Components/AdminPage/Adminbarre.jsx';
import Modview from './Pages/Modview';
import './index.css'
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Home from './Pages/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Pages/Sign-up.jsx';
import ManageMods from './Pages/ManageMods.jsx';
import UploadFile from './Pages/UploadFile.jsx';
import AddModerator from './Components/AdminPage/AddModerator.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/home" element={<Home />} />
        <Route path='/users/signup' element ={<Signup />}></Route>
        <Route path='/mods' element={<Modview />}></Route>
        <Route path='/admin/manageMods' element={<ManageMods />}></Route>

      </Routes>
    </BrowserRouter>  
  );

}

export default App;