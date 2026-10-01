import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Internships from './pages/Internships/Internships'
import Companies from './pages/Companies/Companies'
import About from './pages/About'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
       
          <Route path="/" element={<Home />}></Route>
          <Route path="/internships" element={<Internships />}></Route>
          <Route path="/companies" element={<Companies />}></Route>
          <Route path="/about" element={<About />}></Route>
       
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        

      </Routes>
    </div>

  )
}

export default App
