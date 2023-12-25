
import './App.css'
import './index.css'
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
     <Routes>
        <Route path='/'  element={<LandingPage/>} >
        </Route>
        
        <Route path='/login' element={<Login/>}>
        </Route>

        <Route  path='/signup' element={<Signup/>} >
        </Route>
      </Routes>
    </BrowserRouter>
    );
}

export default App;