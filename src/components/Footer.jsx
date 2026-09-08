import React from 'react'
import { FaGithub, FaLinkedin, FaSearch, FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { FiBookmark, FiBriefcase, FiClipboard, FiFileText, FiHelpCircle, FiInfo, FiMail, FiPhone, FiPlusSquare, FiUser, FiUsers } from 'react-icons/fi'
import { LuBuilding2 } from 'react-icons/lu'

function Footer() {
  return (
    <div>

      {/* first */}
      <div>

        <div>
          <img src="/logo1.png" alt="" className='w-12 h-12 rounded-full object-cover' />
          <h1>InternHub</h1>
        </div>

        <p>Find Internships, build your skills, and start your career with confidence.</p>

        <div>
          <a href=""><FaGithub /></a>
          <a href=""><FaLinkedin /></a>
          <a href=""><FiMail /></a>
        </div>
      </div>

      {/* second div  */}
      <div>
        <h1>For Students</h1>
        <ul>
          <li><FaSearch />Browse Internships</li>
          <li><FiFileText />My Applicants</li>
          <li><FiBookmark />Saved Internships</li>
          <li><FiUser />Student Profile</li>
        </ul>
      </div>

      {/* third div  */}
      <div>
        <h1>For Companies</h1>
        <ul>
          <li><FiPlusSquare />Post Internships</li>
          <li><FiUsers />Find Talent</li>
          <li><FiClipboard />Manage Applicants</li>
          <li><LuBuilding2 />Company Profile</li>
        </ul>
      </div>

      {/* fourth div  */}
      <div>
        <h1>Company</h1>
        <ul>
          <li><FiInfo />About Us</li>
          <li><FiPhone />Contact Us</li>
          <li><FiBriefcase />Careers </li>
          <li><FiHelpCircle />FAQ </li>
        </ul>
      </div>

      {/* fifth div    */}
      <div>
        <h1>Connect</h1>
        <ul>
          <li><FaGithub />GitHub</li>
          <li><FaLinkedin />LinkedIn</li>
          <li><FiMail />Email Us</li>
          <li><FaInstagram />Instagram</li>
          <li><FaTwitter />Twitter</li>

        </ul>
      </div>

      <div>

        <p>2026 InternHUb. All Rights Reserved.</p>

        <span>
          Privacy Policy | Terms of services | Contact
        </span>
      </div>

    </div>
  )
}

export default Footer
