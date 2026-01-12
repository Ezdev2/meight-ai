<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, Mail, Phone, Linkedin, MapPin, Briefcase, Award, AlertCircle, CheckCircle2 } from 'lucide-vue-next'
import DashboardSidebar from '../components/DashboardSidebar.vue'
import ScoreCircle from '../components/ScoreCircle.vue'
import StatusBadge from '../components/StatusBadge.vue'
import BaseButton from '../components/BaseButton.vue'
import { useParticipantStore } from '../stores/participantStore'
import { useCampaignStore } from '../stores/campaignStore'

const route = useRoute()
const router = useRouter()

const participantStore = useParticipantStore()
const campaignStore = useCampaignStore()

const candidate = computed(() => participantStore.getParticipantById(route.params.id))
const campaign = computed(() => {
  if (!candidate.value) return null
  return campaignStore.getCampaignById(candidate.value.campaignId)
})

const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const goBack = () => {
  if (candidate.value) {
    router.push(`/campaign/${candidate.value.campaignId}`)
  } else {
    router.push('/dashboard')
  }
}

const updateStatus = (newStatus) => {
  if (candidate.value) {
    participantStore.updateParticipantStatus(candidate.value.id, newStatus)
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-50">
    <DashboardSidebar />

    <div class="flex-1">
      <div class="p-8">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ChevronLeft :size="20" />
          <span class="text-sm font-medium">Back to Campaign</span>
        </button>

        <div v-if="candidate" class="max-w-5xl">
          <div class="card p-8 mb-6">
            <div class="flex items-start gap-6">
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                {{ getInitials(candidate.name) }}
              </div>

              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h1 class="text-3xl font-bold text-slate-900 mb-2">{{ candidate.name }}</h1>
                    <p class="text-lg text-slate-700 mb-1">{{ candidate.currentPosition }}</p>
                    <p class="text-slate-600">{{ candidate.currentCompany }}</p>
                  </div>
                  <StatusBadge :status="candidate.status" />
                </div>

                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="flex items-center gap-2 text-slate-600">
                    <Mail :size="16" />
                    <a :href="`mailto:${candidate.email}`" class="hover:text-blue-600">
                      {{ candidate.email }}
                    </a>
                  </div>
                  <div class="flex items-center gap-2 text-slate-600">
                    <Phone :size="16" />
                    <span>{{ candidate.phone }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-slate-600">
                    <MapPin :size="16" />
                    <span>{{ candidate.location }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-slate-600">
                    <Linkedin :size="16" />
                    <a :href="candidate.linkedin" target="_blank" class="hover:text-blue-600">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>

                <div class="flex items-center gap-2 mt-4">
                  <Briefcase :size="16" class="text-slate-500" />
                  <span class="text-sm text-slate-600">{{ candidate.experience }} of experience</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6 mb-6">
            <div class="card p-6 text-center">
              <div class="flex justify-center mb-4">
                <ScoreCircle :score="candidate.matchScore" size="lg" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900 mb-1">AI Match Score</h3>
              <p class="text-sm text-slate-600">Overall compatibility</p>
            </div>

            <div class="card p-6">
              <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                <CheckCircle2 :size="24" class="text-green-600" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900 mb-1">Key Strengths</h3>
              <p class="text-2xl font-bold text-slate-900">{{ candidate.strengths.length }}</p>
            </div>

            <div class="card p-6">
              <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                <AlertCircle :size="24" class="text-red-600" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900 mb-1">Missing Skills</h3>
              <p class="text-2xl font-bold text-slate-900">{{ candidate.missingSkills.length }}</p>
            </div>
          </div>

          <div class="card p-8 mb-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Award :size="20" class="text-blue-600" />
              </div>
              <h2 class="text-2xl font-bold text-slate-900">AI Analysis</h2>
            </div>

            <div class="bg-blue-50 rounded-2xl p-6 mb-6">
              <h3 class="text-sm font-semibold text-blue-900 mb-3">AI Summary</h3>
              <p class="text-slate-800 leading-relaxed">{{ candidate.aiSummary }}</p>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 :size="20" class="text-green-600" />
                  Key Strengths
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="strength in candidate.strengths"
                    :key="strength"
                    class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200"
                  >
                    {{ strength }}
                  </span>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <AlertCircle :size="20" class="text-red-600" />
                  Missing Skills
                </h3>
                <div v-if="candidate.missingSkills.length === 0" class="text-green-600 font-medium">
                  No missing skills identified
                </div>
                <div v-else class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in candidate.missingSkills"
                    :key="skill"
                    class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-200"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="card p-8">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Update Status</h2>
            <div class="flex flex-wrap gap-3">
              <BaseButton
                variant="outline"
                @click="updateStatus('New Application')"
              >
                New Application
              </BaseButton>
              <BaseButton
                variant="outline"
                @click="updateStatus('Under Review')"
              >
                Under Review
              </BaseButton>
              <BaseButton
                variant="primary"
                @click="updateStatus('Interview Scheduled')"
              >
                Schedule Interview
              </BaseButton>
              <BaseButton
                variant="secondary"
                @click="updateStatus('Rejected')"
              >
                Reject
              </BaseButton>
            </div>
          </div>
        </div>

        <div v-else class="card p-12 text-center">
          <h2 class="text-xl font-bold text-slate-900 mb-2">Candidate not found</h2>
          <p class="text-slate-600 mb-6">The candidate you're looking for doesn't exist</p>
          <BaseButton @click="router.push('/dashboard')">
            Go to Dashboard
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
