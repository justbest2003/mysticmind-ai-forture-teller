import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { History, ChevronDown, ChevronUp, RefreshCw, Loader2, Inbox, Sparkles, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { FortuneCard } from '@/components/fortune/FortuneCard'
import { useHistory } from '@/hooks/useHistory'
import { useAuth } from '@/context/AuthContext'
import { signInWithGoogle } from '@/services/firebase'
import { formatDateTime } from '@/lib/utils'

function HistoryItem({ item }) {
  const [expanded, setExpanded] = useState(false)

  const isWarning = !item.response?.career && !item.response?.finance && !item.response?.relationship && !item.response?.advice;
  const displayName = isWarning ? 'ผู้ถาม (ถูกระงับข้อความ)' : item.name;
  const displayQuestion = isWarning ? 'คำถามถูกระงับเนื่องจากละเมิดกฎของระบบ' : item.question;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 cursor-pointer transition-all duration-300 hover:border-mystic-600/30"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-mystic-100 truncate">
              คุณ {displayName}
            </h3>
          </div>
          <p className="text-sm text-mystic-300 line-clamp-2 mb-2">
            {displayQuestion}
          </p>
          {item.response?.summary && (
            <p className="text-xs text-mystic-400 line-clamp-1">
              <span className="flex items-start gap-1"><Sparkles className="w-3 h-3 shrink-0 mt-0.5 text-gold-400" /> <span>{item.response.summary}</span></span>
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xs text-mystic-500">
            {formatDateTime(item.createdAt)}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-mystic-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-mystic-400" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && item.response && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-mystic-700/20 space-y-3" onClick={(e) => e.stopPropagation()}>
              {['summary', 'career', 'finance', 'relationship', 'advice'].map((type, index) => {
                const isWarning = type === 'summary' && !item.response.career && !item.response.finance && !item.response.relationship && !item.response.advice;
                return item.response[type] && (
                  <FortuneCard
                    key={type}
                    type={type}
                    content={item.response[type]}
                    index={index}
                    isWarning={isWarning}
                  />
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function HistoryPage() {
  const { user } = useAuth()
  const { history, loading, error, refetch } = useHistory()

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-mystic-800/50 mb-2">
            <History className="w-8 h-8 text-mystic-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text">ประวัติการดูดวง</h1>
          <p className="text-mystic-400 text-sm">กรุณาเข้าสู่ระบบเพื่อดูประวัติคำทำนายของคุณ</p>
        </motion.div>
        <div className="flex justify-center">
          <Button onClick={signInWithGoogle} className="gap-2">
            <LogIn className="w-4 h-4" />
            เข้าสู่ระบบด้วย Google
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-mystic-800/50 mb-2">
          <History className="w-8 h-8 text-mystic-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text">ประวัติการดูดวง</h1>
        <p className="text-mystic-400 text-sm">ดูคำทำนายที่ผ่านมาทั้งหมดของคุณ</p>
      </motion.div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          disabled={loading}
          className="gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          รีเฟรช
        </Button>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto space-y-4">
        {loading && !history.length ? (
          // Loading Skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card p-5 space-y-3">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))
        ) : error ? (
          // Error State
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <Button variant="outline" size="sm" onClick={refetch}>
              ลองใหม่
            </Button>
          </div>
        ) : history.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Inbox className="w-16 h-16 text-mystic-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-mystic-300 mb-2">ยังไม่มีประวัติ</h3>
            <p className="text-mystic-500 text-sm">
              ลองถามคำถามดูดวงสักข้อ แล้วกลับมาดูประวัติได้ที่นี่
            </p>
          </motion.div>
        ) : (
          // History List
          history.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  )
}
