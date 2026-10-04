import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, MapPin, ChevronDown, FileText } from 'lucide-react'
import ResumeModal from './ResumeModal'
import Magnetic from './ui/Magnetic'
import Counter from './ui/Counter'
import { projects } from '../data/projects'
import { certificates } from '../data/certificates'

const roles = ['Spring Boot REST APIs', 'React.js Frontends', 'Angular Apps', 'Full-Stack Systems']

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const socialLinks = [
  {
    href: 'https://github.com/shahzad-laghari',
    label: 'GitHub',
    icon: Github,
    color: 'hover:text-white hover:border-white/40',
  },
  {
    href: 'https://www.linkedin.com/in/shahzad-ali-655bb7308/',
    label: 'LinkedIn',
    icon: Linkedin,
    color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/50',
  },
  {
    href: 'mailto:shahzadali.official6@gmail.com',
    label: 'Email',
    icon: Mail,
    color: 'hover:text-accent hover:border-accent/50',
    isEmail: true,
  },
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [resumeOpen, setResumeOpen] = useState(false)
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) return
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800)
    return () => clearInterval(t)
  }, [reduceMotion])

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-start lg:justify-center pt-24 sm:pt-32 lg:pt-28 pb-16 lg:pb-24"
        aria-label="Hero section"
      >
        {/* ── Ambient background ────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0" style={{ overflow: 'clip' }} aria-hidden="true">
          <div className="absolute inset-0 bg-grid" />
          <div
            className="aurora-blob -top-32 -left-24 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px]"
            style={{ background: 'radial-gradient(circle, #4FD1C5 0%, transparent 70%)' }}
          />
          <div
            className="aurora-blob top-1/3 -right-32 w-[300px] sm:w-[460px] h-[300px] sm:h-[460px]"
            style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)', animationDelay: '-8s', opacity: 0.2 }}
          />
          <div
            className="aurora-blob -bottom-40 left-1/3 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px]"
            style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', animationDelay: '-14s', opacity: 0.16 }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(79,209,197,0.4), transparent)' }}
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-8 w-full">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 xl:gap-20 items-center">

            {/* ── Left: Text content ──────────────────────────── */}
            <div className="text-center lg:text-left">

              {/* Signature status line — styled like an HTTP response header */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="inline-flex flex-wrap items-center gap-x-2 sm:gap-x-2.5 gap-y-1 font-mono text-[0.68rem] sm:text-[0.72rem] text-white/40 mb-5 sm:mb-7 justify-center lg:justify-start"
              >
                <span className="text-accent font-medium">HTTP/1.1 200 OK</span>
                <span className="text-white/15">·</span>
                <span>role=fullstack-developer</span>
                <span className="text-white/15">·</span>
                <span className="text-accent2">availability=open</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="font-display font-bold text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.1] text-white mb-3"
              >
                Hi, I&apos;m{' '}
                <span className="text-gradient">Shahzad Ali</span>
              </motion.h1>

              {/* Animated role */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="font-display text-[clamp(1.15rem,2.5vw,1.75rem)] text-white/40 mb-5 min-h-[1.4em] flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1"
              >
                <span>I build</span>
                <div className="relative overflow-hidden inline-flex">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-accent font-semibold"
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="text-white/55 text-[1rem] leading-relaxed max-w-[50ch] mx-auto lg:mx-0 mb-8"
              >
                Java Full-Stack Developer building robust REST APIs with{' '}
                <span className="text-accent font-medium">Spring Boot</span>,
                dynamic frontends with{' '}
                <span className="text-accent font-medium">React.js &amp; Angular</span>,
                and secure data layers with{' '}
                <span className="text-accent font-medium">MySQL &amp; PostgreSQL</span>.
                Based in{' '}
                <span className="text-white/70 font-medium inline-flex items-center gap-1">
                  <MapPin size={13} className="inline text-accent/70" />
                  Pakistan
                </span>
                .
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={4}
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-7"
              >
                <Magnetic>
                  <a
                    href="#about"
                    className="px-6 py-3 rounded-xl font-semibold text-sm bg-accent text-bg hover:brightness-110 transition-all duration-200 shadow-glow-accent btn-shimmer inline-flex items-center gap-2"
                  >
                    About Me
                    <ChevronDown size={15} className="-rotate-90" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <button
                    onClick={() => setResumeOpen(true)}
                    aria-label="View Resume in modal"
                    className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/15 bg-elevated text-white hover:border-accent/60 hover:bg-white/[0.04] transition-all duration-200 inline-flex items-center gap-2 btn-shimmer cursor-pointer"
                  >
                    <FileText size={15} className="text-accent" />
                    View Resume
                  </button>
                </Magnetic>
              </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={5}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {socialLinks.map(({ href, label, icon: Icon, color, isEmail }) => (
                <a
                  key={label}
                  href={href}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  title={label}
                  className={`w-10 h-10 rounded-xl border border-white/10 bg-elevated flex items-center justify-center text-white/45 transition-all duration-200 hover:-translate-y-0.5 ${color}`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={6}
              className="mt-8 sm:mt-9 pt-6 sm:pt-7 border-t border-white/[0.07] grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0"
            >
              {[
                { n: projects.length, s: '', label: 'Projects Built' },
                { n: certificates.length, s: '', label: 'Certifications' },
                { n: 1, s: '+', label: 'Year Experience' },
              ].map(({ n, s: suf, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-gradient">
                    <Counter to={n} suffix={suf} />
                  </div>
                  <div className="font-mono text-[0.6rem] sm:text-[0.62rem] uppercase tracking-wider text-white/35 mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile card ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center gap-6 mt-4 lg:mt-0"
          >
            {/* Profile image with animated ring */}
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-[-10px] rounded-full opacity-40"
                style={{
                  background: 'conic-gradient(from 0deg, #4FD1C5, #7EEDE1, #F5A623, #7EEDE1, #4FD1C5)',
                }}
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              />
              {/* Blurred ring mask */}
              <div className="absolute inset-[-10px] rounded-full bg-bg" style={{ mask: 'radial-gradient(transparent 48%, black 52%)' }} aria-hidden="true" />

              {/* Orbiting tech chips */}
              <div className="hidden md:block absolute inset-[-42px] lg:inset-[-46px] animate-orbit pointer-events-none" aria-hidden="true">
                {[
                  { t: 'Java', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', c: 'text-[#EA2D2E]' },
                  { t: 'React', pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2', c: 'text-[#61DAFB]' },
                  { t: 'MySQL', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', c: 'text-[#4aa3d8]' },
                  { t: 'Angular', pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2', c: 'text-[#DD0031]' },
                ].map(({ t, pos, c }) => (
                  <div key={t} className={`absolute ${pos}`}>
                    <div
                      className={`glass-strong px-2.5 py-1 rounded-lg font-mono text-[0.65rem] font-medium ${c} animate-orbit`}
                      style={{ animationDirection: 'reverse' }}
                    >
                      {t}
                    </div>
                  </div>
                ))}
              </div>

              {/* Image container */}
              <div
                className="relative w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] rounded-full p-[3px]"
                style={{
                  background: 'linear-gradient(145deg, rgba(79,209,197,0.5), rgba(245,166,35,0.3))',
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-elevated2 border-2 border-bg">
                  <img
                    src="/profile.png"
                    alt="Shahzad Ali — Java Backend Developer"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Status badge */}
              <motion.div
                animate={reduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-strong px-4 py-1.5 rounded-full flex items-center gap-2 shadow-card whitespace-nowrap border border-accent2/20"
              >
                <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse2 flex-shrink-0" aria-hidden="true" />
                <span className="font-mono text-[0.7rem] text-accent2">Available for hire</span>
              </motion.div>
            </div>

            {/* Signature card — a real HTTP HEAD response, not a fake code window */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="glass rounded-2xl px-5 py-4 font-mono text-[0.72rem] leading-relaxed shadow-card w-full max-w-[280px] border border-white/[0.07]"
            >
              <div className="text-white/30 mb-2.5">
                <span className="text-accent2">$</span> curl -I shahzad-ali.dev
              </div>
              <div className="border-t border-white/[0.06] pt-2.5 space-y-1">
                <div className="text-accent font-medium">HTTP/1.1 200 OK</div>
                <div>
                  <span className="text-white/35">role: </span>
                  <span className="text-white/70">Full-Stack Developer</span>
                </div>
                <div>
                  <span className="text-white/35">stack: </span>
                  <span className="text-white/70">Java · Spring · React · Angular</span>
                </div>
                <div>
                  <span className="text-white/35">db: </span>
                  <span className="text-white/70">MySQL · PostgreSQL · MongoDB</span>
                </div>
                <div>
                  <span className="text-white/35">availability: </span>
                  <span className="text-accent2">open</span>
                  <span className="inline-block w-[6px] h-[12px] bg-accent2 ml-1 animate-blink align-middle rounded-[1px]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          aria-hidden="true"
        >
          <motion.div
            animate={reduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/20"
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>

    <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
  </>
  )
}
