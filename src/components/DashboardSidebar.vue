<script setup>
import { Brain, LayoutDashboard, Briefcase, Settings, LogOut } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  // { name: 'Campaigns', icon: Briefcase, path: '/dashboard' }
]

const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <div class="w-64 bg-slate-900 min-h-screen text-white flex flex-col">
    <div class="p-6 border-b border-slate-800">
      <a href="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <Brain :size="24" />
        </div>
        <div>
          <h1 class="text-xl font-bold">MEIGHT</h1>
          <p class="text-xs text-slate-400">AI Recruitment</p>
        </div>
      </a>
    </div>

    <nav class="flex-1 p-4">
      <div class="space-y-1">
        <button
          v-for="item in navigation"
          :key="item.name"
          @click="router.push(item.path)"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
            isActive(item.path)
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          ]"
        >
          <component :is="item.icon" :size="20" />
          <span>{{ item.name }}</span>
        </button>
      </div>
    </nav>

    <div class="p-4 border-t border-slate-800">
      <button class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
        <Settings :size="20" />
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>
