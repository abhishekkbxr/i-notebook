import React , { useState }from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './component /Navbar'
import Home from './component /Home';
import About from './component /About';
import NoteState from './context/notes/NoteState';
import Alert from './component /Alert';
import Login from './component /Login';
import Signup from './component /Signup';

function App() {
  
  const[alert , setAlert] =useState(null)
  
  const showAlert =(message , type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null)
      }, 3000);
  
    }
  return (
    <>

      <NoteState>
        <Router>
          <Navbar />
          <Alert Alert = {alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>


    </>
  )
}

export default App

