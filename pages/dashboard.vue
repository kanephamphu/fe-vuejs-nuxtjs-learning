<template>
  <div class="space-y-8 py-8">
    <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 bg-gradient-to-r from-emerald-50 to-white">
      <h1 class="text-3xl font-bold text-slate-900 mb-2">Welcome Back!</h1>
      <p class="text-slate-600">Continue your journey to mastery.</p>
    </div>

    <!-- Modules -->
    <div v-if="data" class="space-y-12">
      <div v-for="(lessons, moduleName) in data.modules" :key="moduleName" class="space-y-6">
        <div class="flex items-center gap-3">
           <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl" 
                :class="{
                  'bg-emerald-500': moduleName === 'vue',
                  'bg-green-600': moduleName === 'nuxt',
                  'bg-yellow-500': moduleName === 'javascript',
                  'bg-blue-600': moduleName === 'typescript',
                  'bg-sky-500': moduleName === 'css',
                }">
             {{ moduleName[0].toUpperCase() }}
           </div>
           <h2 class="text-2xl font-bold capitalize text-slate-900">{{ moduleName }} Module</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="lesson in lessons" :key="lesson.id" :to="`/learn/${lesson.module}/${lesson.slug}`" class="block bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150"></div>
            
            <div class="flex justify-between items-start mb-4 relative">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">{{ lesson.complexity || 'Beginner' }}</span>
              <div v-if="data.progress && data.progress[lesson.id] === 'completed'" class="bg-emerald-100 text-emerald-600 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            
            <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors relative">{{ lesson.title }}</h3>
            <p class="text-slate-500 text-sm line-clamp-2 relative">{{ lesson.topic }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-20 text-slate-500">
      Loading your curriculum...
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';

definePageMeta({
  middleware: ['auth']
})

const { data } = await useFetch('/api/modules');
</script>
