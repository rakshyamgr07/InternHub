import React, { useState } from 'react'
import { navLinks } from '../constants/navLinks'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { logout } from '../utils/userSlice';
function Navbar() {
  const { token, role, name } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfile = () => {
    setOpen(false)
    if (!token) {
      navigate("/login")
      return;
    }
    if (role === "student") {
      navigate("/student/dashboard")
    } else if (role === "company") {
      navigate("/company/dashboard")
    } else if (role === "admin") {
      navigate("/admin/dashboard")
    }
  };

  const handleLogout = () => {
    dispatch(logout())
    setOpen(false)
    navigate("/login")
  };
  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  const handleNavClick = () => {
    ScrollTop()
    setOpen(false)
  };
  return (
    <nav className='bg-blue-800 text-white fixed w-full font-bold '>
      <div className='flex justify-between items-center'>
        {/* left  */}
        <NavLink to="/" className="ml-2 p-2 flex flex-col ">
          <img src="/logo.png" alt="logo" className='h-12 w-30 ' />

          <p className='ml-1  text-sm font-semibold font-serif tracking-wider'>Intern Today. Lead Tomorrow.</p>

        </NavLink>

        {/* desktop  */}
        <div className="hidden md:flex items-center gap-6 mr-8">
          <ul className="flex gap-5">
            {navLinks.map((link) => (<li key={link.path}>
              <Link to={link.path} onClick={ScrollTop}>
                {link.name}
              </Link>
            </li>
            ))}
          </ul>

          {/* authentication  */}
          {!token ? (
            <div className="flex items-center gap-3">
              <Link to="/login" className="rounded-lg border border-white px-4 py-2 hover:bg-white hover:text-blue-800" >
                Login
              </Link>
              <Link to="/register" className="rounded-lg bg-white text-blue-800 px-4 py-2 hover:bg-blue-100" >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={handleProfile}
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-blue-700" >
                <FiUser />
                {name || "Profile"}
              </button>
              <button onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-blue-700" >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)}
          className="p-2 font-bold text-xl mr-5 md:hidden" aria-label={open ? "Close menu" : "Open menu"} >
          {open ? <HiOutlineX /> : <HiOutlineMenu />} </button>
      </div>


      {/* Mobile  */}
      {open && (
        <ul className="flex flex-col md:hidden gap-5 p-4 border-t border-blue-600">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path}
                onClick={handleNavClick}>
                {link.name} </Link>
            </li>
          ))}
          {!token ? (
            <>
              <li>
                <Link to="/login"
                  onClick={handleNavClick}>
                  Login </Link>
              </li>
              <li>
                <Link to="/register"
                  onClick={handleNavClick}>
                  Sign Up </Link>
              </li>
            </>
          ) : (
            <> <li>
              <button onClick={handleProfile}
                className="flex items-center gap-2" >
                <FiUser /> {name || "Profile"}
              </button>
            </li>
              <li>
                <button onClick={handleLogout}
                  className="flex items-center gap-2" > <FiLogOut />
                  Logout </button>
              </li>
            </>
          )}
        </ul>
      )}

    </nav>
  )
}

export default Navbar