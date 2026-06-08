import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-mystic-700/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-mystic-400 text-sm">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>MysticMind - ดูดวงด้วยปัญญาประดิษฐ์</span>
          </div>
          <p className="text-mystic-500 text-xs">
            คำทำนายเป็นเพียงความบันเทิง ไม่ควรใช้ในการตัดสินใจสำคัญ
          </p>
        </div>
      </div>
    </footer>
  )
}
