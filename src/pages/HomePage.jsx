import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import magicBallImg from '@/assets/magic-ball.png'
import { FortuneForm } from '@/components/fortune/FortuneForm'
import { FortuneResult } from '@/components/fortune/FortuneResult'
import { useFortuneQuery } from '@/hooks/useFortuneQuery'

export function HomePage() {
  const {
    status,
    streamingText,
    result,
    error,
    askFortune,
    reset,
    isLoading,
    isStreaming,
  } = useFortuneQuery()

  const handleSubmit = async (data) => {
    await askFortune(data)
  }

  const showForm = status === 'idle' || status === 'error'

  return (
    <div className="py-8 space-y-10">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <motion.div
          className="flex justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={magicBallImg}
            alt="Magic Ball"
            className="w-16 h-16 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_15px_rgba(139,79,255,0.5)]"
          />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          <span className="shimmer-text">AI ดูดวง</span>
        </h1>
        <p className="text-mystic-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          เปิดม่านแห่งดวงชะตา ให้ปัญญาประดิษฐ์ทำนายอนาคตของคุณ
          <br />
          <span className="text-mystic-400 text-sm flex items-center justify-center gap-1 mt-2">กรอกข้อมูล แล้วปล่อยให้ดวงดาวนำทาง <Sparkles className="w-4 h-4" /></span>
        </p>
      </motion.div>

      {/* Fortune Form - show when idle or error */}
      {showForm && (
        <FortuneForm
          onSubmit={handleSubmit}
          isLoading={isLoading || isStreaming}
        />
      )}

      {/* Fortune Result */}
      <FortuneResult
        status={status}
        streamingText={streamingText}
        result={result}
        error={error}
        onReset={reset}
      />
    </div>
  )
}
