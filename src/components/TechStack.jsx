import { motion } from 'framer-motion'
import { coreStack, frontendStack, toolsStrip } from '../data/techstack'
import { iconSVGs } from '../data/techIcons'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function TechCard({ tech, variant = 'core' }) {
  const isGeneric = ['security', 'api', 'mockito'].includes(tech.key)
  const glow = variant === 'frontend' ? 'rgba(245,166,35,0.07)' : 'rgba(79,209,197,0.07)'
  const borderHover = variant === 'frontend' ? 'group-hover:border-accent2/35' : 'group-hover:border-accent/35'
  const iconColor = isGeneric ? (variant === 'frontend' ? 'text-accent2' : 'text-accent') : ''
  const topLine = variant === 'frontend' ? 'via-accent2/50' : 'via-accent/50'

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative bg-elevated border border-white/[0.07] rounded-2xl py-7 px-4 text-center overflow-hidden transition-colors duration-300 cursor-default"
    >
      {/* Top accent line — reveals on hover, color encodes category */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${topLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        aria-hidden="true"
      />
      {/* Subtle radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${glow} 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className={`relative mx-auto mb-4 rounded-xl bg-elevated2 border border-white/[0.06] flex items-center justify-center ${borderHover} group-hover:bg-elevated transition-all duration-300`}
        style={{ width: '3.25rem', height: '3.25rem' }}
      >
        <span
          className={`block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${iconColor} ${
            isGeneric ? 'w-6 h-6' : 'w-7 h-7'
          } [&>svg]:w-full [&>svg]:h-full`}
          dangerouslySetInnerHTML={{ __html: iconSVGs[tech.key] }}
          aria-hidden="true"
        />
      </div>

      <span className="text-[0.82rem] font-medium text-white/60 group-hover:text-white/90 transition-colors duration-200">
        {tech.name}
      </span>
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
      {children}
    </span>
  )
}

function CategoryLabel({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 mt-14 mb-6"
    >
      <div className="h-px flex-1 bg-white/[0.07]" aria-hidden="true" />
      <span className="font-mono text-xs text-white/35 uppercase tracking-widest px-2">
        {children}
      </span>
      <div className="h-px flex-1 bg-white/[0.07]" aria-hidden="true" />
    </motion.div>
  )
}

function Marquee() {
  const items = [...coreStack, ...frontendStack]
  const row = [...items, ...items]
  return (
    <div className="marquee-mask overflow-hidden mt-10" aria-hidden="true">
      <div className="marquee-track flex w-max gap-3 animate-marquee">
        {row.map((t, i) => (
          <div
            key={`${t.key}-${i}`}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-elevated border border-white/[0.07] flex-shrink-0"
          >
            <span
              className={`block w-5 h-5 [&>svg]:w-full [&>svg]:h-full ${
                ['security', 'api', 'mockito'].includes(t.key) ? 'text-accent' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: iconSVGs[t.key] }}
            />
            <span className="font-mono text-xs text-white/55 whitespace-nowrap">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section id="tech" className="section-padding relative" aria-label="Tech Stack">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79, 209, 197,0.15), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-4"
        >
          <SectionLabel>Java Full-Stack Skills</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-white">
            My Tech <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-white/45 mt-3 max-w-[40ch] mx-auto text-sm leading-relaxed">
            Java, Spring Boot, React.js, Angular, MySQL and REST APIs — the full stack I use to ship production-grade systems.
          </p>
        </motion.div>

        <Marquee />

        {/* Core / Backend */}
        <CategoryLabel>Backend, Java &amp; Core</CategoryLabel>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {coreStack.map((t) => (
            <TechCard key={t.key} tech={t} />
          ))}
        </motion.div>

        {/* Frontend */}
        <CategoryLabel>Frontend &amp; Full-Stack</CategoryLabel>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {frontendStack.map((t) => (
            <TechCard key={t.key} tech={t} variant="frontend" />
          ))}
        </motion.div>

        {/* Tools strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 pt-8 border-t border-white/[0.06]"
        >
          <p className="text-center font-mono text-[0.65rem] text-white/30 uppercase tracking-widest mb-5">
            Tools &amp; Practices
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {toolsStrip.map((tool) => (
              <motion.span
                key={tool}
                whileHover={{ y: -2, borderColor: 'rgba(245, 166, 35,0.4)', transition: { duration: 0.15 } }}
                className="tag-chip cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
