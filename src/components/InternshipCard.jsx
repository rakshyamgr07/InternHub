import React from 'react'
import { FaArrowRight, FaCalendar, FaClock, FaLocationDot, FaRadio, FaReact } from 'react-icons/fa6'
import { SiJavascript } from 'react-icons/si'

function InternshipCard() {
  return (
    <div className=' min-h-full  m-6 p-4 flex flex-col items-center'>
      <div className="flex justify-center items-center text-center gap-3 rounded-full bg-blue-50 px-4 py-2 text-sm w-fit  font-bold text-blue-600">
        <span className="h-2 w-2 rounded-full bg-blue-600"></span>

       SOME INTERNSHIPS

        <span className="h-2 w-2 rounded-full bg-blue-600"></span>
      </div>


      <div className='flex flex-col md:flex-row'>
        <div className='flex flex-col gap-5 min-h-full shadow-xl/20 rounded-lg p-6 m-4 w-fit'>

        <div className='flex gap-4'>
          <img src="/logo1.png" alt="" className='w-8 h-8 rounded-full object-cover' />
          <h1 className='font-bold text-xl text-blue-700 '>ABC Company</h1>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-xl font-semibold'>Frontend Developer Intern</h1>

          <h3 className='flex gap-2  '>
            <span className='text-blue-700 m-1'> <FaLocationDot /></span>
            Kathmandu
          </h3>

          <h3 className='flex gap-2 '>
            <span className='text-blue-700 m-1'> <FaRadio /></span>
            Rs. 10,000/month
          </h3>

          <h3 className='flex gap-2 ' >
            <span className='text-blue-700 m-1'><FaClock /></span>
            3 Months
          </h3>

          <div className='flex gap-3 '>
            <div className='flex  gap-2 shadow-xl/10 rounded-sm p-1 m-1'>
              <span className='text-blue-400 m-1'><FaReact /></span>
              React
            </div>
            <div className='flex  gap-2 shadow-xl/10 rounded-sm p-1 m-1'>
              <span className=' text-yellow-500 m-1'><SiJavascript /></span>
              JavaScript
            </div>
          </div>

          <div className='flex justify-between gap-3'>
            <span className=' text-blue-500 m-1'><FaCalendar /></span>
            <h3 className='flex gap-1'>Deadline:
              <span className=' text-blue-700 font-semibold' >Sep 20</span>
            </h3>


            <button type="submit" className='bg-blue-500 gap-1 rounded-sm flex p-1 text-white transition duration-300 hover:scale-105 hover:bg-blue-800 hover:cursor-pointer'>View Details
              <span className='text-white m-2 text-sm'><FaArrowRight /></span>
            </button>
          </div>
          <div>

          </div>
        </div>

      </div>
      </div>
    </div>
  )
}

export default InternshipCard
