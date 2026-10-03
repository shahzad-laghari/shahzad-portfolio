import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ZoomOut, Maximize2, FileText } from 'lucide-react'

export default function ResumeModal({ isOpen, onClose }) {
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 cursor-zoom-out"
        role="dialog"
        aria-modal="true"
        aria-label="Resume Lightbox View"
      >
        {/* Top Control Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 max-w-4xl w-full mx-auto flex items-center justify-between px-5 py-3 rounded-2xl bg-elevated/80 border border-white/15 backdrop-blur-2xl shadow-2xl cursor-default"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <FileText size={16} />
            </span>
            <div>
              <h3 className="font-display font-bold text-white text-sm sm:text-base leading-none">
                Shahzad Ali — Resume
              </h3>
              <p className="text-white/40 text-[0.68rem] font-mono mt-1">View Only Mode</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.25))}
              aria-label="Zoom out"
              title="Zoom out"
              className="p-2 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:border-white/25 transition-all"
            >
              <ZoomOut size={16} />
            </button>
            <span className="font-mono text-xs text-white/50 w-12 text-center select-none">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
              aria-label="Zoom in"
              title="Zoom in"
              className="p-2 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:border-white/25 transition-all"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setZoom(1)}
              aria-label="Reset zoom"
              title="Reset zoom"
              className="p-2 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:border-white/25 transition-all hidden sm:inline-flex"
            >
              <Maximize2 size={15} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              title="Close (Esc)"
              className="p-2 rounded-xl border border-accent/40 bg-accent/15 text-accent hover:bg-accent hover:text-bg transition-all ml-2"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Full-Screen Scrollable Image Container */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex-1 overflow-auto my-3 p-2 sm:p-4 flex justify-center items-start cursor-default scrollbar-thin"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="transition-transform duration-200 ease-out origin-top my-auto max-w-full"
            style={{ transform: `scale(${zoom})` }}
          >
            <object
              data="/resume.pdf"
              type="application/pdf"
              className="rounded-2xl border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.9)] w-[min(80vw,850px)] h-[82vh] mx-auto select-none bg-white"
            >
              <div className="w-[min(80vw,850px)] h-[82vh] flex flex-col items-center justify-center gap-4 bg-elevated rounded-2xl border border-white/15">
                <FileText size={32} className="text-accent" />
                <p className="text-white/60 text-sm text-center px-6">
                  Your browser can&apos;t preview the PDF inline.
                </p>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-accent text-bg"
                >
                  Open Resume ↗
                </a>
              </div>
            </object>
          </motion.div>
        </div>

        {/* Footer Hint */}
        <div className="relative z-10 text-center text-white/30 font-mono text-[0.7rem] select-none pointer-events-none">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60">ESC</kbd> or click outside to close
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
