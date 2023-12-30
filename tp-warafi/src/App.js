
import './App.css'
import Adminbarre from './Components/Usersview/Adminbarre';
import Modview from './Pages/Modview';
import './index.css'
import ManageMods from './Pages/ManageMods';
import UploadFile from './Pages/UploadFile';
import {
  BrowserRouter ,
  Routes,
  Route,
  
} from "react-router-dom";
import LandingPage from './Pages/LandingPage.jsx';
import Signup from './Pages/Sign-up.jsx'
import Login from './Pages/Login.jsx'

function App() {
  return (
    <BrowserRouter>
  <   Routes>
        <Route index path='/landingPage'  element={<LandingPage/>} > </Route>  
        <Route path='/login' element={<Login/>}> </Route>
        <Route  path='/signup' element={<SignUpPage/>} ></Route>
      </Routes>
    </BrowserRouter>
    );
}

export default App;



