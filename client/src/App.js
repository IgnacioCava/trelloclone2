import './App.css';
import Landing from './pages/Landing/Container/Landing';
import Register from './pages/Landing/AuthForms/Register';
import Login from './pages/Landing/AuthForms/Login';
import Directions from './pages/Landing/Directions/Directions';
import Home from './pages/Home/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthStore from './store/contexts/AuthStore';
import { useEffect } from 'react';

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to={localStorage.token?'/home':'/landing'}/>}/>
        
          <Route path="/landing" element={<AuthStore><Landing/></AuthStore>}>
            <Route index element={<Directions/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
          </Route>
        

        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}