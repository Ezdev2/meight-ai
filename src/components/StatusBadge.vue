<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const statusConfig = {
  'active': { bg: 'bg-green-50', text: 'text-green-700', label: 'Active' },
  'draft': { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Draft' },
  'closed': { bg: 'bg-red-50', text: 'text-red-700', label: 'Closed' },
  'New Application': { bg: 'bg-blue-50', text: 'text-blue-700', label: 'New Application' },
  'Under Review': { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Under Review' },
  'Interview Scheduled': { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Interview Scheduled' },
  'Rejected': { bg: 'bg-red-50', text: 'text-red-700', label: 'Rejected' },
  'Hired': { bg: 'bg-green-50', text: 'text-green-700', label: 'Hired' }
}

const config = statusConfig[props.status] || { bg: 'bg-slate-100', text: 'text-slate-600', label: props.status }
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
      config.bg,
      config.text
    ]"
  >
    {{ config.label }}
  </span>
</template>
