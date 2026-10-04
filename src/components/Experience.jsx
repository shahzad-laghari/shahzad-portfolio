import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar, MapPin, ExternalLink } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const experiences = [
  {
    role: 'Java Spring Boot Web Developer — Intern',
    company: 'Technify',
    period: '2025',
    location: 'Pakistan (Remote)',
    type: 'Internship',
    color: 'text-accent',
    borderColor: 'border-accent/25',
    bgColor: 'bg-accent/10',
    description:
      'Built and deployed production REST APIs using Spring Boot 3, Spring Security, JWT authentication, and MySQL. Developed role-based access control, optimized database queries, and delivered a full-stack admin dashboard feature.',
    stack: ['Java', 'Spring Boot 3', 'Spring Security', 'JWT', 'MySQL', 'Thymeleaf'],
    highlights: [
      'Designed and implemented JWT-secured REST endpoints consumed by a React frontend',
      'Integrated Hibernate/JPA with MySQL — optimised N+1 queries with fetch joins',
      'Implemented role-based dashboards for Admin and Customer roles',
      'Received Internship Completion Certificate from Technify',
    ],
  },
  {
    role: 'Java Backend Developer — Trainee',
    company: 'Apex Space',
    period: '2023',
    location: 'Pakistan',
    type: 'Training',
    color: 'text-accent2',
    borderColor: 'border-accent2/25',
    bgColor: 'bg-accent2/10',
    description:
      'Completed an intensive Java Backend Development program — mastered core Java, OOP principles, JDBC, and early Spring MVC fundamentals. Built several small CRUD applications and REST services.',
    stack: ['Java', 'Spring MVC', 'JDBC', 'MySQL', 'Maven'],
    highlights: [
      'Built multi-layered CRUD apps following MVC and Service/Repository patterns',
      'Practiced RESTful API design principles and HTTP methods',
      'Completed hands-on projects in a team-based Agile environment',
    ],
  },
]

const education = [
  {
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'University Of Sindh Jamshoro (Pakistan)',
    period: '2022 – 2025',
    type: 'BS Software Engineering',
    location: 'Jamshoro, Pakistan',
    description: 'Comprehensive study of software engineering principles, system architecture, object-oriented design, database systems, and full-stack development.',
    highlights: [
      'Final Year Project: FaceGuard AI — Real-time face recognition attendance with liveness detection, auto-alerts and prediction',
      'Core Coursework: Software Engineering, Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Web Engineering',
      'Practical focus on clean code architecture, scalable system design, and Java full-stack development with Spring Boot & modern frontends',
    ],
    stack: ['Software Engineering', 'Java', 'Data Structures', 'Database Systems', 'System Design'],
    color: 'text-[#a78bfa]',
    borderColor: 'border-[#a78bfa]/25',
    bgColor: 'bg-[#a78bfa]/10',
  },
]

function TimelineCard({ item, index, isExperience = true }) {
  const Icon = isExperience ? Briefcase : GraduationCap
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
      className="relative pl-6 sm:pl-8 pb-8 sm:pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-[9px] sm:left-[11px] top-7 sm:top-8 bottom-0 w-px bg-white/[0.07]" aria-hidden="true" />

      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full ${item.bgColor} border ${item.borderColor} flex items-center justify-center`}
      >
        <Icon size={10} className={`${item.color} sm:w-[11px] sm:h-[11px]`} />
      </div>

      {/* Card */}
      <div className={`bg-elevated border border-white/[0.07] rounded-2xl p-4 sm:p-6 card-glow hover:border-white/[0.12] transition-all duration-300 relative overflow-hidden`}>
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${item.color.includes('accent2') ? 'rgba(245,166,35,0.4)' : item.color.includes('a78b') ? 'rgba(167,139,250,0.4)' : 'rgba(79,209,197,0.4)'}, transparent)` }}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-3">
          <div>
            <h3 className={`font-semibold text-sm sm:text-[1rem] ${item.color} mb-0.5`}>
              {isExperience ? item.role : item.degree}
            </h3>
            <p className="text-white/70 text-xs sm:text-sm font-medium">
              {isExperience ? item.company : item.institution}
            </p>
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1 mt-1 sm:mt-0 flex-wrap">
            <span className={`font-mono text-[0.62rem] sm:text-[0.65rem] px-2.5 py-0.5 sm:py-1 rounded-full ${item.bgColor} ${item.color} border ${item.borderColor}`}>
              {item.type}
            </span>
            <div className="flex items-center gap-1 text-white/35 text-[0.65rem] sm:text-[0.7rem] font-mono">
              <Calendar size={10} />
              {item.period}
            </div>
            {item.location && (
              <div className="flex items-center gap-1 text-white/35 text-[0.65rem] sm:text-[0.7rem] font-mono">
                <MapPin size={10} />
                {item.location}
              </div>
            )}
          </div>
        </div>

        <p className="text-white/50 text-[0.85rem] leading-relaxed mb-4">
          {item.description || item.type}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-4">
          {item.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-white/55 text-[0.8rem] leading-relaxed">
              <span className={`${item.color} mt-0.5 flex-shrink-0`}>▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Stack */}
        {item.stack && (
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
            {item.stack.map((s) => (
              <span key={s} className="font-mono text-[0.67rem] text-accent2 bg-accent2/10 border border-accent2/15 px-2 py-0.5 rounded-md">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative" aria-label="Experience & Education">
      {/* Section separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,209,197,0.15), transparent)' }}
        aria-hidden="true"
      />
      {/* Background blobs */}
      <div
        className="absolute top-1/3 -left-40 w-[380px] h-[380px] rounded-full pointer-events-none opacity-[0.10] blur-3xl"
        style={{ background: 'radial-gradient(circle, #4FD1C5, transparent 70%)' }}
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
            Journey
          </span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-white">
            Experience &{' '}
            <span className="text-gradient">Education</span>
          </h2>
          <p className="text-white/45 mt-3 max-w-[44ch] mx-auto text-sm leading-relaxed">
            My professional journey building Java full-stack applications and growing as a developer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
          {/* Experience column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Briefcase size={16} className="text-accent" />
              </div>
              <h3 className="font-semibold text-white text-base">Work Experience</h3>
            </motion.div>

            {experiences.map((exp, i) => (
              <TimelineCard key={exp.company} item={exp} index={i} isExperience />
            ))}
          </div>

          {/* Education column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-9 h-9 rounded-xl bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center">
                <GraduationCap size={16} className="text-[#a78bfa]" />
              </div>
              <h3 className="font-semibold text-white text-base">Education</h3>
            </motion.div>

            {education.map((edu, i) => (
              <TimelineCard key={edu.degree} item={edu} index={i} isExperience={false} />
            ))}

            {/* Open to work card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 bg-elevated border border-accent/20 rounded-2xl p-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(79,209,197,0.5), transparent)' }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[0.72rem] text-accent uppercase tracking-widest">Open to Opportunities</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Actively seeking full-stack or backend Java developer roles. I bring Spring Boot expertise,
                React.js &amp; Angular frontend skills, and a passion for clean, scalable architecture.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-bg font-semibold text-sm hover:brightness-110 transition-all duration-200 btn-shimmer"
              >
                Get in Touch
                <ExternalLink size={13} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
