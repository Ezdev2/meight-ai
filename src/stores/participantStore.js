import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useParticipantStore = defineStore('participant', () => {
  const participants = ref([
    {
      id: '1',
      campaignId: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      linkedin: 'https://linkedin.com/in/jeandupont',
      avatar: null,
      experience: '7 Years',
      currentPosition: 'Senior Frontend Developer',
      currentCompany: 'TechCorp',
      location: 'Paris, France',
      matchScore: 88,
      status: 'Interview Scheduled',
      appliedAt: '2024-01-11',
      aiSummary: 'Jean is a strong technical lead with deep expertise in the Vue ecosystem. He matches the seniority requirement perfectly but lacks recent AWS certification.',
      strengths: ['Vue.js', 'Team Lead', 'SaaS Experience', 'Agile Methodology', 'Mentorship'],
      missingSkills: ['AWS Certification'],
      resumeUrl: null
    },
    {
      id: '2',
      campaignId: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+1 415 555 0123',
      linkedin: 'https://linkedin.com/in/sarahchen',
      avatar: null,
      experience: '5 Years',
      currentPosition: 'Frontend Engineer',
      currentCompany: 'StartupXYZ',
      location: 'San Francisco, CA',
      matchScore: 92,
      status: 'New Application',
      appliedAt: '2024-01-12',
      aiSummary: 'Sarah is an exceptional Vue.js developer with a strong portfolio of SaaS products. Her technical skills are outstanding and she has experience scaling applications to millions of users.',
      strengths: ['Vue.js', 'TypeScript', 'Performance Optimization', 'Testing', 'UI/UX'],
      missingSkills: [],
      resumeUrl: null
    },
    {
      id: '3',
      campaignId: '1',
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      phone: '+44 20 7123 4567',
      linkedin: 'https://linkedin.com/in/marcusjohnson',
      avatar: null,
      experience: '6 Years',
      currentPosition: 'Lead Frontend Developer',
      currentCompany: 'Digital Solutions Ltd',
      location: 'London, UK',
      matchScore: 85,
      status: 'Under Review',
      appliedAt: '2024-01-10',
      aiSummary: 'Marcus brings solid Vue.js experience and has led multiple successful projects. He demonstrates strong architectural thinking and has experience with large-scale applications.',
      strengths: ['Vue.js', 'Architecture Design', 'Code Review', 'CI/CD', 'Documentation'],
      missingSkills: ['Pinia', 'Vite'],
      resumeUrl: null
    },
    {
      id: '4',
      campaignId: '1',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '+1 305 555 0198',
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      avatar: null,
      experience: '8 Years',
      currentPosition: 'Senior Software Engineer',
      currentCompany: 'MegaCorp',
      location: 'Miami, FL',
      matchScore: 79,
      status: 'New Application',
      appliedAt: '2024-01-09',
      aiSummary: 'Emily has extensive frontend experience but primarily with React. Her willingness to transition to Vue.js and strong fundamental skills make her a viable candidate with some training.',
      strengths: ['React', 'JavaScript', 'Team Collaboration', 'Problem Solving', 'Accessibility'],
      missingSkills: ['Vue.js', 'Vue Ecosystem'],
      resumeUrl: null
    },
    {
      id: '5',
      campaignId: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+971 50 123 4567',
      linkedin: 'https://linkedin.com/in/ahmedhassan',
      avatar: null,
      experience: '9 Years',
      currentPosition: 'Engineering Manager',
      currentCompany: 'Tech Innovations',
      location: 'Dubai, UAE',
      matchScore: 90,
      status: 'Interview Scheduled',
      appliedAt: '2024-01-08',
      aiSummary: 'Ahmed combines technical excellence with leadership experience. He has built and led frontend teams and has deep expertise in Vue.js and modern development practices.',
      strengths: ['Vue.js', 'Team Management', 'System Design', 'Microservices', 'Stakeholder Communication'],
      missingSkills: [],
      resumeUrl: null
    },
    {
      id: '6',
      campaignId: '2',
      name: 'Olivia Martinez',
      email: 'olivia.m@email.com',
      phone: '+1 212 555 0147',
      linkedin: 'https://linkedin.com/in/oliviamartinez',
      avatar: null,
      experience: '4 Years',
      currentPosition: 'Product Designer',
      currentCompany: 'Creative Studio',
      location: 'New York, NY',
      matchScore: 88,
      status: 'New Application',
      appliedAt: '2024-01-11',
      aiSummary: 'Olivia has a strong portfolio showcasing user-centered design and extensive experience with design systems. Her Figma expertise and research skills are exceptional.',
      strengths: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Interaction Design'],
      missingSkills: ['Motion Design'],
      resumeUrl: null
    }
  ])

  function getParticipantsByCampaign(campaignId) {
    return participants.value.filter(p => p.campaignId === campaignId)
  }

  function getParticipantById(id) {
    return participants.value.find(p => p.id === id)
  }

  function updateParticipantStatus(id, status) {
    const participant = participants.value.find(p => p.id === id)
    if (participant) {
      participant.status = status
    }
  }

  function getTopMatchForCampaign(campaignId) {
    const campaignParticipants = getParticipantsByCampaign(campaignId)
    if (campaignParticipants.length === 0) return null
    return campaignParticipants.reduce((top, current) =>
      current.matchScore > top.matchScore ? current : top
    )
  }

  return {
    participants,
    getParticipantsByCampaign,
    getParticipantById,
    updateParticipantStatus,
    getTopMatchForCampaign
  }
})
