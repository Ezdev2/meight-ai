<script setup>
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'
import { useCampaignStore } from '../stores/campaignStore'

const emit = defineEmits(['close'])

const campaignStore = useCampaignStore()

const formData = ref({
  title: '',
  department: '',
  description: '',
  location: '',
  type: 'Full-time',
  status: 'draft'
})

const handleSubmit = () => {
  campaignStore.createCampaign(formData.value)
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-slate-200 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-slate-900">Create New Campaign</h2>
        <button
          @click="emit('close')"
          class="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X :size="24" class="text-slate-600" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Senior Frontend Developer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Department</label>
          <input
            v-model="formData.department"
            type="text"
            required
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Engineering"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            v-model="formData.description"
            required
            rows="4"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the role and requirements..."
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Location</label>
            <input
              v-model="formData.location"
              type="text"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Remote"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Type</label>
            <select
              v-model="formData.type"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Freelance</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
          <select
            v-model="formData.status"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
          </select>
        </div>

        <div class="flex gap-3 pt-4">
          <BaseButton type="submit" variant="primary" class="flex-1">
            Create Campaign
          </BaseButton>
          <BaseButton type="button" variant="secondary" @click="emit('close')">
            Cancel
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
