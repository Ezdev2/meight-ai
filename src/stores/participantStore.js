import { defineStore } from 'pinia'
import { ref } from 'vue'
import { mockParticipants } from '../data/mockParticipants'

export const useParticipantStore = defineStore('participant', () => {
  // --- STATE ---
  const participants = ref([...mockParticipants]) 
  const isLoading = ref(false)
  const error = ref(null)

  // --- GETTERS ---
  const getParticipantsByCampaign = (campaignId) => {
    return participants.value
      .filter(p => p.campaignId === campaignId)
      .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
  }

  const getParticipantById = (id) => {
    return participants.value.find(p => p.id === id)
  }

  const getTopMatchForCampaign = (campaignId) => {
    const campaignParticipants = getParticipantsByCampaign(campaignId)
    if (campaignParticipants.length === 0) return null
    return campaignParticipants.reduce((top, current) =>
      current.matchScore > top.matchScore ? current : top
    )
  }

  // --- ACTIONS ---

  // 1. Update Status (ADDED THIS MISSING FUNCTION)
  function updateParticipantStatus(id, status) {
    const participant = participants.value.find(p => p.id === id)
    if (participant) {
      participant.status = status
      // In a real app, you would add an API call here:
      // api.patch(`/participants/${id}`, { status })
    }
  }

  // SIMULATEUR D'EXTRACTION IA
  const _generateMockProfile = (fileOrData, campaignId) => {
    const isFile = fileOrData instanceof File
    const rawName = isFile ? fileOrData.name.split('.')[0].replace(/[-_]/g, ' ') : fileOrData.name
    const score = Math.floor(Math.random() * (98 - 60) + 60)
    const isHighMatch = score > 85

    // Générateur de fausses dates pour la cohérence
    const currentYear = new Date().getFullYear()

    return {
      id: Math.random().toString(36).substr(2, 9),
      campaignId: campaignId,
      
      // --- HEADER INFO ---
      name: rawName,
      email: isFile ? `${rawName.toLowerCase().replace(/\s+/g, '.')}@email.com` : fileOrData.email,
      phone: "+33 6 12 34 56 78",
      location: "Paris, France",
      linkedin: "#",
      currentPosition: isFile ? "Senior Developer (Extracted)" : fileOrData.position,
      currentCompany: "Tech Solutions Inc.",
      experience: `${Math.floor(Math.random() * 8) + 2} ans`,
      
      // --- EXTRACTION CV (RAW DATA) ---
      // 1. Expériences Professionnelles (Liste)
      experiences: [
        {
          id: 1,
          role: isFile ? "Senior Developer (Extracted)" : fileOrData.position,
          company: "Tech Solutions Inc.",
          date: `${currentYear - 2} - Aujourd'hui`,
          description: "Développement de l'architecture front-end, mentoring de 3 juniors, migration vers Vue 3."
        },
        {
          id: 2,
          role: "Frontend Developer",
          company: "WebAgency Paris",
          date: `${currentYear - 5} - ${currentYear - 2}`,
          description: "Intégration de maquettes, développement de composants réutilisables, optimisation SEO."
        },
        {
          id: 3,
          role: "Junior Web Dev",
          company: "StartUp Nation",
          date: `${currentYear - 6} - ${currentYear - 5}`,
          description: "Maintenance du site vitrine, correction de bugs, mise en place de newsletters."
        }
      ],

      // 2. Education (Liste)
      educations: [
        {
          id: 1,
          degree: "Master Ingénierie Web",
          school: "École Supérieure du Digital",
          date: `${currentYear - 6}`
        },
        {
          id: 2,
          degree: "Licence Informatique",
          school: "Université de Paris",
          date: `${currentYear - 8}`
        }
      ],

      // 3. Autres Compétences (Secondaires)
      otherSkills: ["Anglais (C1)", "Jira", "Notion", "Méthode Agile/Scrum", "Adobe XD"],

      // --- ANALYSE IA ---
      matchScore: score,
      status: "New Application",
      aiSummary: `Analyse IA : Profil cohérent avec ${Math.floor(Math.random() * 8) + 2} ans d'expérience. La progression de carrière est logique.`,
      strengths: isHighMatch ? ["Vue.js Expert", "Architecture", "Mentoring"] : ["JavaScript", "HTML/CSS", "Git"],
      missingSkills: isHighMatch ? [] : ["AWS Certification", "GraphQL"],
      
      appliedAt: new Date().toISOString()
    }
  }

  // Action: Add Single Candidate
  async function analyzeSingleCandidate(campaignId, file) {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Délai IA
      const newProfile = _generateMockProfile(file, campaignId)
      participants.value.unshift(newProfile)
      return newProfile.id
    } finally {
      isLoading.value = false
    }
  }

  // Action: Batch Upload
  function uploadBatchCandidates(campaignId, files) {
    files.forEach((file) => {
      const delay = Math.random() * 5000 + 1000 
      setTimeout(() => {
        const newProfile = _generateMockProfile(file, campaignId)
        participants.value.unshift(newProfile)
      }, delay)
    })
  }

  // Action: Manual Add
  async function addManualCandidate(campaignId, formData) {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      // On utilise le CV s'il est là, sinon les données manuelles
      const inputData = formData.cv ? formData.cv : formData
      const newProfile = _generateMockProfile(inputData, campaignId)
      
      // Si manuel, on écrase avec les données précises saisies
      if (!formData.cv) {
        newProfile.name = formData.name
        newProfile.email = formData.email
        newProfile.currentPosition = formData.position
      }
      
      participants.value.unshift(newProfile)
      return newProfile.id
    } finally {
      isLoading.value = false
    }
  }

  return {
    participants,
    isLoading,
    analyzeSingleCandidate,
    uploadBatchCandidates,
    addManualCandidate,
    getParticipantById,
    getParticipantsByCampaign,
    getTopMatchForCampaign,
    updateParticipantStatus
  }
})