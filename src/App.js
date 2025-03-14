
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Profile } from './pages/Profile';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './component/ProtextedRoute';
import { useDispatch } from 'react-redux';
import { setData } from './reducer/userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Search } from './pages/Search';
function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.user);
  
  useEffect(() => {
    // Check if the token is present in local storage
    const userData = JSON.parse(localStorage.getItem('userdata'));

    axios.defaults.headers.common["Authorization"]=userData?.token;

    // If the token is present, redirect to home page
    if (userData) {
      dispatch(setData(userData))
      console.log(data)
      navigate('/');
    }
    else{
      navigate("/register");
    }
  }, []);
  return(
    <>
    <Routes>
    <Route Component={ProtectedRoute}>
      <Route  exact path='/register' element={<Register/>}/>
      <Route  exact path='/login' element={<Login/>}/>
    </Route>
      <Route  exact path='/' element={<Home/>}/>
      <Route  exact path='/explore' element={<Explore/>}/>
      <Route  exact path='/profile/:id' element={<Profile/>}/>
      <Route  exact path='/search' element={<Search/>}/>
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App;
