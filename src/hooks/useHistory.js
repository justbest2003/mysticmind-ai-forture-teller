import { useState, useEffect, useCallback } from 'react'
import { getFortuneHistory } from '@/services/firebase'
import { useAuth } from '@/context/AuthContext'

// Custom hook for fetching fortune history from Firestore
// Only fetches history for the currently logged-in user
export function useHistory() {
  const { user } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHistory = useCallback(async () => {
    // If not logged in, don't fetch anything
    if (!user) {
      setHistory([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      // Always filter by current user's ID
      const data = await getFortuneHistory(user.uid)
      setHistory(data)
    } catch (err) {
      console.error('Error fetching history:', err)
      setError('ไม่สามารถโหลดประวัติได้ กรุณาลองใหม่')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  return {
    history,
    loading,
    error,
    refetch: fetchHistory,
  }
}
