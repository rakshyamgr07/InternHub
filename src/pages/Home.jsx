import React from 'react'
import Hero from './Hero'
import InternHubSection from './InternHubSection'
import InternshipCard from '../components/InternshipCard'
import Footer from '../components/Footer'

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
