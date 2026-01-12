<script setup>
import { ref } from 'vue'
import { X, UploadCloud, FileText, Zap, Layers, Loader2 } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  isOpen: Boolean,
  isProcessing: Boolean // Utilisé uniquement pour le mode "Unique"
})

const emit = defineEmits(['close', 'analyze-single', 'upload-batch'])

const activeTab = ref('single') // 'single' ou 'batch'
const dragActive = ref(false)
const selectedFiles = ref([])
const singleFile = ref(null)

// --- Logique Drag & Drop ---
const handleDrop = (e) => {
  e.preventDefault()
  dragActive.value = false
  
  if (e.dataTransfer.files.length > 0) {
    if (activeTab.value === 'single') {
      singleFile.value = e.dataTransfer.files[0]
    } else {
      handleBatchFiles(e.dataTransfer.files)
    }
  }
}

const handleFileSelect = (e) => {
  if (e.target.files.length > 0) {
    if (activeTab.value === 'single') {
      singleFile.value = e.target.files[0]
    } else {
      handleBatchFiles(e.target.files)
    }
  }
}

const handleBatchFiles = (files) => {
  selectedFiles.value = [...selectedFiles.value, ...Array.from(files)]
}

// --- Actions de Soumission ---

const submitSingle = () => {
  if (!singleFile.value) return
  // Émet le fichier unique pour analyse immédiate et redirection
  emit('analyze-single', singleFile.value)
}

const submitBatch = () => {
  if (selectedFiles.value.length === 0) return
  // Émet la liste pour traitement en arrière-plan
  emit('upload-batch', selectedFiles.value)
  close()
}

const close = () => {
  if (!props.isProcessing) {
    selectedFiles.value = []
    singleFile.value = null
    emit('close')
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="close"></div>

    <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-100">
      
      <div class="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 class="text-xl font-bold text-slate-900">Ajouter des candidats</h2>
        <button @click="close" :disabled="isProcessing" class="text-slate-400 hover:text-slate-600 transition-colors">
          <X :size="24" />
        </button>
      </div>

      <div v-if="isProcessing" class="p-16 text-center flex flex-col items-center">
        <div class="w-16 h-16 mb-6 relative">
          <div class="absolute inset-0 rounded-full border-4 border-blue-50"></div>
          <div class="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 mb-2">Analyse du CV en cours...</h3>
        <p class="text-slate-500">Extraction du parcours, des compétences et des formations.</p>
      </div>

      <div v-else>
        <div class="flex border-b border-slate-100">
          <button 
            @click="activeTab = 'single'"
            class="flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 relative"
            :class="activeTab === 'single' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'"
          >
            <Zap :size="18" />
            Analyse Rapide (1 CV)
            <div v-if="activeTab === 'single'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          </button>
          <button 
            @click="activeTab = 'batch'"
            class="flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 relative"
            :class="activeTab === 'batch' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'"
          >
            <Layers :size="18" />
            Import Groupé
            <div v-if="activeTab === 'batch'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          </button>
        </div>

        <div class="p-8">
          
          <div v-if="activeTab === 'single'" class="space-y-6">
            <div class="text-center mb-4">
              <h3 class="text-slate-900 font-medium">Téléversez un CV unique</h3>
              <p class="text-sm text-slate-500">Nous extrayons les données et vous redirigeons vers le profil complet.</p>
            </div>

            <div v-if="!singleFile"
              @dragenter.prevent="dragActive = true"
              @dragleave.prevent="dragActive = false"
              @dragover.prevent="dragActive = true"
              @drop="handleDrop"
              class="border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer"
              :class="dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'"
              @click="$refs.singleInput.click()"
            >
              <input ref="singleInput" type="file" class="hidden" @change="handleFileSelect" accept=".pdf,.doc,.docx">
              <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText :size="32" />
              </div>
              <span class="font-bold text-slate-700 block mb-1">Cliquez pour ajouter un CV</span>
              <span class="text-xs text-slate-400">PDF ou Word (Max 10 Mo)</span>
            </div>

            <div v-else class="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl">
               <div class="flex items-center gap-4">
                 <div class="p-3 bg-white rounded-lg text-blue-600 shadow-sm">
                   <FileText :size="24" />
                 </div>
                 <div>
                   <p class="font-bold text-slate-900">{{ singleFile.name }}</p>
                   <p class="text-xs text-slate-500">{{ (singleFile.size / 1024 / 1024).toFixed(2) }} MB</p>
                 </div>
               </div>
               <button @click="singleFile = null" class="text-slate-400 hover:text-red-500 p-2">
                 <X :size="20" />
               </button>
            </div>
          </div>

          <div v-else class="space-y-4">
            <div
              @dragenter.prevent="dragActive = true"
              @dragleave.prevent="dragActive = false"
              @dragover.prevent="dragActive = true"
              @drop="handleDrop"
              class="border-2 border-dashed rounded-xl p-8 text-center transition-colors"
              :class="dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'"
            >
              <UploadCloud :size="32" class="mx-auto text-slate-400 mb-2" />
              <p class="text-sm text-slate-600">Glissez-déposez plusieurs fichiers ici</p>
              <input type="file" multiple class="hidden" id="batch-upload" @change="handleFileSelect" accept=".pdf,.doc,.docx">
              <label for="batch-upload" class="mt-2 inline-block text-blue-600 font-bold text-sm cursor-pointer hover:underline">ou parcourez vos fichiers</label>
            </div>
            
            <div v-if="selectedFiles.length > 0" class="space-y-2 max-h-48 overflow-y-auto pr-2">
              <div v-for="(file, idx) in selectedFiles" :key="idx" class="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                <div class="flex items-center gap-2 overflow-hidden">
                  <FileText :size="16" class="text-slate-400 flex-shrink-0" />
                  <span class="text-sm text-slate-600 truncate">{{ file.name }}</span>
                </div>
                <button @click="selectedFiles.splice(idx, 1)" class="text-slate-400 hover:text-red-500"><X :size="16" /></button>
              </div>
            </div>
          </div>

        </div>

        <div class="p-6 border-t border-slate-100 flex justify-end gap-3">
          <BaseButton variant="outline" @click="close">Annuler</BaseButton>
          
          <BaseButton 
            v-if="activeTab === 'single'" 
            variant="primary" 
            :disabled="!singleFile"
            @click="submitSingle"
            class="shadow-lg shadow-blue-100"
          >
            Analyser & Voir le Profil
          </BaseButton>
          
          <BaseButton 
            v-else 
            variant="primary" 
            :disabled="selectedFiles.length === 0"
            @click="submitBatch"
          >
            Lancer l'import ({{ selectedFiles.length }})
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>