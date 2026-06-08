import { useState, useCallback } from 'react'
import { generateFortuneStream } from '@/services/gemini'
import { saveFortune } from '@/services/firebase'
import { useAuth } from '@/context/AuthContext'


// Custom hook for fortune telling logic with streaming support
// States: idle - loading - streaming - complete | error
export function useFortuneQuery() {
  const { user } = useAuth()
  const [status, setStatus] = useState('idle') // idle | loading | streaming | complete | error
  const [streamingText, setStreamingText] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const askFortune = useCallback(async ({ name, dateOfBirth, question }) => {
    setStatus('loading')
    setStreamingText('')
    setResult(null)
    setError(null)

    try {
      setStatus('streaming')

      const fortuneResult = await generateFortuneStream(
        name,
        dateOfBirth,
        question,
        (partialText) => {
          setStreamingText(partialText)
        }
      )

      setResult(fortuneResult)
      setStatus('complete')

      // Save to Firebase in background only if it's a valid fortune
      try {
        const isWarning = fortuneResult.summary && !fortuneResult.career && !fortuneResult.finance && !fortuneResult.relationship && !fortuneResult.advice;
        
        if (!isWarning) {
          await saveFortune({
            userId: user?.uid || null,
            name,
            dateOfBirth,
            question,
            response: fortuneResult,
          })
        }
      } catch (saveError) {
        console.error('Failed to save to Firebase:', saveError)
        // Don't fail the whole operation if save fails
      }

      return fortuneResult
    } catch (err) {
      console.error('Fortune query error:', err)
      setError(err.message || 'เกิดข้อผิดพลาดในการทำนาย กรุณาลองใหม่อีกครั้ง')
      setStatus('error')
      throw err
    }
  }, [user])

  const reset = useCallback(() => {
    setStatus('idle')
    setStreamingText('')
    setResult(null)
    setError(null)
  }, [])

  return {
    status,
    streamingText,
    result,
    error,
    askFortune,
    reset,
    isLoading: status === 'loading',
    isStreaming: status === 'streaming',
    isComplete: status === 'complete',
    isError: status === 'error',
  }
}
