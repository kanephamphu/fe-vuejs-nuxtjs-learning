<template>
  <div class="space-y-8 py-8">
    <div v-if="data" class="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 bg-gradient-to-r from-emerald-50 to-white">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Welcome Back!</h1>
          <p class="text-slate-600">Continue your journey to mastery.</p>
        </div>
        <div class="md:w-64">
          <div class="flex justify-between items-end mb-2">
            <span class="text-sm font-bold text-emerald-700">Overall Progress</span>
            <span class="text-lg font-black text-emerald-600">{{ data.stats?.globalPercentage }}%</span>
          </div>
          <div class="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div 
              class="h-full bg-emerald-500 transition-all duration-1000 ease-out"
              :style="{ width: `${data.stats?.globalPercentage}%` }"
            ></div>
          </div>
          <p class="mt-2 text-xs text-slate-500 text-right">
            {{ data.stats?.completedLessons }} / {{ data.stats?.totalLessons }} lessons completed
          </p>
        </div>
      </div>
    </div>

    <!-- Continue Learning Shortcut -->
    <div v-if="nextLesson" class="relative overflow-hidden bg-slate-900 rounded-3xl p-8 shadow-lg group cursor-pointer transition-transform hover:scale-[1.01]" @click="navigateTo(`/learn/${nextLesson.module}/${nextLesson.slug}`)">
      <!-- Background Effects -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-start gap-5">
           <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
             ▶
           </div>
           <div>
             <div class="flex items-center gap-2 mb-1">
               <span class="text-emerald-400 font-bold text-xs uppercase tracking-wider">Up Next</span>
               <span class="w-1 h-1 rounded-full bg-slate-600"></span>
               <span class="text-slate-400 text-xs font-medium">{{ nextLesson.module }} Module</span>
             </div>
             <h2 class="text-2xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">{{ nextLesson.title }}</h2>
             <p class="text-slate-400 text-sm">{{ nextLesson.topic }}</p>
           </div>
        </div>
        
        <div class="flex items-center gap-3 bg-white/5 pl-4 pr-3 py-2 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors">
          <span class="text-sm font-bold text-white">Continue Lesson</span>
          <div class="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center -mr-1">
            →
          </div>
        </div>
      </div>
    </div>

    <!-- Learning Roadmap -->
    <div class="space-y-6">
      <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
        <span class="text-2xl">🗺️</span> Learning Path
      </h2>
      <div class="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-hidden">
        <!-- Connecting Line -->
        <div class="absolute top-1/2 left-12 right-12 h-1 bg-slate-100 -translate-y-1/2 hidden md:block"></div>
        
        <div class="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 relative z-10">
           <div v-for="(step, idx) in roadmapSteps" :key="step.key" class="flex flex-col items-center text-center group relative">
              <!-- Circle -->
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black transition-all duration-300 relative z-10 border-4 mb-3"
                 :class="[
                   isModuleCompleted(step.key) ? 'bg-emerald-500 border-emerald-100 text-white shadow-lg shadow-emerald-500/20' : 
                   isModuleInProgress(step.key) ? 'bg-white border-amber-400 text-amber-500 shadow-lg shadow-amber-500/20 scale-110' : 
                   'bg-slate-50 border-slate-100 text-slate-300'
                 ]"
              >
                {{ step.label }}
                <!-- Status Badge -->
                <div v-if="isModuleCompleted(step.key)" class="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-sm">
                  ✓
                </div>
              </div>
              <h3 class="font-bold text-slate-700 text-sm" :class="{ 'text-emerald-700': isModuleCompleted(step.key), 'text-amber-600': isModuleInProgress(step.key) }">{{ step.name }}</h3>
              <p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-1">{{ isModuleCompleted(step.key) ? 'Completed' : isModuleInProgress(step.key) ? 'In Progress' : 'Locked' }}</p>
           </div>
        </div>
      </div>
    </div>
    
    <!-- Modules -->
    <div v-if="data" class="space-y-12">
      <div v-for="(lessons, moduleName) in data.modules" :key="moduleName" class="space-y-6">
        <div class="flex items-center justify-between gap-3">
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
          <div class="flex items-center gap-4">
             <span class="text-sm font-bold text-slate-400 group-hover:text-emerald-600">{{ data.stats?.moduleStats[moduleName]?.percentage }}%</span>
             <div class="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                <div 
                  class="h-full bg-emerald-400 transition-all duration-500"
                  :style="{ width: `${data.stats?.moduleStats[moduleName]?.percentage}%` }"
                ></div>
             </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="lesson in lessons" :key="lesson.id" :to="`/learn/${lesson.module}/${lesson.slug}`" class="block bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150"></div>
            
            <div class="flex justify-between items-start mb-4 relative">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">{{ lesson.complexity || 'Beginner' }}</span>
              <div v-if="data.progress && data.progress[lesson.id] === 'completed'" class="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Done
              </div>
              <div v-else-if="data.progress && data.progress[lesson.id] === 'in_progress'" class="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-xs font-bold">
                In Progress
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
import { onMounted, computed } from 'vue';

definePageMeta({
  middleware: ['auth']
})

const { data, refresh } = await useFetch('/api/modules');

const roadmapSteps = [
  { key: 'javascript', label: 'JS', name: 'JavaScript', desc: 'The Foundation' },
  { key: 'typescript', label: 'TS', name: 'TypeScript', desc: 'Type Safety' },
  { key: 'css', label: 'CSS', name: 'CSS', desc: 'Styling' },
  { key: 'vue', label: 'Vue', name: 'Vue.js', desc: 'The Framework' },
  { key: 'nuxt', label: 'Nuxt', name: 'Nuxt', desc: 'Fullstack Power' },
];

function isModuleCompleted(moduleKey: string) {
  return data.value?.stats?.moduleStats[moduleKey]?.percentage === 100;
}

function isModuleInProgress(moduleKey: string) {
  const percentage = data.value?.stats?.moduleStats[moduleKey]?.percentage;
  return percentage > 0 && percentage < 100;
}

const nextLesson = computed(() => {
  if (!data.value) return null;
  
  // Flatten all lessons
  const allLessons = [];
  const modulesOrder = ['javascript', 'typescript', 'css', 'vue', 'nuxt'];
  
  for (const mod of modulesOrder) {
    if (data.value.modules[mod]) {
      allLessons.push(...data.value.modules[mod]);
    }
  }

  // Find first in_progress
  const firstInProgress = allLessons.find(l => data.value.progress && data.value.progress[l.id] === 'in_progress');
  if (firstInProgress) return firstInProgress;

  // Find first not completed
  const firstNew = allLessons.find(l => !data.value.progress || !data.value.progress[l.id]);
  return firstNew;
});

onMounted(async () => {
  // Always refresh when mounting to ensure progress is up to date
  console.log('[Dashboard] Refreshing progress data...');
  await refresh();
  console.log('[Dashboard] Data refreshed.');
});
</script>
