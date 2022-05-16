import { Routes, Route, Navigate } from 'react-router-dom';
import AuthStore from './store/contexts/AuthStore';
import BoardStore from './store/contexts/BoardStore';
import Landing from './pages/Landing/Container/Landing';
import Register from './pages/Landing/AuthForms/Register';
import Login from './pages/Landing/AuthForms/Login';
import Directions from './pages/Landing/Directions/Directions';
import Home from './pages/Home/HomeContainer/Home';
import Navbar from './components/navbar/Navbar';
import Board from './pages/Board/Board/BoardContainer/Board';
import './App.css';


export default function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="*" element={<Navigate to={localStorage.token?'/home':'/'}/>}/>
        
        <Route path="/" element={<AuthStore><Landing/></AuthStore>}>
          <Route index element={<Directions/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
        </Route>

        <Route path="/home" element={
          <>
            <AuthStore>
              <Navbar/>
            </AuthStore>
            <BoardStore>
              <Home/>
            </BoardStore>
          </>
          }
        />

        <Route path="/board/:id" element={
          <>
            <AuthStore>
              <Navbar/>
            </AuthStore>
            <BoardStore>
              <Board/>
            </BoardStore>
          </>
          }
        />
      </Routes>
    </div>
  );
}