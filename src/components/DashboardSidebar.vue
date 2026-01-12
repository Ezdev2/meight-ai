<!-- <script setup>
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
</template> -->

<script setup>
import { Brain, LayoutDashboard, Settings, X } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

// On reçoit l'état d'ouverture depuis le parent
defineProps(['isOpen'])
const emit = defineEmits(['close'])

const router = useRouter()
const route = useRoute()

const navigation = [
  { name: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
]

const isActive = (path) => route.path === path
</script>

<template>
  <div 
    v-if="isOpen" 
    @click="emit('close')" 
    class="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity"
  ></div>

  <aside 
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="p-6 border-b border-slate-800 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <Brain :size="24" />
        </div>
        <div>
          <h1 class="text-xl font-bold">MEIGHT</h1>
          <p class="text-xs text-slate-400">Recrutement IA</p>
        </div>
      </a>
      <button @click="emit('close')" class="md:hidden text-slate-400 hover:text-white">
        <X :size="24" />
      </button>
    </div>

    <nav class="flex-1 p-4">
      <div class="space-y-1">
        <button
          v-for="item in navigation"
          :key="item.name"
          @click="router.push(item.path); emit('close')"
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
        <span>Paramètres</span>
      </button>
    </div>
  </aside>
</template>