import React from 'react'
import { FaGithub, FaLinkedin, FaSearch, FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { FiBookmark, FiBriefcase, FiClipboard, FiFileText, FiHelpCircle, FiInfo, FiMail, FiPhone, FiPlusSquare, FiUser, FiUsers } from 'react-icons/fi'
import { LuBuilding2 } from 'react-icons/lu'

function Footer() {
  return (
    <div className='bg-[#001B3D] text-white flex-col '>

      <div className=' m-4 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8'>

        {/* first */}
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

        {/* second div  */}
        <div className='flex flex-col gap-5 '>

          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-semibold'>For Students</h1>
            <div className="w-8 h-1 bg-blue-600 rounded-full transition duration-300 hover:scale-200"></div>

          </div>
          <ul className='flex flex-col gap-4'>
            <li className='flex flex-row gap-2 items-center'><FaSearch />Browse Internships</li>
            <li className='flex flex-row gap-2 items-center'><FiFileText />My Applicants</li>
            <li className='flex flex-row gap-2 items-center'><FiBookmark />Saved Internships</li>
            <li className='flex flex-row gap-2 items-center'><FiUser />Student Profile</li>
          </ul>
        </div>

        {/* third div  */}
        <div className='flex flex-col gap-5 '>
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-semibold'>For Companies</h1>
            <div className="w-8 h-1 bg-blue-600 rounded-full transition duration-300 hover:scale-200"></div>
          </div>

          <ul className='flex flex-col gap-4'>
            <li className='flex flex-row gap-2 items-center'><FiPlusSquare />Post Internships</li>
            <li className='flex flex-row gap-2 items-center'><FiUsers />Find Talent</li>
            <li className='flex flex-row gap-2 items-center'><FiClipboard />Manage Applicants</li>
            <li className='flex flex-row gap-2 items-center'><LuBuilding2 />Company Profile</li>
          </ul>
        </div>

        {/* fourth div  */}
        <div className='flex flex-col gap-5 '>
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-semibold'>Company</h1>
            <div className="w-8 h-1 bg-blue-600 rounded-full  transition duration-300 hover:scale-200"></div>

          </div>
          <ul className='flex flex-col gap-4'>
            <li className='flex flex-row gap-2 items-center'><FiInfo />About Us</li>
            <li className='flex flex-row gap-2 items-center'><FiPhone />Contact Us</li>
            <li className='flex flex-row gap-2 items-center'><FiBriefcase />Careers </li>
            <li className='flex flex-row gap-2 items-center'><FiHelpCircle />FAQ </li>
          </ul>
        </div>

        {/* fifth div    */}
        <div className='flex flex-col gap-5 '>
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-semibold'>Connect</h1>
            <div className="w-8 h-1 bg-blue-600 rounded-full transition duration-300 hover:scale-200"></div>

          </div>
          <ul className='flex flex-col gap-4'>
            <li className='flex flex-row gap-2 items-center'><FaGithub />GitHub</li>
            <li className='flex flex-row gap-2 items-center'><FaLinkedin />LinkedIn</li>
            <li className='flex flex-row gap-2 items-center'><FiMail />Email Us</li>
            <li className='flex flex-row gap-2 items-center'><FaInstagram />Instagram</li>
            <li className='flex flex-row gap-2 items-center'><FaTwitter />Twitter</li>

          </ul>
        </div>
      </div>
      {/* bottom  */}
      <hr></hr>
      <div className='flex flex-row justify-center items-center gap-40'>

        <p className='p-6'> © 2026 InternHub. All Rights Reserved.</p>

        <span className='p-6'>
          Privacy Policy | Terms of services | Contact
        </span>
      </div>

    </div>
  )
}

export default Footer
