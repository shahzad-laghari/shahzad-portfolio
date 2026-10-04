import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#tech', label: 'Skills' },
  { href: '#portfolio', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15)
      const sections = links.map((l) => document.getElementById(l.href.slice(1)))
      let current = 'home'
      sections.forEach((sec) => {
        if (sec && window.scrollY >= sec.offsetTop - 180) current = sec.id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header role="banner" className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <nav
        aria-label="Primary navigation"
        className="pointer-events-auto max-w-[1200px] mx-auto px-3 sm:px-8 pt-2.5 sm:pt-5 transition-all duration-500"
      >
        <div
          className={`mx-auto rounded-2xl transition-all duration-500 flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 ${
            scrolled
              ? 'bg-elevated/80 backdrop-blur-2xl border border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.6)]'
              : 'bg-elevated/40 backdrop-blur-md border border-white/[0.08]'
          }`}
        >
          {/* Logo Badge */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 font-display font-bold text-base sm:text-lg"
            aria-label="Shahzad Ali - Home"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-9 h-9 rounded-xl overflow-hidden border border-accent/30 group-hover:border-accent transition-all duration-300 shadow-glow-sm">
                <img
                  src="/profile.png"
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 15%' }}
                  aria-hidden="true"
                />
              </span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent2 animate-pulse2 ring-2 ring-bg" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-white group-hover:text-accent transition-colors duration-200 leading-tight">
                Shahzad Ali
              </span>
              <span className="font-mono text-[0.65rem] text-white/35 font-normal tracking-wider">
                Java Full-Stack Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-elevated2/60 border border-white/[0.06]" role="list">
            {links.map((l) => {
              const isActive = active === l.href.slice(1)
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 block ${
                      isActive
                        ? 'text-white'
                        : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="awwwardsPill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/25 to-accent2/20 border border-accent/40 shadow-glow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {l.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 border border-white/15 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 bg-elevated2/80 transition-all flex-shrink-0"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={open ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden mt-2 rounded-2xl border border-white/15 bg-elevated/95 backdrop-blur-2xl shadow-2xl"
            >
              <div className="p-4 flex flex-col gap-1">
                {links.map((l) => {
                  const isActive = active === l.href.slice(1)
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                        isActive
                          ? 'text-white bg-accent/15 border border-accent/30'
                          : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{l.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
