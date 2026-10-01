import React from 'react'

function InternHubSection() {
    return (
        <div className=' min-h-full'>
            <div className='flex flex-col min-h-full   m-6 p-4 gap-4 items-center'>

                {/* top section  */}
                <div className="flex justify-center items-center text-center gap-3 rounded-full bg-blue-50 px-4 py-2 text-sm w-fit  font-bold text-blue-600">
                    <span className="h-2 w-2 rounded-full bg-blue-600"></span>

                    WHY INTERNHUB?

                    <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                </div>
                <h1 className='font-bold text-3xl md:text-5xl text-center '>Why
                    <span className='text-blue-700'> InternHub?</span>
                </h1>
               <div className='flex gap-1'>
                 <div className="w-15 h-2 bg-blue-600 rounded-full mx-auto mt-3"></div>
                <span className="h-2 m-3 w-2 rounded-full bg-blue-600"></span>
               </div>

                {/* lower section  */}
                <div className='flex flex-wrap md:flex-row content-evenly justify-center gap-15 items-center'>

                    <div className='flex flex-col  shadow-xl/30 p-6 m-4 gap-3 rounded-lg text-center'>
                        <img src="/students.jpg" alt="student" className='shadow-lg w-64 h-64 object-cover rounded-lg' />
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-blue-600 font-bold capitalize text-2xl '>For Students</h1>
                            <div className="w-10 h-1 bg-blue-600 rounded-full mx-auto mt-3 transition duration-300 hover:scale-200"></div>
                        </div>
                        <p className='  text-center text-wrap '>Find suitable internships</p>
                    </div>

                    <div className='flex flex-col shadow-xl/30 p-6 m-4 gap-3 rounded-lg text-center'>
                        <img src="/company.jpg" alt="company" className='shadow-lg w-64 h-64 object-cover rounded-lg' />
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-green-600 font-bold capitalize text-2xl '>For Companies</h1>
                            <div className="w-10 h-1 bg-green-600 rounded-full mx-auto mt-3 transition duration-300 hover:scale-200"></div>
                        </div>
                        <p>Find talented internships</p>
                    </div>

                    <div className='flex flex-col shadow-xl/30 p-6 m-4 gap-3 rounded-lg text-center'>
                        <img src="/career1.jpg" alt="career" className='shadow-lg w-64 h-64 object-cover rounded-lg' />
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-yellow-500 font-bold capitalize text-2xl '> Career Growth</h1>
                            <div className="w-10 h-1 bg-yellow-500 rounded-full mx-auto mt-3 transition duration-300 hover:scale-200"></div>
                        </div>
                        <p>Build skills and experience</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InternHubSection
