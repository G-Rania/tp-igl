
import './App.css'
import Adminbarre from './Components/AdminPage/Adminbarre.jsx';
import Modview from './Pages/Modview';
import './index.css'
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Home from './Pages/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/home" element={<Home />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;



