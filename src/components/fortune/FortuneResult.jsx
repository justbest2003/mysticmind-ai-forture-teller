import { motion } from 'framer-motion'
import { RotateCcw, Loader2, Frown, Sparkles, Star, Briefcase, Coins, Heart, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { FortuneCard } from './FortuneCard'

const loadingSteps = [
  { icon: Star, text: 'กำลังอ่านดวงดาว...' },
  { icon: Briefcase, text: 'วิเคราะห์ดวงการงาน...' },
  { icon: Coins, text: 'ดูดวงการเงิน...' },
  { icon: Heart, text: 'พยากรณ์ดวงความรัก...' },
  { icon: Lightbulb, text: 'สรุปคำแนะนำ...' },
]

function StreamingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="glass-card p-6 rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-6 h-6 text-mystic-400" />
          </motion.div>
          <div>
            <h3 className="text-base font-semibold shimmer-text">กำลังทำนายดวงชะตา...</h3>
            <p className="text-xs text-mystic-400 mt-0.5">โปรดรอสักครู่ ดวงดาวกำลังบอกเล่าอนาคตของคุณ</p>
          </div>
        </div>

        {/* Animated Steps */}
        <div className="space-y-3">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 1.5, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 1.5 + 0.2, type: 'spring', stiffness: 200 }}
              >
                <step.icon className="w-4 h-4 text-mystic-400" />
              </motion.div>
              <motion.span
                className="text-sm text-mystic-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{ delay: index * 1.5, duration: 1.5 }}
              >
                {step.text}
              </motion.span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 1.5 + 0.3, duration: 1.2, ease: 'easeInOut' }}
                className="flex-1 h-0.5 rounded-full bg-gradient-to-r from-mystic-500/40 to-transparent"
              />
            </motion.div>
          ))}
        </div>

        {/* Pulsing dots at bottom */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-mystic-500"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function FortuneResult({ status, streamingText, result, error, onReset }) {
  if (status === 'idle') return null

  if (status === 'loading' || status === 'streaming') {
    return <StreamingIndicator />
  }

  if (status === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glass-card p-6 rounded-2xl border-red-500/30">
          <div className="flex items-center gap-3 mb-3">
            <Frown className="w-6 h-6 text-red-400" />
            <h3 className="text-base font-semibold text-red-400">เกิดข้อผิดพลาด</h3>
          </div>
          <p className="text-sm text-red-300/80 mb-4">{error}</p>
          <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            ลองใหม่อีกครั้ง
          </Button>
        </div>
      </motion.div>
    )
  }

  if (status === 'complete' && result) {
    const categories = ['summary', 'career', 'finance', 'relationship', 'advice']

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto space-y-4"
      >
        {/* Result Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold gradient-text mb-1 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-gold-400" /> ผลคำทำนาย <Sparkles className="w-6 h-6 text-gold-400" />
          </h2>
          <p className="text-mystic-400 text-sm">คำทำนายจากดวงดาวถึงคุณ</p>
        </motion.div>

        {/* Fortune Cards - staggered reveal */}
        <div className="grid gap-4">
          {categories.map((category, index) => {
            // If only summary exists and other fields are empty, it's likely a warning/rejection from the prompt rules
            const isWarning = category === 'summary' && !result.career && !result.finance && !result.relationship && !result.advice;
            
            return (
              <FortuneCard
                key={category}
                type={category}
                content={result[category]}
                index={index}
                isWarning={isWarning}
              />
            )
          })}
        </div>

        {/* Reset Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: categories.length * 0.15 + 0.3 }}
          className="flex justify-center pt-4"
        >
          <Button variant="outline" onClick={onReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            ถามคำถามใหม่
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return null
}
