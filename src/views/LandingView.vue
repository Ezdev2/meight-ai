<script setup>
import { Brain, Zap, Users, TrendingUp } from 'lucide-vue-next'
import BaseButton from '../components/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDashboard = () => {
  router.push('/dashboard')
}

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms analyze candidates against job requirements in seconds'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Screen hundreds of applications quickly without compromising quality'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share insights and coordinate hiring decisions with your team'
  },
  {
    icon: TrendingUp,
    title: 'Better Hiring',
    description: 'Make data-driven decisions and improve your hiring success rate'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="max-w-6xl mx-auto px-6 py-16">
      <div class="text-center mb-20 pt-12">
        <div class="inline-flex items-center gap-2 mb-6">
          <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
            <Brain :size="28" class="text-white" />
          </div>
          <h1 class="text-4xl font-bold text-slate-900">MEIGHT</h1>
        </div>

        <h2 class="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Your AI Recruitment Copilot
        </h2>

        <p class="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Transform your hiring process with intelligent candidate analysis.
          Find the perfect match faster with AI-powered insights.
        </p>

        <BaseButton size="lg" @click="goToDashboard">
          Go to Dashboard
        </BaseButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="card p-8"
        >
          <div class="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
            <component :is="feature.icon" :size="28" class="text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-slate-900 mb-2">{{ feature.title }}</h3>
          <p class="text-slate-600">{{ feature.description }}</p>
        </div>
      </div>

      <div class="card p-12 text-center bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <h3 class="text-3xl font-bold mb-4">Ready to revolutionize your recruitment?</h3>
        <p class="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Join forward-thinking companies that are using AI to build better teams.
        </p>
        <BaseButton variant="secondary" size="lg" @click="goToDashboard">
          Get Started Now
        </BaseButton>
      </div>
    </div>
  </div>
</template>
