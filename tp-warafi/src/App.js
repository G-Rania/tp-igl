
import './App.css'
import Adminbarre from './Components/Adminview/Adminbarre';
import Modview from './Pages/Modview';
import './index.css'
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
    <Adminbarre/>
    );
}

export default App;



