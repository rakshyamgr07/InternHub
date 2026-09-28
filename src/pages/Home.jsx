import React from 'react'
import Hero from './Hero'
import InternHubSection from './InternHubSection'
import Footer from '../components/Footer'
import InternshipCard from './Internships/InternshipCard'
import About from './About'

function Home() {
  return (
    <div>
      <Hero/>
      <InternHubSection/>
      <About/>
      <InternshipCard/>
      <Footer/>
    </div>
  )
};

export default Home
