import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Bio from '../components/Bio'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Bio />
    </motion.div>
  )
}

export default Home
