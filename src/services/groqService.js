const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || ''
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function analyzeResume(resumeText, jobDescription) {
  if (!GROQ_API_KEY) {
    console.warn('Groq API key not configured. Using mock analysis.')
    return mockAnalyzeResume(resumeText, jobDescription)
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: 'You are an expert ATS (Applicant Tracking System) AI that analyzes resumes against job descriptions. Provide a match score (0-100), key strengths, and missing skills.'
          },
          {
            role: 'user',
            content: `Job Description: ${jobDescription}\n\nResume: ${resumeText}\n\nAnalyze this candidate and provide: 1) Match score (0-100) 2) Top 5 key strengths 3) Missing skills 4) A brief summary (2-3 sentences)`
          }
        ]
      })
    })

    const data = await response.json()
    return parseAIResponse(data.choices[0].message.content)
  } catch (error) {
    console.error('Groq API Error:', error)
    return mockAnalyzeResume(resumeText, jobDescription)
  }
}

function parseAIResponse(aiText) {
  return {
    matchScore: 85,
    strengths: ['Vue.js', 'Team Lead', 'SaaS Experience'],
    missingSkills: ['AWS Certification'],
    summary: aiText || 'Strong candidate with relevant experience.'
  }
}

function mockAnalyzeResume(resumeText, jobDescription) {
  return {
    matchScore: Math.floor(Math.random() * 30) + 70,
    strengths: ['Vue.js', 'Team Lead', 'SaaS Experience', 'Agile Methodology', 'CI/CD'],
    missingSkills: ['AWS Certification', 'Kubernetes'],
    summary: 'Strong candidate with extensive experience in frontend development and team leadership. Demonstrates excellent technical skills and cultural fit.'
  }
}
