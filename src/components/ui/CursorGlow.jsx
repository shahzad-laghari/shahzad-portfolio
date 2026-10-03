import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* Soft spotlight that follows the cursor (desktop / fine pointers only) */
export default function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const move = (e) => { x.set(e.clientX - 250); y.set(e.clientY - 250) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: sx,
        y: sy,
        background:
          'radial-gradient(circle, rgba(79,209,197,0.10) 0%, rgba(245,166,35,0.04) 40%, transparent 70%)',
      }}
      className="pointer-events-none fixed top-0 left-0 z-[1] w-[500px] h-[500px] rounded-full hidden md:block"
    />
  )
}
