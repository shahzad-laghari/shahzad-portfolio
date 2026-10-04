import { motion } from 'framer-motion'
import { User, Code2, Layers, Database, Cpu, Globe, BookOpen, Star } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const highlights = [
  {
    icon: Cpu,
    title: 'Java & Spring Boot',
    desc: 'Expert-level backend dev — REST APIs, Spring Security, JWT, Hibernate/JPA, ACID transactions.',
    color: 'text-[#EA2D2E]',
    bg: 'bg-[#EA2D2E]/10',
    border: 'border-[#EA2D2E]/20',
  },
  {
    icon: Globe,
    title: 'React.js & Angular',
    desc: 'Full-featured SPAs with React hooks, state management, Angular services, and component libraries.',
    color: 'text-[#61DAFB]',
    bg: 'bg-[#61DAFB]/10',
    border: 'border-[#61DAFB]/20',
  },
  {
    icon: Database,
    title: 'MySQL & Databases',
    desc: 'Relational design with MySQL & PostgreSQL, document stores with MongoDB, ORM via Hibernate.',
    color: 'text-[#4aa3d8]',
    bg: 'bg-[#4aa3d8]/10',
    border: 'border-[#4aa3d8]/20',
  },
  {
    icon: Layers,
    title: 'REST API Design',
    desc: 'Versioned, documented APIs with OpenAPI/Swagger, proper HTTP semantics, error handling and pagination.',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
  },
]

const skills = [
  { name: 'Java & Spring Boot', level: 92, color: '#EA2D2E' },
  { name: 'REST API Design', level: 90, color: '#4FD1C5' },
  { name: 'MySQL / PostgreSQL', level: 85, color: '#4aa3d8' },
  { name: 'React.js', level: 80, color: '#61DAFB' },
  { name: 'Angular', level: 72, color: '#DD0031' },
  { name: 'Spring Security & JWT', level: 88, color: '#77bc1f' },
]

function SkillBar({ name, level, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white/70 font-medium">{name}</span>
        <span className="font-mono text-[0.72rem] text-white/40">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="section-padding relative" aria-label="About Me">
      {/* Section separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,209,197,0.15), transparent)' }}
        aria-hidden="true"
      />
      {/* Background blobs */}
      <div
        className="absolute top-20 -right-40 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.10] blur-3xl"
        style={{ background: 'radial-gradient(circle, #DD0031, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.10] blur-3xl"
        style={{ background: 'radial-gradient(circle, #61DAFB, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            About Me
          </span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-white">
            Java Full-Stack{' '}
            <span className="text-gradient">Developer</span>
          </h2>
          <p className="text-white/45 mt-3 max-w-[50ch] mx-auto text-sm leading-relaxed">
            Passionate about crafting scalable systems end-to-end — from Spring Boot APIs to React &amp; Angular frontends.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Left: Profile text + highlights */}
          <div>
            {/* Profile card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start mb-6 sm:mb-8 p-5 sm:p-6 bg-elevated border border-white/[0.07] rounded-2xl relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(79,209,197,0.35), transparent)' }}
                aria-hidden="true"
              />
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0">
                <User size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg mb-0.5 sm:mb-1">Shahzad Ali</h3>
                <p className="font-mono text-[0.7rem] sm:text-[0.72rem] text-accent mb-2.5 sm:mb-3 tracking-wide">Java Full-Stack Developer</p>
                <p className="text-white/55 text-xs sm:text-sm leading-relaxed">
                  I build complete web applications — robust backend APIs with Java &amp; Spring Boot paired with
                  dynamic, responsive frontends using React.js and Angular. I'm driven by clean architecture,
                  secure authentication, and writing code that scales.
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3.5 sm:mt-4">
                  {['Java 21', 'Spring Boot', 'React.js', 'Angular', 'MySQL', 'REST APIs'].map((tag) => (
                    <span key={tag} className="tag-chip">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Highlights grid */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {highlights.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i + 1}
                  className={`p-4 sm:p-5 bg-elevated border ${border} rounded-2xl group hover:border-opacity-50 transition-all duration-300 card-glow`}
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${bg} border ${border} flex items-center justify-center mb-2.5 sm:mb-3`}>
                    <Icon size={18} className={color} />
                  </div>
                  <h4 className={`font-semibold text-xs sm:text-[0.9rem] ${color} mb-1 sm:mb-1.5`}>{title}</h4>
                  <p className="text-white/50 text-[0.75rem] sm:text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Skill bars + quick facts */}
          <div className="mt-4 lg:mt-0">
            {/* Skill bars */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              className="bg-elevated border border-white/[0.07] rounded-2xl p-5 sm:p-7 mb-4 sm:mb-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.35), transparent)' }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2 mb-5 sm:mb-6">
                <Star size={16} className="text-accent2" />
                <h3 className="text-white font-semibold text-sm">Core Proficiency</h3>
              </div>
              <div className="space-y-4 sm:space-y-5">
                {skills.map((s, i) => (
                  <SkillBar key={s.name} {...s} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Quick facts */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                { icon: Code2, label: 'Full-Stack Projects', value: '6+', color: 'text-accent' },
                { icon: BookOpen, label: 'Certifications', value: '4+', color: 'text-accent2' },
                { icon: Cpu, label: 'Years Experience', value: '1+', color: 'text-[#61DAFB]' },
                { icon: Globe, label: 'Technologies', value: '20+', color: 'text-[#77bc1f]' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-elevated border border-white/[0.07] rounded-2xl p-3.5 sm:p-5 text-center group hover:-translate-y-0.5 transition-transform duration-200">
                  <Icon size={18} className={`${color} mx-auto mb-1.5 sm:mb-2`} />
                  <div className={`font-display font-bold text-xl sm:text-2xl ${color} mb-0.5 sm:mb-1`}>{value}</div>
                  <div className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-white/35 leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
