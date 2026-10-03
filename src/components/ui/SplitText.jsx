import { motion } from 'framer-motion'

/* Word-by-word masked reveal for headings */
export default function SplitText({ text, className = '', wordClassName = '', delay = 0, as = 'span' }) {
  const Tag = motion[as] || motion.span
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: {
                y: 0, opacity: 1,
                transition: { duration: 0.6, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {w}{i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
