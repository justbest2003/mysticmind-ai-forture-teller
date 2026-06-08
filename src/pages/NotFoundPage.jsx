import { motion } from 'framer-motion'
import { Home, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="py-20 text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-4">
          <Compass className="w-24 h-24 text-mystic-500" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">404</h1>
        <p className="text-mystic-400 text-lg mb-8">
          ดูเหมือนดวงดาวจะพาคุณมาผิดทาง...
        </p>
        <Link to="/">
          <Button variant="default" className="gap-2">
            <Home className="w-4 h-4" />
            กลับหน้าหลัก
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
