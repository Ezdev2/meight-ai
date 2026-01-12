<script setup>
import { Users, Briefcase } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  campaign: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const goToCampaign = () => {
  router.push(`/campaign/${props.campaign.id}`)
}
</script>

<template>
  <div
    class="card p-6 hover:shadow-md transition-shadow cursor-pointer"
    @click="goToCampaign"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="text-xl font-semibold text-slate-900 mb-2">{{ campaign.title }}</h3>
        <div class="flex items-center gap-2 text-sm text-slate-600 mb-1">
          <Briefcase :size="16" />
          <span>{{ campaign.department }}</span>
        </div>
        <p class="text-sm text-slate-500">{{ campaign.location }} • {{ campaign.type }}</p>
      </div>
      <StatusBadge :status="campaign.status" />
    </div>

    <p class="text-sm text-slate-600 mb-4 line-clamp-2">
      {{ campaign.description }}
    </p>

    <div class="flex items-center justify-between pt-4 border-t border-slate-100">
      <div class="flex items-center gap-2 text-slate-700">
        <Users :size="18" />
        <span class="text-sm font-medium">{{ campaign.candidateCount }} Candidates</span>
      </div>
      <div v-if="campaign.topMatchScore > 0" class="text-sm">
        <span class="text-slate-500">Top Match:</span>
        <span class="font-semibold text-green-600 ml-1">{{ campaign.topMatchScore }}%</span>
      </div>
    </div>
  </div>
</template>
