<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, Users, Award, MapPin, Briefcase, Plus } from 'lucide-vue-next'
import DashboardSidebar from '../components/DashboardSidebar.vue'
import CandidateCard from '../components/CandidateCard.vue'
import StatusBadge from '../components/StatusBadge.vue'
import BaseButton from '../components/BaseButton.vue'
import AddCandidateModal from '../components/AddCandidateModal.vue'
import { useCampaignStore } from '../stores/campaignStore'
import { useParticipantStore } from '../stores/participantStore'

const route = useRoute()
const router = useRouter()

const campaignStore = useCampaignStore()
const participantStore = useParticipantStore()

const campaign = computed(() => campaignStore.getCampaignById(route.params.id))
const candidates = computed(() => participantStore.getParticipantsByCampaign(route.params.id))
const topMatch = computed(() => participantStore.getTopMatchForCampaign(route.params.id))

// State for Modal
const isAddModalOpen = ref(false)
const isAnalyzing = ref(false)

const goBack = () => {
  router.push('/dashboard')
}


// Single CV Analysis
const handleAnalyzeSingle = async (file) => {
  isAnalyzing.value = true
  try {
    const newId = await participantStore.analyzeSingleCandidate(route.params.id, file)
    isAddModalOpen.value = false
    router.push(`/candidate/${newId}`)
  } catch (error) {
    console.error("AI Error", error)
  } finally {
    isAnalyzing.value = false
  }
}

// Batch Upload (Background process)
const handleUploadBatch = (files) => {
  participantStore.uploadBatchCandidates(route.params.id, files)
  isAddModalOpen.value = false
  alert("Import started! Candidates will appear in the list as they are processed.")
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-50">
    <DashboardSidebar />

    <div class="flex-1">
      <div class="p-8">
        <div class="mb-6">
          <button @click="goBack" class="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4">
            <ChevronLeft :size="20" />
            <span class="text-sm font-medium">Back to Dashboard</span>
          </button>

          <div v-if="campaign" class="card p-8">
            <div class="flex items-start justify-between mb-6">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <h1 class="text-3xl font-bold text-slate-900">{{ campaign.title }}</h1>
                  <StatusBadge :status="campaign.status" />
                </div>
                <div class="flex items-center gap-4 text-slate-600 mb-4">
                  <div class="flex items-center gap-2">
                    <Briefcase :size="18" />
                    <span>{{ campaign.department }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <MapPin :size="18" />
                    <span>{{ campaign.location }}</span>
                  </div>
                  <span class="text-slate-400">•</span>
                  <span>{{ campaign.type }}</span>
                </div>
                <p class="text-slate-700 leading-relaxed">{{ campaign.description }}</p>
              </div>

              <BaseButton variant="primary" class="flex items-center gap-2" @click="isAddModalOpen = true">
                <Plus :size="20" />
                Add Candidates
              </BaseButton>
            </div>

            <div class="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Users :size="24" class="text-blue-600" />
                </div>
                <div>
                  <p class="text-sm text-slate-600">Total Candidates</p>
                  <p class="text-2xl font-bold text-slate-900">{{ candidates.length }}</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Award :size="24" class="text-green-600" />
                </div>
                <div>
                  <p class="text-sm text-slate-600">Top Match Score</p>
                  <p class="text-2xl font-bold text-green-600">
                    {{ topMatch ? `${topMatch.matchScore}%` : 'N/A' }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Users :size="24" class="text-purple-600" />
                </div>
                <div>
                  <p class="text-sm text-slate-600">Interviews</p>
                  <p class="text-2xl font-bold text-slate-900">
                    {{candidates.filter(c => c.status === 'Interview Scheduled').length}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">Candidates</h2>

          <div v-if="candidates.length === 0" class="card p-12 text-center">
            <Users :size="48" class="text-slate-300 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-slate-900 mb-2">No candidates yet</h3>
            <p class="text-slate-600 mb-6">Candidates will appear here once they apply to this position</p>
            <BaseButton variant="outline" @click="isAddModalOpen = true">
              Add First Candidate
            </BaseButton>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CandidateCard v-for="candidate in candidates" :key="candidate.id" :candidate="candidate" />
          </div>
        </div>
      </div>
    </div>

    <AddCandidateModal 
      :is-open="isAddModalOpen" 
      :is-processing="isAnalyzing" 
      @close="isAddModalOpen = false"
      @analyze-single="handleAnalyzeSingle" 
      @upload-batch="handleUploadBatch" 
    />
  </div>
</template>