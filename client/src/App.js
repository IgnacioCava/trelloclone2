import { Routes, Route, Navigate } from 'react-router-dom';
import AuthStore from './store/contexts/AuthStore';
import Landing from './pages/Landing/Container/Landing';
import Register from './pages/Landing/AuthForms/Register';
import Login from './pages/Landing/AuthForms/Login';
import Directions from './pages/Landing/Directions/Directions';
import Home from './pages/Home/Home';
import './App.css';

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to={'/'}/>}/>
        
        <Route path="/" element={<AuthStore><Landing/></AuthStore>}>
          <Route index element={<Directions/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
        </Route>

        <Route path="/home" element={<AuthStore><Home/></AuthStore>}/>
      </Routes>
    </div>
  );
}