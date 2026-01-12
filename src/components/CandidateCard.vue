<script setup>
import { MapPin, Mail, ExternalLink } from 'lucide-vue-next'
import ScoreCircle from './ScoreCircle.vue'
import StatusBadge from './StatusBadge.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  candidate: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const viewCandidate = () => {
  router.push(`/candidate/${props.candidate.id}`)
}
</script>

<template>
  <div
    class="card p-5 hover:shadow-md transition-shadow cursor-pointer"
    @click="viewCandidate"
  >
    <div class="flex items-start gap-4 mb-4">
      <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
        {{ getInitials(candidate.name) }}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-slate-900 mb-1">{{ candidate.name }}</h3>
        <p class="text-sm text-slate-600 mb-1">{{ candidate.currentPosition }}</p>
        <p class="text-xs text-slate-500">{{ candidate.currentCompany }}</p>
      </div>
      <ScoreCircle :score="candidate.matchScore" size="sm" />
    </div>

    <div class="mb-4 pb-4 border-b border-slate-100">
      <p class="text-sm text-slate-700 line-clamp-2">
        {{ candidate.aiSummary }}
      </p>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-slate-500 text-xs">
        <MapPin :size="14" />
        <span>{{ candidate.location }}</span>
      </div>
      <StatusBadge :status="candidate.status" />
    </div>

    <div class="mt-3 flex flex-wrap gap-1.5">
      <span
        v-for="strength in candidate.strengths.slice(0, 3)"
        :key="strength"
        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
      >
        {{ strength }}
      </span>
      <span
        v-if="candidate.strengths.length > 3"
        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
      >
        +{{ candidate.strengths.length - 3 }} more
      </span>
    </div>
  </div>
</template>
