import { LogIn, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

export function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth()

  if (loading) {
    return (
      <div className="w-9 h-9 rounded-full bg-mystic-800/50 animate-pulse" />
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-8 h-8 rounded-full border-2 border-mystic-500/50"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-mystic-700 flex items-center justify-center">
              <User className="w-4 h-4 text-mystic-300" />
            </div>
          )}
          <span className="text-sm text-mystic-300 max-w-[120px] truncate">
            {user.displayName || user.email}
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={signOut} title="ออกจากระบบ">
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={signIn} className="gap-2">
      <LogIn className="w-4 h-4" />
      <span className="hidden sm:inline">เข้าสู่ระบบ</span>
    </Button>
  )
}
