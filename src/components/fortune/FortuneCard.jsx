import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Star, Briefcase, Coins, Heart, Lightbulb, Sparkles, AlertCircle } from 'lucide-react'

const iconMap = {
  summary: <Star className="w-6 h-6 text-mystic-300" />,
  career: <Briefcase className="w-6 h-6 text-blue-400" />,
  finance: <Coins className="w-6 h-6 text-gold-400" />,
  relationship: <Heart className="w-6 h-6 text-pink-400" />,
  advice: <Lightbulb className="w-6 h-6 text-emerald-400" />,
}

const titleMap = {
  summary: 'ภาพรวมดวงชะตา',
  career: 'ด้านการงาน',
  finance: 'ด้านการเงิน',
  relationship: 'ด้านความรัก',
  advice: 'คำแนะนำ',
}

const gradientMap = {
  summary: 'from-mystic-500/20 to-cosmic-500/20',
  career: 'from-blue-500/20 to-cyan-500/20',
  finance: 'from-gold-500/20 to-yellow-500/20',
  relationship: 'from-pink-500/20 to-rose-500/20',
  advice: 'from-emerald-500/20 to-teal-500/20',
}

const borderColorMap = {
  summary: 'border-mystic-500/30',
  career: 'border-blue-500/30',
  finance: 'border-gold-500/30',
  relationship: 'border-pink-500/30',
  advice: 'border-emerald-500/30',
}

export function FortuneCard({ type, content, index = 0, isWarning = false }) {
  if (!content) return null

  const displayTitle = isWarning ? 'ข้อความเตือนจากหมอดู' : (titleMap[type] || type)
  const displayIcon = isWarning ? <AlertCircle className="w-6 h-6 text-orange-400" /> : (iconMap[type] || <Sparkles className="w-6 h-6 text-mystic-300" />)
  const displayGradient = isWarning ? 'from-orange-500/20 to-red-500/20' : (gradientMap[type] || gradientMap.summary)
  const displayBorder = isWarning ? 'border-orange-500/30' : (borderColorMap[type] || borderColorMap.summary)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div
        className={cn(
          'relative rounded-2xl border p-5 transition-all duration-300',
          'bg-gradient-to-br',
          displayGradient,
          displayBorder,
          'hover:scale-[1.01] hover:shadow-lg hover:shadow-mystic-500/10'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center shrink-0">
            {displayIcon}
          </div>
          <h3 className="text-base font-semibold text-mystic-100">
            {displayTitle}
          </h3>
        </div>

        {/* Content */}
        <p className="text-sm leading-relaxed text-mystic-200/90 whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </motion.div>
  )
}
