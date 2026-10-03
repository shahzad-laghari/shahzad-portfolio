import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ScrollProgress from './components/ui/ScrollProgress'
import BackToTop from './components/ui/BackToTop'
import CursorGlow from './components/ui/CursorGlow'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <div className="bg-bg text-white/90 font-body min-h-screen selection:bg-accent/30 overflow-x-hidden">
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <main>
            <Hero />
            <About />
            <TechStack />
            <Portfolio />
            <Experience />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  )
}
