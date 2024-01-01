
import './App.css'
import Adminbarre from './Components/AdminPage/Adminbarre.jsx';
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
import Signout from './Components/AdminPage/Signout';

function App() {
  return (
    <BrowserRouter>
    <Routes>
  <Route  path="/upload" element={<UploadFile />} />
  <Route  path="/managemods" element={<ManageMods />} />
</Routes>

  
    </BrowserRouter>
    );
}

export default App;



