import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Config ─────────────────────────────────────────────── */
const TOTAL_MS = 2200
const SEGMENTS = 12

/* ─── Letter stagger variants ───────────────────────────── */
const letterContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } },
}
const letterVariant = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ─── Dot grid ──────────────────────────────────────────── */
function DotGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.055] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="loader-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#4FD1C5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#loader-dots)" />
    </svg>
  )
}

/* ─── Segmented bar ─────────────────────────────────────── */
function SegmentedBar({ progress }) {
  const filled = Math.round((progress / 100) * SEGMENTS)
  return (
    <div className="flex items-end gap-[4px]" aria-hidden="true">
      {Array.from({ length: SEGMENTS }).map((_, i) => {
        const active = i < filled
        const isNext = i === filled
        const h = active ? 20 : isNext ? 10 : 8
        return (
          <motion.div
            key={i}
            animate={{ height: h, opacity: active ? 1 : isNext ? 0.3 : 0.1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="rounded-[2px] flex-shrink-0"
            style={{
              width: 16,
              background: active
                ? 'linear-gradient(180deg,#7EEDE1 0%,#4FD1C5 60%,#38B2AC 100%)'
                : 'rgba(79,209,197,0.15)',
              boxShadow: active ? '0 0 7px rgba(79,209,197,0.55)' : 'none',
            }}
          />
        )
      })}
    </div>
  )
}

/* ─── Thin progress line ─────────────────────────────────── */
function ProgressLine({ progress }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg,#38B2AC 0%,#4FD1C5 45%,#7EEDE1 75%,#60A5FA 100%)',
          boxShadow: '0 0 12px rgba(79,209,197,0.8)',
        }}
        transition={{ ease: 'linear', duration: 0.12 }}
      />
    </div>
  )
}

/* ─── Corner bracket ────────────────────────────────────── */
function Corner({ pos }) {
  const styles = {
    tl: { top: -16, left: 0,  transform: 'rotate(0deg)' },
    tr: { top: -16, right: 0, transform: 'rotate(90deg)' },
    br: { bottom: -16, right: 0, transform: 'rotate(180deg)' },
    bl: { bottom: -16, left: 0,  transform: 'rotate(270deg)' },
  }
  return (
    <div className="absolute w-5 h-5 pointer-events-none" style={styles[pos]}>
      <div className="absolute top-0 left-0 w-full" style={{ height: 1, background: 'rgba(79,209,197,0.45)' }} />
      <div className="absolute top-0 left-0 h-full" style={{ width: 1, background: 'rgba(79,209,197,0.45)' }} />
    </div>
  )
}

/* ─── Blinking cursor ───────────────────────────────────── */
function Cursor() {
  return (
    <span
      className="inline-block w-[2px] h-[0.9em] bg-accent align-middle ml-[3px] animate-blink"
      aria-hidden="true"
    />
  )
}

/* ─── Status steps ──────────────────────────────────────── */
const STATUS_STEPS = [
  [0,   'Initializing…'],
  [20,  'Loading assets…'],
  [45,  'Building components…'],
  [72,  'Optimizing…'],
  [92,  'Ready to launch…'],
  [100, 'Done!'],
]

const NAME_CHARS  = 'Shahzad Ali'.split('')
const TITLE_WORDS = ['Java', 'Full-Stack', 'Developer']

/* ─── Main LoadingScreen ─────────────────────────────────── */
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone]         = useState(false)
  const [status, setStatus]     = useState('Initializing…')
  const timerRef                = useRef(null)

  useEffect(() => {
    const steps    = 80
    const interval = TOTAL_MS / steps
    let current    = 0

    timerRef.current = setInterval(() => {
      current = Math.min(current + 100 / steps, 100)
      setProgress(current)

      const match = [...STATUS_STEPS].reverse().find(([t]) => current >= t)
      if (match) setStatus(match[1])

      if (current >= 100) {
        clearInterval(timerRef.current)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 380)
        }, 250)
      }
    }, interval)

    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <style>{`
        @keyframes _orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-18px,28px) scale(1.07)} 66%{transform:translate(16px,-12px) scale(0.95)} }
        @keyframes _scan { 0%{transform:translateY(-100%);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(600%);opacity:0} }
      `}</style>

      <AnimatePresence>
        {!done && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: '#09090f' }}
            role="status"
            aria-label="Loading portfolio"
          >
            {/* dot grid */}
            <DotGrid />

            {/* center glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(79,209,197,0.065) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* floating orbs */}
            {[
              { w:400, h:400, top:'-8%',  left:'-4%',  bottom:'auto', right:'auto', c:'rgba(79,209,197,0.22)',  d:'0s'  },
              { w:320, h:320, top:'auto', left:'auto',  bottom:'-7%',  right:'-3%', c:'rgba(96,165,250,0.18)',  d:'-4s' },
              { w:240, h:240, top:'55%',  left:'60%',  bottom:'auto', right:'auto', c:'rgba(245,166,35,0.12)', d:'-7s' },
            ].map((o, i) => (
              <div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: o.w, height: o.h,
                  top: o.top, left: o.left, bottom: o.bottom, right: o.right,
                  background: `radial-gradient(circle, ${o.c} 0%, transparent 65%)`,
                  filter: 'blur(72px)',
                  animation: `_orb 10s ease-in-out ${o.d} infinite`,
                }}
                aria-hidden="true"
              />
            ))}

            {/* scanline */}
            <div
              className="absolute inset-x-0 pointer-events-none"
              style={{
                height: 100,
                top: 0,
                background: 'linear-gradient(180deg,transparent 0%,rgba(79,209,197,0.025) 50%,transparent 100%)',
                animation: '_scan 3.5s ease-in-out infinite',
              }}
              aria-hidden="true"
            />

            {/* vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 38%, rgba(9,9,15,0.82) 100%)' }}
              aria-hidden="true"
            />

            {/* ── Content card ─────────────────────────── */}
            <div className="relative flex flex-col items-center w-full max-w-[460px] px-4 sm:px-6">
              <Corner pos="tl" />
              <Corner pos="tr" />
              <Corner pos="br" />
              <Corner pos="bl" />

              {/* Terminal chip */}
              <motion.div
                initial={{ opacity: 0, y: -14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2.5 mb-10"
              >
                {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.75 }} />
                ))}
                <span
                  className="font-mono ml-1"
                  style={{
                    fontSize: '0.67rem',
                    padding: '3px 12px',
                    borderRadius: 999,
                    border: '1px solid rgba(79,209,197,0.2)',
                    background: 'rgba(79,209,197,0.06)',
                    color: 'rgba(79,209,197,0.8)',
                    letterSpacing: '0.08em',
                  }}
                >
                  shahzad-ali.dev
                </span>
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'#28C840' }}
                />
                <span className="font-mono" style={{ fontSize:'0.6rem', color:'#28C840', letterSpacing:'0.1em' }}>LIVE</span>
              </motion.div>

              {/* Name — letter by letter */}
              <motion.div
                variants={letterContainer}
                initial="hidden"
                animate="show"
                className="flex items-baseline justify-center flex-wrap"
                aria-label="Shahzad Ali"
              >
                {NAME_CHARS.map((ch, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariant}
                    style={{
                      display: 'inline-block',
                      fontSize: 'clamp(2.3rem,6vw,3.7rem)',
                      fontFamily: '"IBM Plex Serif",serif',
                      fontWeight: 700,
                      lineHeight: 1.05,
                      letterSpacing: '-0.01em',
                      width: ch === ' ' ? '0.35em' : 'auto',
                      background: i < 7
                        ? 'linear-gradient(160deg,#fff 30%,rgba(255,255,255,0.7) 100%)'
                        : 'linear-gradient(135deg,#4FD1C5 0%,#7EEDE1 50%,#60A5FA 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </motion.span>
                ))}
              </motion.div>

              {/* Title */}
              <div className="flex items-center justify-center gap-2 mt-3 flex-wrap" aria-label="Java Full-Stack Developer">
                {TITLE_WORDS.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.85 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="font-mono uppercase"
                    style={{ fontSize:'clamp(0.67rem,1.5vw,0.84rem)', letterSpacing:'0.18em', color:'rgba(255,255,255,0.42)' }}
                  >
                    {w}
                    {i < TITLE_WORDS.length - 1 && (
                      <span style={{ color:'rgba(79,209,197,0.38)', marginLeft:8 }}>·</span>
                    )}
                  </motion.span>
                ))}
                <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2, duration:0.4 }}>
                  <Cursor />
                </motion.span>
              </div>

              {/* Separator */}
              <motion.div
                initial={{ scaleX:0, opacity:0 }}
                animate={{ scaleX:1, opacity:1 }}
                transition={{ duration:0.65, delay:0.72, ease:[0.22,1,0.36,1] }}
                className="w-full mt-9 mb-7"
                style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(79,209,197,0.22),transparent)', transformOrigin:'left' }}
              />

              {/* Progress */}
              <motion.div
                initial={{ opacity:0, y:8 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.4, delay:0.6 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                <SegmentedBar progress={progress} />
                <div className="w-full" style={{ padding:'0 2px' }}>
                  <ProgressLine progress={progress} />
                </div>
                <div className="flex items-center justify-between w-full" style={{ padding:'0 2px' }}>
                  <motion.span
                    key={status}
                    initial={{ opacity:0, x:-5 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ duration:0.28 }}
                    className="font-mono uppercase"
                    style={{ fontSize:'0.64rem', letterSpacing:'0.12em', color:'rgba(79,209,197,0.6)' }}
                  >
                    {status}
                  </motion.span>
                  <span className="font-mono" style={{ fontSize:'0.67rem', color:'rgba(255,255,255,0.28)' }}>
                    {Math.min(100, Math.round(progress))}
                    <span style={{ color:'rgba(79,209,197,0.55)' }}>%</span>
                  </span>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ delay:1.05, duration:0.7 }}
                className="font-mono uppercase mt-10"
                style={{ fontSize:'0.58rem', letterSpacing:'0.2em', color:'rgba(255,255,255,0.13)' }}
              >
                Spring Boot · React.js · Angular · MySQL
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
