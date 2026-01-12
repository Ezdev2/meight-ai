<script setup>
import { ref, computed } from 'vue'
import { Plus, Briefcase, TrendingUp, Menu, Brain } from 'lucide-vue-next'
import DashboardSidebar from '../components/DashboardSidebar.vue'
import CampaignCard from '../components/CampaignCard.vue'
import CreateCampaignModal from '../components/CreateCampaignModal.vue'
import BaseButton from '../components/BaseButton.vue'
import { useCampaignStore } from '../stores/campaignStore'
import { useParticipantStore } from '../stores/participantStore'

const campaignStore = useCampaignStore()
const participantStore = useParticipantStore()

const isSidebarOpen = ref(false)
const showCreateModal = ref(false)
const filterStatus = ref('all')

const filteredCampaigns = computed(() => {
  if (filterStatus.value === 'all') return campaignStore.campaigns
  if (filterStatus.value === 'active') return campaignStore.activeCampaigns
  if (filterStatus.value === 'draft') return campaignStore.draftCampaigns
  return campaignStore.campaigns
})

const stats = computed(() => {
  const totalCandidates = participantStore.participants.length
  const activeCampaignsCount = campaignStore.activeCampaigns.length
  const avgMatchScore = participantStore.participants.length > 0
    ? Math.round(
      participantStore.participants.reduce((sum, p) => sum + p.matchScore, 0) /
      participantStore.participants.length
    )
    : 0

  return {
    totalCampaigns: campaignStore.campaigns.length,
    activeCampaigns: activeCampaignsCount,
    totalCandidates,
    avgMatchScore
  }
})
</script>

<template>
  <div class="flex min-h-screen bg-slate-50">
    <DashboardSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="flex-1 flex flex-col min-w-0">
      <header class="md:hidden fixed w-full flex items-center justify-between bg-slate-900 px-6 py-4 border-slate-200">
        <a href="/" class="flex items-center gap-3">
          <div class="w-10 h-10 text-white rounded-xl bg-blue-600 flex items-center justify-center">
            <Brain :size="24" />
          </div>
          <div>
            <h1 class="text-xl text-white font-bold">MEIGHT</h1>
            <p class="text-xs text-slate-400">Recrutement IA</p>
          </div>
        </a>
        <button @click="isSidebarOpen = true" class="p-2 text-slate-600">
          <Menu :size="24" />
        </button>
      </header>
      <div class="p-8 mt-16 md:mt-0">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p class="text-slate-600">Manage your recruitment campaigns and track candidate progress</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-slate-600">Total Campaigns</p>
              <Briefcase :size="20" class="text-blue-600" />
            </div>
            <p class="text-3xl font-bold text-slate-900">{{ stats.totalCampaigns }}</p>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-slate-600">Active Campaigns</p>
              <TrendingUp :size="20" class="text-green-600" />
            </div>
            <p class="text-3xl font-bold text-slate-900">{{ stats.activeCampaigns }}</p>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-slate-600">Total Candidates</p>
              <TrendingUp :size="20" class="text-purple-600" />
            </div>
            <p class="text-3xl font-bold text-slate-900">{{ stats.totalCandidates }}</p>
          </div>

          <div class="card p-6">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-slate-600">Avg Match Score</p>
              <TrendingUp :size="20" class="text-orange-600" />
            </div>
            <p class="text-3xl font-bold text-slate-900">{{ stats.avgMatchScore }}%</p>
          </div>
        </div>

        <div class="flex items-start md:items-center justify-between mb-6">
          <div class="flex md:flex-row flex-col items-start md:items-center gap-3">
            <h2 class="text-xl font-bold text-slate-900">Campaigns</h2>
            <div class="flex gap-2">
              <button @click="filterStatus = 'all'" :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              ]">
                All
              </button>
              <button @click="filterStatus = 'active'" :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                filterStatus === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              ]">
                Active
              </button>
              <button @click="filterStatus = 'draft'" :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                filterStatus === 'draft'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              ]">
                Draft
              </button>
            </div>
          </div>

          <BaseButton @click="showCreateModal = true">
            <Plus :size="20" />
            <span class="hidden md:inline">Créer une Campagne</span>
          </BaseButton>
        </div>

        <div v-if="filteredCampaigns.length === 0" class="card p-12 text-center">
          <Briefcase :size="48" class="text-slate-300 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-slate-900 mb-2">No campaigns found</h3>
          <p class="text-slate-600 mb-6">Get started by creating your first campaign</p>
          <BaseButton @click="showCreateModal = true">
            <Plus :size="20" />
            Create Campaign
          </BaseButton>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CampaignCard v-for="campaign in filteredCampaigns" :key="campaign.id" :campaign="campaign" />
        </div>
      </div>
    </div>

    <CreateCampaignModal v-if="showCreateModal" @close="showCreateModal = false" />
  </div>
</template>
