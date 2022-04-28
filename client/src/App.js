import './App.css';
import Landing from './pages/Landing/Container/Landing';
import Register from './pages/Landing/AuthForms/Register';
import Login from './pages/Landing/AuthForms/Login';
import Directions from './pages/Landing/Directions/Directions';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to='/landing'/>}/>

        <Route path="/landing" element={<Landing/>}>
          <Route index element={<Directions/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
        </Route>
        
      </Routes>
    </div>
  );
}