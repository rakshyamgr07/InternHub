import { FiBriefcase, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin, FaSearch, FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
         <div className='flex flex-col justify-evenly gap-5 '>

          <div className='flex flex-row gap-3 '>
            <img src="/logo1.png" alt="" className='w-12 h-12 rounded-full object-cover' />
            <h1 className='text-2xl sm:text-3 lg:text-4xl mt-1 font-bold'>InternHub</h1>
          </div>

          <p className='text-wrap text-xl'>Find Internships, build your skills, and
            start your career with confidence.</p>

          <div className='flex flex-row gap-5 text-xl'>
            <a href=""><FaGithub /></a>
            <a href=""><FaLinkedin /></a>
            <a href=""><FiMail /></a>
          </div>
        </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/internship"
                  className="hover:text-blue-400 transition"
                >
                  Find Internships
                </Link>
              </li>
              <li>
                <Link
                  to="/company"
                  className="hover:text-blue-400 transition"
                >
                  Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              For Users
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/register"
                  className="hover:text-blue-400 transition"
                >
                  Create an Account
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-400 transition"
                >
                  Login
                </Link>
              </li>
             
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} InternHub Nepal.
            All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;