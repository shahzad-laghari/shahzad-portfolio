import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Animate progress bar from 0 to 100 over 1.4s
    const steps = 60
    const interval = 1400 / steps
    let current = 0
    const timer = setInterval(() => {
      current += 100 / steps
      setProgress(Math.min(current, 100))
      if (current >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 350) // content mounts while the curtain lifts
        }, 200)
      }
    }, interval)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
          aria-label="Loading"
          role="status"
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(79, 209, 197,0.3) 0%, transparent 70%)',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative text-center"
          >
            {/* Logo */}
            <div className="font-display font-bold text-2xl text-white mb-1 tracking-tight">
              Shahzad Ali
              <span className="font-mono text-sm text-white/30 font-normal ml-1">.dev</span>
            </div>
            <div className="font-mono text-xs text-white/40 mb-8 tracking-widest uppercase">
              Java Full-Stack Developer
            </div>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #4FD1C5, #7EEDE1, #F5A623)',
                  width: `${progress}%`,
                }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="font-mono text-[0.65rem] text-white/25 mt-3 tracking-widest">
              {Math.round(progress)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
