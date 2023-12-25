
import './App.css'
import './index.css'
import {
  BrowserRouter ,
  Routes,
  Route,
  
} from "react-router-dom";
import LandingPage from './Pages/LandingPage';
import SignUpPage from './Pages/Sign-up'
import Login from './Pages/Login'

function App() {
  return (
    <BrowserRouter>
  <   Routes>
        <Route index path='/landingPage'  element={<LandingPage/>} >
        </Route>
        
        <Route path='/login' element={<Login/>}>
        </Route>

        <Route  path='/signup' element={<SignUpPage/>} >
        </Route>
      </Routes>
    </BrowserRouter>
    );
}

export default App;