import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildFortunePrompt } from '@/lib/prompts'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: 'gemini-flash-lite-latest',
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
  },
})


// Generate fortune prediction (non-streaming)
export async function generateFortune(name, dateOfBirth, question) {
  const prompt = buildFortunePrompt(name, dateOfBirth, question)
  const result = await model.generateContent(prompt)
  const response = result.response
  const text = response.text()
  return parseFortuneResponse(text)
}

// Generate fortune prediction with streaming
export async function generateFortuneStream(name, dateOfBirth, question, onChunk) {
  const prompt = buildFortunePrompt(name, dateOfBirth, question)
  const result = await model.generateContentStream(prompt)

  let fullText = ''

  for await (const chunk of result.stream) {
    const chunkText = chunk.text()
    fullText += chunkText
    onChunk(fullText)
  }

  return parseFortuneResponse(fullText)
}


// Parse AI response JSON into structured fortune data
function parseFortuneResponse(text) {
  try {
    // Clean up potential markdown code block markers
    let cleaned = text.trim()
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7)
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3)
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3)
    }
    cleaned = cleaned.trim()

    const parsed = JSON.parse(cleaned)
    return {
      summary: parsed.summary || '',
      career: parsed.career || '',
      finance: parsed.finance || '',
      relationship: parsed.relationship || '',
      advice: parsed.advice || '',
      raw: text,
    }
  } catch (error) {
    console.error('Failed to parse AI response:', error)
    // Fallback: return raw text as summary
    return {
      summary: text,
      career: '',
      finance: '',
      relationship: '',
      advice: '',
      raw: text,
    }
  }
}
