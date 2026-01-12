<script setup>
import { Brain, Zap, Users, TrendingUp, HelpCircle, LogIn } from 'lucide-vue-next'
import BaseButton from '../components/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDashboard = () => {
  router.push('/dashboard')
}

const handleLogin = () => console.log("console se connecter")
const handleHelp = () => console.log("Besoin d'aide")

const features = [
  {
    icon: Brain,
    title: 'Analyse par IA',
    description: 'Des algorithmes avancés analysent les candidats par rapport aux exigences du poste en quelques secondes.'
  },
  {
    icon: Zap,
    title: 'Rapidité Éclair',
    description: 'Évaluez des centaines de candidatures rapidement sans compromettre la qualité de votre sélection.'
  },
  {
    icon: Users,
    title: 'Collaboration d\'Équipe',
    description: 'Partagez vos analyses et coordonnez les décisions d\'embauche avec toute votre équipe.'
  },
  {
    icon: TrendingUp,
    title: 'Meilleur Recrutement',
    description: 'Prenez des décisions basées sur les données et améliorez votre taux de réussite à l\'embauche.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#FDFEFF] relative overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
    <div class="absolute top-20 left-[10%] w-64 h-64 bg-blue-200/20 blur-[100px] rounded-full"></div>

    <div class="relative z-10">
      <nav class="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Brain :size="24" class="text-white" />
          </div>
          <span class="text-2xl font-bold text-slate-900 tracking-tight">MEIGHT</span>
        </div>

        <div class="flex items-center gap-4">
          <button @click="handleHelp"
            class="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors px-4 py-2">
            <HelpCircle :size="20" />
            Besoin d'aide
          </button>

          <BaseButton variant="primary" @click="handleLogin" class="shadow-sm">
            <div class="flex items-center gap-2">
              <LogIn :size="18" />
              Se connecter
            </div>
          </BaseButton>
        </div>
      </nav>

      <div class="max-w-6xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <div
            class="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">
            ⭐⭐⭐⭐⭐
          </div>

          <h1 class="text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            Meight est votre <span class="text-blue-600">Copilote</span> <br /> de Recrutement IA.
          </h1>

          <p class="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transformez votre processus d'embauche avec une analyse intelligente des candidats.
            Trouvez le profil idéal plus rapidement grâce aux insights de l'IA.
          </p>

          <div class="flex flex-col items-center gap-4">
            <BaseButton size="lg" @click="goToDashboard"
              class="px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all">
              Accéder au Tableau de Bord
            </BaseButton>
            <p class="text-sm text-slate-400 italic">Le futur de l'embauche est entre vos mains.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div v-for="feature in features" :key="feature.title" class="card p-8">
            <div class="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
              <component :is="feature.icon" :size="28" class="text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-2">{{ feature.title }}</h3>
            <p class="text-slate-600">{{ feature.description }}</p>
          </div>
        </div>

        <div
          class="rounded-[3rem] p-16 text-center bg-slate-900 text-white relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div class="relative z-10">
            <h3 class="text-4xl font-bold mb-6">Prêt à révolutionner votre recrutement ?</h3>
            <p class="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
              Rejoignez les entreprises visionnaires qui utilisent l'IA pour bâtir de meilleures équipes.
            </p>
            <BaseButton variant="secondary" size="lg" @click="goToDashboard">
              Commencer maintenant
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajout d'une police plus douce si disponible */
.font-bold {
  letter-spacing: -0.02em;
}
</style>