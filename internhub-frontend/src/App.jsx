import  { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Internships from './pages/Internships/Internships'
import Companies from './pages/Companies/Companies'
import About from './pages/About'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import ForgotPassword from './pages/ForgotPassword'
import VerifyUser from './pages/verifyUser'
import ResetPassword from './pages/ResetPassword'
import SearchInternships from './pages/searchInternships'
import CompanyDetails from './pages/Companies/CompanyDetails'

function App() {
   const dispatch = useDispatch()
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    if (!token) return
    const pay = JSON.parse(atob(token.split(".")[1]))
    if (pay.exp * 1000 < Date.now()) {
      dispatch(logout())
    }
  }, [token, dispatch])
  return (
    <div>
      <Navbar/>
      <Routes>
       
          <Route path="/" element={<Home />}></Route>
          <Route path="/search-internship" element={<SearchInternships/>}></Route>
          <Route path="/internship" element={<Internships />}></Route>
          <Route path="/company" element={<Companies />}></Route>
          <Route path="/company/:companyId" element={<CompanyDetails />}></Route>
          <Route path="/about" element={<About />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
         <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email/:verificationToken" element={<VerifyUser />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />


      </Routes>
    </div>

  )
}

export default App
