import React from 'react'
import Hero from './Hero'
import InternHubSection from './InternHubSection'
import Footer from '../components/Footer'
import About from './About'
import InternshipCard from '../components/InternshipCard'

function Home() {
  return (
    <div>
      <Hero/>
      <About/>
      <InternHubSection/>
      <InternshipCard/>
      <Footer/>
    </div>
  )
};

export default Home
