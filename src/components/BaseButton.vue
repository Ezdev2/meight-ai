<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    :class="[
      'font-medium transition-colors duration-200 rounded-full inline-flex items-center justify-center gap-2',
      {
        'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
        'bg-slate-100 hover:bg-slate-200 text-slate-700': variant === 'secondary',
        'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200': variant === 'outline',
        'bg-transparent hover:bg-slate-100 text-slate-600': variant === 'ghost',
        'px-4 py-2 text-sm': size === 'sm',
        'px-6 py-3 text-base': size === 'md',
        'px-8 py-4 text-lg': size === 'lg',
        'opacity-50 cursor-not-allowed': disabled
      }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
