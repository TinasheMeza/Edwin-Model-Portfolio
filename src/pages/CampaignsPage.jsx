import { motion } from 'framer-motion'
import Campaigns from '../components/Campaigns'

const CampaignsPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-charcoal pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Campaigns />
    </motion.div>
  )
}

export default CampaignsPage
