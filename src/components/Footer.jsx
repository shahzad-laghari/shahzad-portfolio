import { Github, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#tech', label: 'Skills' },
  { href: '#portfolio', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

const socialLinks = [
  {
    href: 'https://github.com/shahzad-laghari',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/shahzad-ali-655bb7308/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'mailto:shahzadali.official6@gmail.com',
    label: 'Email',
    icon: Mail,
    isEmail: true,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.07]" role="contentinfo">
      {/* Top gradient accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79, 209, 197,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 sm:py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-[1fr_auto_auto] gap-8 sm:gap-10 items-start mb-8 sm:mb-10">

          {/* Brand */}
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5 mb-3 group" aria-label="Back to top">
              <span className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent text-xs font-mono font-bold group-hover:bg-accent group-hover:text-bg transition-all duration-200">
                SA
              </span>
              <span className="font-display font-bold text-white text-lg">
                Shahzad Ali
                <span className="font-mono text-xs text-white/30 font-normal ml-1">.dev</span>
              </span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-[30ch]">
              Java Full-Stack Developer — Spring Boot APIs, React.js &amp; Angular frontends, MySQL databases.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5 mt-5">
              {socialLinks.map(({ href, label, icon: Icon, isEmail }) => (
                <a
                  key={label}
                  href={href}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 rounded-lg border border-white/[0.08] bg-elevated flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon size={15} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-white/30 text-[0.68rem] font-mono uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/30 text-[0.68rem] font-mono uppercase tracking-widest mb-4">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-accent transition-colors duration-200 inline-flex items-center gap-1.5"
                  aria-label="View Resume PDF in new tab"
                >
                  Resume
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shahzad-laghari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  GitHub Profile
                  <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/shahzad-ali-655bb7308/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  LinkedIn
                  <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-mono">
            © {year}{' '}
            <span className="text-accent">Shahzad Ali</span>
            . All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-mono flex items-center gap-1.5">
            Built with React, Vite, Tailwind &{' '}
            <span className="inline-flex items-center gap-0.5 text-accent/60">
              <Heart size={11} className="fill-current" aria-hidden="true" />
              Framer Motion
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
