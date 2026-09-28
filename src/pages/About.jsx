import React from 'react'
import InternshipCard from './Internships/InternshipCard'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'

function About() {
  return (
    <div className=' min-h-full   '>
      <div className=' min-h-full   p-4 flex flex-col gap-8 justify-center text-center items-center '>
        <h1 className=" items-center gap-3  px-4 py-2 text-3xl sm:text-4xl lg:text-5xl w-fit  font-bold text-blue-600 mt-30">
          ABOUT INTERNHUB
          <div className="w-15 h-2 bg-blue-600 rounded-full mx-auto mt-3"></div>
        </h1>

        <p className='text-xl sm:text-2xl lg:text-3xl'>Connecting Students With Career Opportunities</p>

        <p className='text-lg sm:text-xl lg:text-2xl'>
          InternHUb helps students discover internships, connect with companies, and gain real world experience.
        </p>

        <Link to="/internships">
          <button className='flex flex-row justify-center gap-2 bg-blue-600 rounded-lg p-2 transition duration-300  hover:cursor-pointer hover:bg-blue-800 text-white p-2'>Explore Internships
            <span className='m-1'><FaArrowRight /></span>

          </button>
        </Link>
      </div>
    </div>
  )
}

export default About
