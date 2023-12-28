
import './App.css'
import Adminbarre from './Components/Usersview/Adminbarre';
import Modview from './Pages/Modview';
import './index.css'
import ManageMods from './Pages/ManageMods';
import UploadFile from './Pages/UploadFile';
/*import {
  BrowserRouter ,
  Routes,
  Route,
  
} from "react-router-dom";
import LandingPage from './Pages/LandingPage.jsx';
import Signup from './Pages/Sign-up.jsx'
import Login from './Pages/Login.jsx'*/

function App() {
  return (
    /*<BrowserRouter>
     <Routes>
        <Route path='/'  element={<LandingPage/>} >
        </Route>
        
        <Route path='/login' element={<Login/>}>
        </Route>

        <Route  path='/signup' element={<Signup/>} >
        </Route>
      </Routes>
    </BrowserRouter>*/
    <UploadFile/>
    );
}

export default App;



