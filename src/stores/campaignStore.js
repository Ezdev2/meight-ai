import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCampaignStore = defineStore('campaign', () => {
  const campaigns = ref([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      description: 'We are looking for a Vue.js expert with 5+ years of experience in SaaS. Must have strong leadership skills and experience building scalable web applications.',
      status: 'active',
      candidateCount: 12,
      topMatchScore: 92,
      createdAt: '2024-01-10',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      id: '2',
      title: 'Product Designer',
      department: 'Design',
      description: 'Seeking a creative product designer with expertise in user research and interface design. Experience with design systems and Figma required.',
      status: 'active',
      candidateCount: 8,
      topMatchScore: 88,
      createdAt: '2024-01-08',
      location: 'New York, NY',
      type: 'Full-time'
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      description: 'Looking for a DevOps engineer with strong AWS and Kubernetes experience. Must be comfortable with CI/CD pipelines and infrastructure as code.',
      status: 'draft',
      candidateCount: 3,
      topMatchScore: 75,
      createdAt: '2024-01-12',
      location: 'San Francisco, CA',
      type: 'Full-time'
    },
    {
      id: '4',
      title: 'Full Stack Developer',
      department: 'Engineering',
      description: 'We need a versatile full-stack developer comfortable with both frontend and backend technologies. Experience with Node.js and React/Vue preferred.',
      status: 'active',
      candidateCount: 15,
      topMatchScore: 85,
      createdAt: '2024-01-05',
      location: 'Remote',
      type: 'Contract'
    }
  ])

  const currentRecruiterId = ref('recruiter-001')

  const activeCampaigns = computed(() => {
    return campaigns.value.filter(c => c.status === 'active')
  })

  const draftCampaigns = computed(() => {
    return campaigns.value.filter(c => c.status === 'draft')
  })

  function getCampaignById(id) {
    return campaigns.value.find(c => c.id === id)
  }

  function createCampaign(campaign) {
    const newCampaign = {
      id: String(campaigns.value.length + 1),
      ...campaign,
      candidateCount: 0,
      topMatchScore: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    campaigns.value.push(newCampaign)
    return newCampaign
  }

  function updateCampaign(id, updates) {
    const index = campaigns.value.findIndex(c => c.id === id)
    if (index !== -1) {
      campaigns.value[index] = { ...campaigns.value[index], ...updates }
    }
  }

  return {
    campaigns,
    currentRecruiterId,
    activeCampaigns,
    draftCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaign
  }
})
