<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    default: 'md'
  }
})

const sizeConfig = {
  sm: { width: 60, stroke: 4, fontSize: 'text-sm' },
  md: { width: 80, stroke: 5, fontSize: 'text-lg' },
  lg: { width: 120, stroke: 6, fontSize: 'text-3xl' }
}

const config = sizeConfig[props.size]
const radius = (config.width - config.stroke) / 2
const circumference = 2 * Math.PI * radius
const offset = computed(() => circumference - (props.score / 100) * circumference)

const scoreColor = computed(() => {
  if (props.score >= 80) return '#10b981'
  if (props.score >= 50) return '#f59e0b'
  return '#ef4444'
})
</script>

<template>
  <div class="relative inline-flex items-center justify-center">
    <svg :width="config.width" :height="config.width" class="transform -rotate-90">
      <circle
        :cx="config.width / 2"
        :cy="config.width / 2"
        :r="radius"
        :stroke-width="config.stroke"
        class="stroke-slate-200"
        fill="none"
      />
      <circle
        :cx="config.width / 2"
        :cy="config.width / 2"
        :r="radius"
        :stroke="scoreColor"
        :stroke-width="config.stroke"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
        fill="none"
        class="transition-all duration-1000"
      />
    </svg>
    <div
      :class="['absolute inset-0 flex items-center justify-center font-bold', config.fontSize]"
      :style="{ color: scoreColor }"
    >
      {{ score }}%
    </div>
  </div>
</template>
