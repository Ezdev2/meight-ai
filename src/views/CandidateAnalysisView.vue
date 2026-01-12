<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  ChevronLeft, Mail, Phone, Linkedin, MapPin, Briefcase, Award, 
  AlertCircle, CheckCircle2, Sparkles, Building2, Calendar, 
  GraduationCap, Languages 
} from 'lucide-vue-next'
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

const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'XX'

const goBack = () => {
  if (candidate.value) {
    router.push(`/campaign/${candidate.value.campaignId}`)
  } else {
    router.push('/dashboard')
  }
}

const updateStatus = (newStatus) => {
  if (candidate.value) participantStore.updateParticipantStatus(candidate.value.id, newStatus)
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-50">
    <DashboardSidebar />

    <div class="flex-1">
      <div class="p-8">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ChevronLeft :size="20" />
          <span class="text-sm font-medium">Retour à la campagne</span>
        </button>

        <div v-if="candidate" class="max-w-5xl">
          
          <div class="card p-8 mb-6 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles :size="100" class="text-blue-600" />
            </div>

            <div class="flex items-start gap-6 relative z-10">
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 shadow-lg shadow-blue-200">
                {{ getInitials(candidate.name) }}
              </div>

              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h1 class="text-3xl font-bold text-slate-900 mb-2">{{ candidate.name }}</h1>
                    <div class="flex items-center gap-2 text-lg text-slate-700 mb-1">
                      <Briefcase :size="18" class="text-slate-400" />
                      <span class="font-medium">{{ candidate.currentPosition }}</span>
                      <span class="text-slate-400 mx-1">chez</span>
                      <span>{{ candidate.currentCompany }}</span>
                    </div>
                  </div>
                  <StatusBadge :status="candidate.status" />
                </div>

                <div class="grid grid-cols-2 gap-y-3 gap-x-8 text-sm border-t border-slate-100 pt-4 mt-4">
                  <div class="flex items-center gap-2 text-slate-600">
                    <Mail :size="16" class="text-slate-400" />
                    <a :href="`mailto:${candidate.email}`" class="hover:text-blue-600 transition-colors">
                      {{ candidate.email }}
                    </a>
                  </div>
                  <div class="flex items-center gap-2 text-slate-600">
                    <Phone :size="16" class="text-slate-400" />
                    <span>{{ candidate.phone }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-slate-600">
                    <MapPin :size="16" class="text-slate-400" />
                    <span>{{ candidate.location }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-slate-600">
                    <Linkedin :size="16" class="text-blue-600" />
                    <a :href="candidate.linkedin" target="_blank" class="hover:text-blue-800 transition-colors font-medium text-blue-600">
                      Voir Profil LinkedIn
                    </a>
                  </div>
                </div>

                <div class="mt-4 inline-flex items-center px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                  <span class="w-2 h-2 rounded-full bg-slate-400 mr-2"></span>
                  {{ candidate.experience }} d'expérience détectée
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-6 mb-6">
            <div class="card p-6 text-center hover:shadow-md transition-shadow">
              <div class="flex justify-center mb-4">
                <ScoreCircle :score="candidate.matchScore" size="lg" />
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">Compatibilité</h3>
              <p class="text-sm text-slate-500">Score calculé par l'IA</p>
            </div>

            <div class="card p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
              <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                <CheckCircle2 :size="24" class="text-green-600" />
              </div>
              <p class="text-3xl font-bold text-slate-900 mb-1">{{ candidate.strengths.length }}</p>
              <h3 class="text-sm font-medium text-slate-500">Points Forts Identifiés</h3>
            </div>

            <div class="card p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
              <div class="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                <AlertCircle :size="24" class="text-red-600" />
              </div>
              <p class="text-3xl font-bold text-slate-900 mb-1">{{ candidate.missingSkills.length }}</p>
              <h3 class="text-sm font-medium text-slate-500">Compétences Manquantes</h3>
            </div>
          </div>

          <div class="card p-8 mb-6 border-l-4 border-blue-500">
            <div class="flex items-center gap-3 mb-6">
              <div class="p-2 bg-blue-100 rounded-lg text-blue-700">
                <Sparkles :size="24" />
              </div>
              <h2 class="text-2xl font-bold text-slate-900">Analyse Détaillée</h2>
            </div>

            <div class="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Résumé du profil</h3>
              <p class="text-slate-700 leading-relaxed text-lg">{{ candidate.aiSummary }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 :size="20" class="text-green-600" />
                  Compétences Clés
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="strength in candidate.strengths"
                    :key="strength"
                    class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-green-50 text-green-700 border border-green-100"
                  >
                    {{ strength }}
                  </span>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertCircle :size="20" class="text-red-600" />
                  À vérifier / Manquant
                </h3>
                <div v-if="candidate.missingSkills.length === 0" class="p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100 flex items-center gap-2">
                  <CheckCircle2 :size="16" />
                  Aucune compétence manquante détectée
                </div>
                <div v-else class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in candidate.missingSkills"
                    :key="skill"
                    class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-red-50 text-red-700 border border-red-100"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            <div class="lg:col-span-2 space-y-6">
              <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Briefcase :size="24" class="text-blue-600" />
                Expérience Professionnelle
              </h2>
              
              <div class="card p-0 overflow-hidden">
                <div v-for="(exp, index) in candidate.experiences" :key="index" 
                     class="p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="font-bold text-slate-900 text-lg">{{ exp.role }}</h3>
                      <div class="flex items-center gap-2 text-slate-600 font-medium">
                        <Building2 :size="16" />
                        {{ exp.company }}
                      </div>
                    </div>
                    <div class="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      <Calendar :size="14" />
                      {{ exp.date }}
                    </div>
                  </div>
                  <p class="text-slate-600 text-sm leading-relaxed mt-3">
                    {{ exp.description }}
                  </p>
                </div>
              </div>
            </div>

            <div class="space-y-8">
              
              <div>
                <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <GraduationCap :size="24" class="text-blue-600" />
                  Formation
                </h2>
                <div class="card p-0 overflow-hidden">
                  <div v-for="edu in candidate.educations" :key="edu.id" 
                       class="p-5 border-b border-slate-100 last:border-0">
                    <h3 class="font-bold text-slate-900">{{ edu.degree }}</h3>
                    <p class="text-sm text-slate-600">{{ edu.school }}</p>
                    <p class="text-xs text-slate-400 mt-1">{{ edu.date }}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <Languages :size="24" class="text-blue-600" />
                  Autres Compétences
                </h2>
                <div class="card p-6">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in candidate.otherSkills" :key="skill"
                          class="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="card p-8 bg-slate-900 text-white">
            <h2 class="text-xl font-bold mb-6">Action requise</h2>
            <div class="flex flex-wrap gap-4">
              <button 
                class="px-6 py-3 rounded-xl font-bold transition-all bg-white text-slate-900 hover:bg-slate-100"
                @click="updateStatus('Interview Scheduled')"
              >
                Planifier un entretien
              </button>
              
              <button 
                class="px-6 py-3 rounded-xl font-bold transition-all border border-slate-700 hover:bg-slate-800 text-white"
                @click="updateStatus('Under Review')"
              >
                Mettre de côté
              </button>

              <button 
                class="px-6 py-3 rounded-xl font-bold transition-all bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 ml-auto"
                @click="updateStatus('Rejected')"
              >
                Refuser le candidat
              </button>
            </div>
          </div>
        </div>

        <div v-else class="card p-16 text-center">
          <h2 class="text-2xl font-bold text-slate-900 mb-2">Candidat introuvable</h2>
          <p class="text-slate-500 mb-8">Ce profil n'existe pas ou a été supprimé.</p>
          <BaseButton @click="router.push('/dashboard')">
            Retour au Tableau de bord
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>