import React from 'react'
import { FaArrowRight } from 'react-icons/fa6';
import { FiSearch } from "react-icons/fi";
function Hero() {
    return (
        <div className='flex min-h-screen'>
            <div className='flex flex-col-reverse md:flex-row mt-20 m-6 p-4 shadow-xl/10 rounded-lg  '>
                {/* left side  */}
                <div className='flex flex-col gap-6 m-2 basis-1/2 p-8 tracking-tight mr-4'>
                    <h1 className='uppercase text-3xl mt-3 font-bold text-wrap md:text-8xl flex flex-col gap-6'>find your
                        <span className='text-blue-700 md:text-7xl gap-3'>dream internship</span>
                    </h1>
                    <span className='text-wrap text-gray-800 font-serif text-xl md:text-2xl'>Discover internships, connect with companies and start
                        your career.</span>
                    <div className="flex items-center border border-gray-300 shadow-md rounded-lg px-2">
                        <FiSearch className="text-gray-500" />

                        <input
                            type="text"
                            placeholder="Search internships"
                            className="p-2 outline-none"
                        />
                    </div>

                    <div className='flex gap-4'>
                        <select name="location" id="" className='border border-gray-300 shadow-md rounded-lg basis-2/3 p-3'>
                            <option value="location">Kathmandu</option>
                            <option value="location">Lalitpur</option>
                            <option value="location">Bhaktapur</option>
                            <option value="location">Kritipur</option>
                            <option value="location">Butwal</option>
                            <option value="location">Gulmi</option>

                        </select>

                        <button type="submit" className='bg-blue-600 rounded-lg p-2 basis-1/3  transition duration-300  hover:cursor-pointer hover:bg-blue-800 text-white'>Search</button>
                    </div>
                    <button className='flex flex-row justify-center gap-2 bg-blue-600 rounded-lg p-2 transition duration-300  hover:cursor-pointer hover:bg-blue-800 text-white p-2'> Explore Internships
                        <span className='m-1'><FaArrowRight/></span>
                    </button>
                </div>

                {/* right side  */}
                <div className='basis-1/2 '>
                    <img src="/hero.png" alt="hero" className='w-full min-h-full object-fit  md:min-h-px rounded-sm object-cover' />
                </div>

            </div>
        </div>
    )
}

export default Hero
