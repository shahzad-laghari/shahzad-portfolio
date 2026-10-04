import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Github, Linkedin, MessageCircle, Mail, MapPin,
  Send, ArrowRight,
} from 'lucide-react'

const connectLinks = [
  {
    href: 'https://www.linkedin.com/in/shahzad-ali-655bb7308/',
    icon: Linkedin,
    label: "Let's Connect",
    sub: 'on LinkedIn',
    iconColor: 'text-[#0A66C2]',
    borderColor: 'hover:border-[#0A66C2]/40',
    glow: 'hover:shadow-[0_0_20px_rgba(10,102,194,0.1)]',
  },
  {
    href: 'https://github.com/shahzad-laghari',
    icon: Github,
    label: "Let's Connect",
    sub: 'on GitHub',
    iconColor: 'text-white',
    borderColor: 'hover:border-white/30',
    glow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.04)]',
  },
  {
    href: 'https://wa.me/923498873336',
    icon: MessageCircle,
    label: "Let's Connect",
    sub: 'on WhatsApp',
    iconColor: 'text-[#25D366]',
    borderColor: 'hover:border-[#25D366]/40',
    glow: 'hover:shadow-[0_0_20px_rgba(37,211,102,0.08)]',
  },
]

const infoItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'shahzadali.official6@gmail.com',
    href: 'mailto:shahzadali.official6@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Pakistan',
    href: null,
  },
]

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.elements['name'].value
    const email = e.target.elements['email'].value
    const msg = e.target.elements['message'].value
    const mailto = `mailto:shahzadali.official6@gmail.com?subject=${encodeURIComponent(
      'Portfolio contact from ' + name,
    )}&body=${encodeURIComponent(msg + '\n\nFrom: ' + email)}`
    setSubmitting(true)
    setTimeout(() => {
      window.location.href = mailto
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    }, 600)
  }

  return (
    <section id="contact" className="section-padding relative" aria-label="Contact">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79, 209, 197,0.15), transparent)' }}
        aria-hidden="true"
      />
      {/* Bottom glow blob */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(ellipse at center, rgba(79, 209, 197,0.3) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            Get In Touch
          </span>
          <h2 className="font-display font-bold text-[clamp(1.8rem,3.5vw,2.6rem)] text-white">
            Let&apos;s <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-white/45 mt-3 max-w-[44ch] mx-auto text-sm leading-relaxed">
            Have an opening or a question? I&apos;m actively looking for backend roles. Reach out — I reply fast.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-6 items-start">

          {/* ── Contact form ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="bg-elevated border border-white/[0.07] rounded-2xl p-5 sm:p-7 relative overflow-hidden"
          >
            {/* Subtle top border gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(79, 209, 197,0.3), transparent)' }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div>
                <h3 className="text-white font-semibold text-base sm:text-lg">Send a Message</h3>
                <p className="text-white/35 text-xs mt-0.5 font-mono">Opens your email client</p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Send size={15} className="text-accent" aria-hidden="true" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-white/45 mb-2">
                    Your Name <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Shahzad Ali"
                    className="w-full bg-elevated2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none input-glow transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-white/45 mb-2">
                    Your Email <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full bg-elevated2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none input-glow transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-white/45 mb-2">
                  Message <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project you have in mind..."
                  className="w-full bg-elevated2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none input-glow transition-all resize-y min-h-[130px]"
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl font-semibold text-sm bg-accent text-bg hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 btn-shimmer disabled:opacity-70 disabled:cursor-not-allowed shadow-glow-accent"
              >
                {submitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full"
                    />
                    Opening Email…
                  </>
                ) : submitted ? (
                  <>
                    <span>✓</span> Email client opened!
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* ── Right column ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Info cards */}
            {infoItems.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="bg-elevated border border-white/[0.07] rounded-2xl p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white/35 text-[0.7rem] font-mono uppercase tracking-wider">{label}</p>
                  {href ? (
                    <a href={href} className="text-white text-sm font-medium hover:text-accent transition-colors break-all">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Connect links */}
            <div className="bg-elevated border border-white/[0.07] rounded-2xl p-5">
              <h3 className="text-white/60 text-xs font-mono uppercase tracking-widest mb-4">
                Connect With Me
              </h3>
              <div className="flex flex-col gap-2.5">
                {connectLinks.map(({ href, icon: Icon, label, sub, iconColor, borderColor, glow }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-elevated2 border border-white/[0.08] transition-all duration-200 group ${borderColor} ${glow} hover:-translate-x-0 hover:translate-x-1`}
                  >
                    <Icon size={18} className={`flex-shrink-0 ${iconColor}`} aria-hidden="true" />
                    <span className="flex-1">
                      <span className="block font-semibold text-sm text-white">{label}</span>
                      <span className="block text-xs text-white/35">{sub}</span>
                    </span>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
