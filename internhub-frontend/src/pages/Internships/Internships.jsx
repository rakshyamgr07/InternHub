import React from 'react'
import InternshipCard from '../../components/InternshipCard'
import { FiSearch } from 'react-icons/fi'

function Internships() {
  return (
    <div className="flex flex-col gap-2 p-6">

      {/* Top section */}
      <div className="mt-25 flex flex-col gap-15 w-full text-center">

        {/* Heading */}
        <div className="flex flex-col gap-2">

          <h1 className="uppercase font-bold text-5xl sm:text-6xl md:text-7xl text-blue-700">
            Find Internships
          </h1>

          <p className="text-lg font-semibold">
            Discover opportunities that match your skills and career goals.
          </p>

        </div>


        {/* Search */}
        <div className="flex gap-2 items-center justify-center">

          <div className="flex items-center border border-gray-300 shadow-md rounded-lg px-2">

            <FiSearch className="text-gray-500" />

            <input type="text" placeholder="Search internships" className="p-2 outline-none" />

          </div>

          <button type="submit" className="bg-blue-600 rounded-lg p-2 transition duration-300 hover:bg-blue-800 text-white" > Search</button>
           </div>

      </div>

      {/* Internship cards */}
      <InternshipCard />

    </div>
  )
}

export default Internships