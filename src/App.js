import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register'; 
import Dashbord from './components/Dashbord';

import axios from 'axios';
import Transporterdashbord from './components/Transporterdashbord';

axios.defaults.baseURL = "https://goclock-internship.onrender.com";//setting default url
axios.defaults.withCredentials=true;//seting with credentials for sending cookie from backend to frontend


function App() {
  return (
    <div className="App">
   
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/transporterdashbord" element={<Transporterdashbord/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='/dashbord' element={<Dashbord/>}/>
    </Routes>
    </div>
  );
}

export default App;
