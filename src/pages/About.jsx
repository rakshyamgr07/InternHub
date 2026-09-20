import React from 'react'

function About() {
  return (
    <div className=' min-h-full   '>
      <div className=' min-h-full   p-4 flex flex-col justify-center text-center items-center '>
        <h1 className=" items-center gap-3  px-4 py-2 text-2xl sm:text-3xl lg:text-4xl w-fit  font-bold text-blue-600 mt-30">
          ABOUT INTERNHUB
        </h1>

        <p>Connecting Students With Career Opportunities</p>

        <p>
          InternHUb helps students discover internships, connect with companies, and gain real world experience.
        </p>

        <a href="/internships">
        <button>Explore Internships</button>
        </a>
      </div>
    </div>
  )
}

export default About
