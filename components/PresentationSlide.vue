<template>
  <div 
    class="flex flex-col items-center justify-center w-full h-full p-8 md:p-16 transition-all duration-500 ease-in-out"
    :class="themeClasses"
  >
    <div class="max-w-4xl w-full text-center space-y-8 animate-fade-in-up">
      <h2 v-if="title" class="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-display">
        {{ title }}
      </h2>
      
      <h3 v-if="subtitle" class="text-xl md:text-3xl text-slate-700 font-medium mb-8">
        {{ subtitle }}
      </h3>

      <div class="prose prose-lg md:prose-2xl mx-auto text-slate-700 leading-relaxed font-medium">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  subtitle?: string
  theme?: 'default' | 'emerald' | 'dark'
}>()

const themeClasses = computed(() => {
  switch (props.theme) {
    case 'emerald':
      return 'bg-emerald-50 text-emerald-900'
    case 'dark':
      return 'bg-slate-900 text-white'
    default:
      return 'bg-white text-slate-900'
  }
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
