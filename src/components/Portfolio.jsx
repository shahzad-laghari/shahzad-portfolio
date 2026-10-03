import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutGrid, Award, ExternalLink, Github,
  ChevronLeft, ChevronRight, X, ArrowUpRight, Layers, Maximize2,
} from 'lucide-react'
import { projects } from '../data/projects'
import { certificates } from '../data/certificates'
import TiltCard from './ui/TiltCard'
import SplitText from './ui/SplitText'

const EASE = [0.22, 1, 0.36, 1]

/* ─── Image gallery with auto-cycle (card thumbnail) ─────── */
function ProjectGallery({ images, title }) {
  const [i, setI] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (hovered || images.length < 2) return
    const t = setInterval(() => setI((n) => (n + 1) % images.length), 3200)
    return () => clearInterval(t)
  }, [hovered, images.length])

  return (
    <div
      className="relative w-full h-full img-zoom"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={i}
          src={images[i]}
          alt={`${title} screenshot ${i + 1}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-full h-full object-cover object-top absolute inset-0"
          loading="lazy"
          decoding="async"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10" aria-label={`Image ${i + 1} of ${images.length}`}>
          {images.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={(e) => { e.stopPropagation(); setI(dotIdx) }}
              aria-label={`Go to screenshot ${dotIdx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                dotIdx === i ? 'w-5 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Project Card ───────────────────────────────────────── */
function ProjectCard({ project, index, onOpen }) {
  const images = project.images || (project.image ? [project.image] : [])

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
      className="group h-full"
    >
      <TiltCard className="relative h-full bg-elevated border border-white/[0.07] rounded-2xl overflow-hidden flex flex-col card-glow gradient-border">
        {/* Image area */}
        <div
          className="relative h-[190px] border-b border-white/[0.07] overflow-hidden bg-elevated2 cursor-pointer"
          onClick={() => onOpen(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onOpen(project) }}
          aria-label={`Open ${project.title} details`}
        >
          <ProjectGallery images={images} title={project.title} />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(18,23,31,0.75) 0%, transparent 55%)' }}
            aria-hidden="true"
          />

          {/* Index number */}
          <span className="absolute top-3 right-3 font-mono text-[0.65rem] text-white/50 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md z-10">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Tag badge */}
          <span className="absolute top-3 left-3 font-mono text-[0.65rem] px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/25 backdrop-blur-sm z-10">
            {project.tag}
          </span>

          {/* Hover hint */}
          <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 text-[0.68rem] font-mono text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-black/55 backdrop-blur-sm px-2 py-1 rounded-md">
            <Maximize2 size={11} /> {images.length} {images.length === 1 ? 'shot' : 'shots'}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-white font-semibold text-[1rem] mb-2 leading-snug group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-white/50 text-[0.875rem] leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
            {project.stack.slice(0, 5).map((s) => (
              <span
                key={s}
                className="font-mono text-[0.67rem] text-accent2 bg-accent2/10 border border-accent2/15 px-2 py-0.5 rounded-md"
              >
                {s}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="font-mono text-[0.67rem] text-white/35 px-1.5 py-0.5">
                +{project.stack.length - 5}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.07]">
            <div className="flex items-center gap-3">
              {project.liveHref && (
                <a
                  href={project.liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live demo`}
                  className="flex items-center gap-1 text-accent2 text-[0.8rem] font-semibold hover:text-accent2/80 transition-colors"
                >
                  <ExternalLink size={13} />
                  Live
                </a>
              )}
              {project.codeHref && (
                <a
                  href={project.codeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                  className="flex items-center gap-1 text-white/50 text-[0.8rem] font-semibold hover:text-white transition-colors"
                >
                  <Github size={13} />
                  Code
                </a>
              )}
            </div>

            <button
              onClick={() => onOpen(project)}
              aria-label={`View details of ${project.title}`}
              className="group/btn flex items-center gap-1 text-white/55 hover:text-accent text-[0.8rem] font-medium transition-colors"
            >
              Details
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  )
}

/* ─── Project Detail Modal ───────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const images = project.images || []
  const [i, setI] = useState(0)

  const next = useCallback(() => setI((n) => (n + 1) % images.length), [images.length])
  const prev = useCallback(() => setI((n) => (n - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, next, prev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto lg:overflow-hidden bg-elevated border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.7)] grid lg:grid-cols-[1.35fr_1fr]"
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Gallery */}
        <div className="bg-bg/80 p-3 sm:p-5 flex flex-col justify-center gap-3 lg:max-h-[92vh]">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-elevated2 aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.img
                key={i}
                src={images[i]}
                alt={`${project.title} screenshot ${i + 1}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </AnimatePresence>
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm hover:bg-accent hover:text-bg text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm hover:bg-accent hover:text-bg text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
                <span className="absolute bottom-3 left-3 font-mono text-[0.7rem] text-white/80 bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  {i + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((src, idx) => (
                <button
                  key={src}
                  onClick={() => setI(idx)}
                  aria-label={`Show screenshot ${idx + 1}`}
                  className={`relative flex-shrink-0 w-24 aspect-[16/9] rounded-lg overflow-hidden border transition-all duration-200 ${
                    idx === i ? 'border-accent ring-2 ring-accent/30' : 'border-white/10 opacity-55 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 lg:overflow-y-auto lg:max-h-[92vh]">
          <span className="inline-flex font-mono text-[0.68rem] px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/25 mb-4">
            {project.tag}
          </span>
          <h3 className="font-display font-bold text-white text-xl sm:text-2xl leading-snug mb-3 pr-8">
            {project.title}
          </h3>
          <p className="text-white/55 text-sm leading-relaxed mb-6">{project.description}</p>

          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-white/30 mb-3">Key Features</p>
          <ul className="space-y-2.5 mb-6">
            {project.features.map((f, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.05, duration: 0.35 }}
                className="flex gap-2.5 text-[0.83rem] text-white/60 leading-relaxed"
              >
                <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                <span>{f}</span>
              </motion.li>
            ))}
          </ul>

          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-white/30 mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[0.7rem] text-accent2 bg-accent2/10 border border-accent2/15 px-2.5 py-1 rounded-md">
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.codeHref && (
              <a
                href={project.codeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-bg font-semibold text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-glow-accent"
              >
                <Github size={15} /> View Code
              </a>
            )}
            {project.liveHref && (
              <a
                href={project.liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-elevated2 text-white font-semibold text-sm hover:border-accent2/60 hover:-translate-y-0.5 transition-all"
              >
                <ExternalLink size={15} className="text-accent2" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Certificate Card ───────────────────────────────────── */
function CertCard({ cert, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={() => cert.image && onOpen(cert)}
      className={`bg-elevated border border-white/[0.07] rounded-2xl p-5 flex gap-4 items-start transition-all duration-200 ${
        cert.image
          ? 'cursor-pointer card-glow hover:-translate-y-1'
          : ''
      }`}
    >
      {cert.image ? (
        <div className="relative flex-shrink-0">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-16 h-16 rounded-xl object-cover border border-white/[0.08]"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" aria-hidden="true" />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
          <Award size={20} className="text-accent" aria-hidden="true" />
        </div>
      )}
      <div className="min-w-0">
        <h3 className="text-white font-semibold text-[0.95rem] leading-snug mb-1">{cert.title}</h3>
        <p className="text-white/40 text-xs font-mono">
          {cert.issuer} · {cert.year}
        </p>
        {cert.image && (
          <p className="text-accent/60 text-[0.7rem] mt-1.5 font-mono">Click to view ↗</p>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Lightbox ───────────────────────────────────────────── */
function Lightbox({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.title}`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X size={18} />
      </button>
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-3xl w-full"
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.7)] border border-white/10"
        />
        <p className="text-center text-white/50 text-sm mt-4 font-mono">
          {cert.title} — {cert.issuer} ({cert.year})
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─── Tab Button ─────────────────────────────────────────── */
function TabButton({ active, onClick, icon: Icon, label, count }) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
        active
          ? 'text-white'
          : 'text-white/45 hover:text-white/70 hover:bg-white/[0.04]'
      }`}
    >
      {active && (
        <motion.div
          layoutId="tab-bg"
          className="absolute inset-0 rounded-xl bg-elevated border border-white/10"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          aria-hidden="true"
        />
      )}
      <span className="relative flex items-center gap-2">
        <Icon size={16} />
        {label}
        <span className={`font-mono text-[0.65rem] px-1.5 py-0.5 rounded-md ${active ? 'bg-accent/20 text-accent' : 'bg-white/[0.06] text-white/30'}`}>
          {count}
        </span>
      </span>
    </button>
  )
}

/* ─── Main Portfolio Component ───────────────────────────── */
export default function Portfolio() {
  const [tab, setTab] = useState('projects')
  const [lightbox, setLightbox] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const [filter, setFilter] = useState('All')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))],
    [],
  )
  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="portfolio" className="section-padding relative" aria-label="Portfolio">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79, 209, 197,0.15), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-40 -left-40 w-[420px] h-[420px] rounded-full pointer-events-none opacity-[0.12] blur-3xl"
        style={{ background: 'radial-gradient(circle, #4FD1C5, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 -right-40 w-[420px] h-[420px] rounded-full pointer-events-none opacity-[0.08] blur-3xl"
        style={{ background: 'radial-gradient(circle, #F5A623, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            What I&apos;ve Built
          </span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-white">
            <SplitText text="Portfolio" />{' '}
            <SplitText text="Showcase" delay={0.15} wordClassName="text-gradient" />
          </h2>
          <p className="text-white/45 mt-3 max-w-[44ch] mx-auto text-sm leading-relaxed">
            A curated collection of projects and certifications that reflect my growth as a developer.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8 mt-8" role="tablist" aria-label="Portfolio tabs">
          <div className="inline-flex gap-1 p-1 rounded-2xl bg-elevated2 border border-white/[0.07]">
            <TabButton
              active={tab === 'projects'}
              onClick={() => setTab('projects')}
              icon={LayoutGrid}
              label="Projects"
              count={projects.length}
            />
            <TabButton
              active={tab === 'certs'}
              onClick={() => setTab('certs')}
              icon={Award}
              label="Certificates"
              count={certificates.length}
            />
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === 'projects' ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              role="tabpanel"
              aria-label="Projects"
            >
              {/* Filter chips */}
              <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filter projects by category">
                <Layers size={15} className="text-white/25 self-center mr-1 hidden sm:block" aria-hidden="true" />
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    aria-pressed={filter === c}
                    className={`relative px-4 py-1.5 rounded-full font-mono text-[0.72rem] border transition-colors duration-200 ${
                      filter === c
                        ? 'text-bg border-transparent'
                        : 'text-white/50 border-white/10 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {filter === c && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative">{c}</span>
                  </button>
                ))}
              </div>

              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {visible.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} onOpen={setActiveProject} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="certs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto"
              role="tabpanel"
              aria-label="Certificates"
            >
              {certificates.map((c, i) => (
                <CertCard key={c.id} cert={c} index={i} onOpen={setLightbox} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {lightbox && <Lightbox cert={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>
    </section>
  )
}
