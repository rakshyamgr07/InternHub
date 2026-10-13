import { useEffect } from 'react'
import { logout } from './utils/userSlice'
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
import InternshipDetails from './pages/Internships/InternshipDetails'
import Applications from './pages/Student/Applications'
import StudentDashboard from './pages/Student/StudentDashboard'
import MyApplications from './pages/Student/MyApplications'
import CompanyDashboard from './pages/Companies/CompanyDashboard'
import AdminDashboard from './pages/Admin/AdminDashboard'
import PostInternships from './pages/Companies/PostInternships'
import ManageInternships from './pages/Companies/ManageInternships'
import EditInternship from './pages/Companies/EditInternships'
import ReviewApplications from './pages/Companies/ReviewApplications'
import ManageUsers from './pages/Admin/ManageUsers'
import ManageCompanies from './pages/Admin/ManageCompanies'
import CreateCompanyProfile from './pages/Companies/CreateCompanyprofile'

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
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/search-internship" element={<SearchInternships />}></Route>
        <Route path="/internship" element={<Internships />}></Route>
        <Route path="/internship/:id" element={<InternshipDetails />}></Route>

        <Route path="/company" element={<Companies />}></Route>
        <Route path="/company/:companyId" element={<CompanyDetails />}></Route>
        <Route path="/about" element={<About />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email/:verificationToken" element={<VerifyUser />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        <Route path="/application/:internshipId" element={<Applications />}></Route>
         
         {/* student */}
         <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />
          <Route
            path="/student/dashboard/application"
            element={<MyApplications />}
          />

          {/* company */}
          <Route
            path="/company/dashboard"
            element={<CompanyDashboard />}
          />

           <Route
            path="/company/dashboard/companies/new"
            element={<CreateCompanyProfile />}
          />

           <Route
            path="/company/dashboard/internships/new"
            element={<PostInternships />}
          />

           <Route
            path="/company/dashboard/internships"
            element={<ManageInternships />}
          />

           <Route
            path="/company/dashboard/internships/edit/:id"
            element={<EditInternship />}
          />

           <Route
            path="/company/dashboard/applications"
            element={<ReviewApplications />}
          />
          {/* admin */}
           <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
           <Route
            path="/admin/dashboard/manage-users"
            element={<ManageUsers />}
          />

           <Route
            path="/admin/dashboard/manage-company"
            element={<ManageCompanies />}
          />

          
      </Routes>
    </div>

  )
}

export default App
