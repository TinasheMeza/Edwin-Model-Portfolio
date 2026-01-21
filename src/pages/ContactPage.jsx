import { motion } from 'framer-motion'
import Contact from '../components/Contact'

const ContactPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-charcoal pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Contact />
    </motion.div>
  )
}

export default ContactPage
