'use client'

import { useState, useEffect } from 'react'
// import Header from '@/app/LandingPage/components/header'
import Hero from '@/app/LandingPage/components/hero'
import AppSection from '@/app/LandingPage/components/app-section'
import WhatWeOffer from '@/app/LandingPage/components/what-we-offer'
import ExploreProjects from '@/app/LandingPage/components/explore-projects'
import Testimonials from '@/app/LandingPage/components/testimonials'
import CTA from '@/app/LandingPage/components/cta'
import Footer from '@/app/LandingPage/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* <Header /> */}
      <Hero />
      <AppSection />
      <WhatWeOffer />
      <ExploreProjects />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
