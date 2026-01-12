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
  <div class="min-h-screen bg-[#F4F7FF] relative overflow-hidden font-sans text-slate-900">
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full"></div>
    <div class="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-400/10 blur-[100px] rounded-full"></div>

    <div class="relative z-10">
      <nav class="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <Brain :size="22" class="text-white" />
          </div>
          <span class="text-xl font-bold tracking-tight">MEIGHT</span>
        </div>

        <div class="flex items-center gap-3 md:gap-6">

          <button @click="handleHelp"
            class="flex items-center justify-center gap-2 p-2 text-slate-600 hover:text-blue-600 font-medium transition-all"
            title="Besoin d'aide">
            <HelpCircle :size="22" />
            <span class="hidden md:inline">Besoin d'aide</span>
          </button>

          <BaseButton variant="primary" @click="handleLogin"
            class="!p-2.5 md:!px-6 md:!py-3 shadow-sm flex items-center justify-center">
            <div class="flex items-center gap-2">
              <LogIn :size="20" />
              <span class="hidden md:inline">Se connecter</span>
            </div>
          </BaseButton>

        </div>
      </nav>

      <main class="max-w-6xl mx-auto px-6 pt-16 md:pt-24">
        <div class="text-center mb-20">
          <div
            class="inline-flex items-center px-4 py-1.5 mb-8 text-sm font-semibold text-blue-700 bg-white border border-blue-100 rounded-full shadow-sm">
            ⭐⭐⭐⭐⭐ <span class="ml-2 border-l pl-2 border-slate-200 text-slate-500">Nouveau standard IA</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Meight est votre <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Copilote</span> <br
              class="hidden md:block" /> de Recrutement IA.
          </h1>

          <p class="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Trouvez le candidat idéal en quelques minutes, pas en quelques jours.
            L'intelligence artificielle au service de vos décisions humaines.
          </p>

          <div class="flex flex-col items-center gap-4">
            <BaseButton size="lg" @click="goToDashboard"
              class="px-10 py-4 text-lg shadow-lg hover:shadow-xl transition-all">
              Accéder au Tableau de Bord
            </BaseButton>
            <p class="text-sm text-slate-400 italic">Le futur de l'embauche est entre vos mains.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <div v-for="feature in features" :key="feature.title"
            class="bg-white/80 backdrop-blur-sm border border-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 group">
            <div
              class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <component :is="feature.icon" :size="24" class="text-blue-600" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">{{ feature.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>

        <div
          class="rounded-[3rem] p-12 md:p-20 mb-20 text-center bg-slate-900 text-white relative overflow-hidden bg-gradient-to-br from-blue-800 to-blue-600/20 text-white">
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px]"></div>
          <div class="relative z-10">
            <h3 class="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer votre équipe ?</h3>
            <p class="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Rejoignez les recruteurs visionnaires qui utilisent l'IA pour bâtir le futur.
            </p>
            <BaseButton variant="secondary" size="lg" @click="goToDashboard"
              class="!bg-white !text-slate-900 hover:!bg-blue-50">
              Démarrer maintenant
            </BaseButton>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

:deep(button) {
  font-family: 'Inter', sans-serif;
}

h1 {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.04em;
}
</style>