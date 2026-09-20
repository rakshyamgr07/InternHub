import React from 'react'
import Hero from './Hero'
import InternHubSection from './InternHubSection'
import Footer from '../components/Footer'
import InternshipCard from './Internships/InternshipCard'

function Home() {
  return (
    <div>
      <Hero/>
      <InternHubSection/>
      <InternshipCard/>
      <Footer/>
    </div>
  )
};

export default Home
