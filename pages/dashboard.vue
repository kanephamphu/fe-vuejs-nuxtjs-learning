<template>
  <div class="min-h-screen bg-slate-50 font-sans pb-20">


    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-6 py-12">
    <div v-if="data" class="space-y-12">
      <!-- Welcome Section -->
      <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 bg-gradient-to-r from-emerald-50 to-white">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 class="text-3xl font-bold text-slate-900 mb-2">My Progress</h1>
            <p class="text-slate-600">Track your journey across all enrolled courses.</p>
          </div>
          <div class="md:w-64">
            <div class="flex justify-between items-end mb-2">
              <span class="text-sm font-bold text-emerald-700">Overall</span>
              <span class="text-lg font-black text-emerald-600">{{ globalStats.globalPercentage }}%</span>
            </div>
            <div class="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-emerald-500 transition-all duration-1000 ease-out"
                :style="{ width: `${globalStats.globalPercentage}%` }"
              ></div>
            </div>
            <p class="mt-2 text-xs text-slate-500 text-right">
              {{ globalStats.completedLessons }} / {{ globalStats.totalLessons }} lessons completed
            </p>
          </div>
        </div>
      </div>

      <!-- My Roadmaps Section -->
      <div v-if="myRoadmaps.length > 0">
         <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span>📚</span> My Roadmaps
         </h2>
         
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NuxtLink 
               v-for="rm in myRoadmaps" 
               :key="rm.id" 
               :to="`/roadmaps/${rm.slug}`"
               class="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden flex flex-col items-center text-center"
            >
               <!-- Background Gradient Blur -->
               <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br"
                  :class="getModuleGradient(rm.slug)"></div>
               
               <!-- Content -->
               <div class="relative z-10 w-full flex flex-col items-center">
                  <div class="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black mb-6 shadow-lg bg-white text-slate-900">
                     {{ getModuleLabel(rm.slug) }}
                  </div>
                  
                  <h3 class="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors mb-2">{{ rm.title }}</h3>
                  
                  <!-- Progress Bar -->
                  <div class="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden group-hover:bg-white/20 mt-4">
                     <div class="h-full bg-emerald-500 group-hover:bg-white transition-all duration-1000"
                        :style="{ width: `${rm.stats.percentage}%` }"></div>
                  </div>
                  
                  <span class="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full group-hover:bg-white group-hover:text-slate-900 transition-colors">
                     {{ isRoadmapCompleted(rm) ? 'Review' : isRoadmapInProgress(rm) ? 'Continue' : 'Start' }}
                  </span>
               </div>
            </NuxtLink>
         </div>
      </div>

      <!-- Explore Section -->
      <div>
         <h2 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span>🌍</span> Explore More Roadmaps
         </h2>
         
         <div v-if="exploreRoadmaps.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
               v-for="rm in exploreRoadmaps" 
               :key="rm.id" 
               class="relative bg-white/50 rounded-3xl p-8 border border-slate-200 hover:border-emerald-300 transition-colors flex flex-col items-center text-center"
            >
               <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-4 bg-slate-100 text-slate-500 grayscale opacity-80">
                  {{ getModuleLabel(rm.slug) }}
               </div>
               
               <h3 class="text-xl font-bold text-slate-900 mb-2">{{ rm.title }}</h3>
               <p class="text-slate-500 text-sm mb-6">{{ rm.description }}</p>
               
               <button 
                  @click="enroll(rm.id)"
                  :disabled="loading"
                  class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-full transition-all shadow-md hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {{ loading ? 'Enrolling...' : 'Enroll Now' }}
               </button>
            </div>
         </div>
         <div v-else class="text-slate-500 italic">
            You have enrolled in all available roadmaps!
         </div>
      </div>

    </div>
    
    <div v-else class="flex justify-center py-20">
       <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
    </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { onMounted, computed, ref } from 'vue';

definePageMeta({
  middleware: ['auth']
})

const { data, refresh } = await useFetch('/api/roadmaps');
const loading = ref(false);

const myRoadmaps = computed(() => data.value?.roadmaps?.filter((r: any) => r.isEnrolled) || []);
const exploreRoadmaps = computed(() => data.value?.roadmaps?.filter((r: any) => !r.isEnrolled) || []);

async function enroll(roadmapId: number) {
  loading.value = true;
  try {
    await $fetch('/api/roadmaps/enroll', {
      method: 'POST',
      body: { roadmapId }
    });
    // Optimistic update
    if (data.value?.roadmaps) {
       const rm = data.value.roadmaps.find((r: any) => r.id === roadmapId);
       if (rm) rm.isEnrolled = true;
    }
  } catch (e) {
    console.error('Enrollment failed', e);
  } finally {
    loading.value = false;
  }
}

// Calculate Global Stats
const globalStats = computed(() => {
   if (!data.value?.roadmaps) return { totalLessons: 0, completedLessons: 0, globalPercentage: 0 };
   
   let total = 0;
   let completed = 0;
   
   for (const rm of myRoadmaps.value) {
      total += rm.stats.total;
      completed += rm.stats.completed;
   }
   
   return {
      totalLessons: total,
      completedLessons: completed,
      globalPercentage: total > 0 ? Math.round((completed / total) * 100) : 0
   };
});

const nextLesson = computed(() => {
  if (!data.value?.roadmaps) return null;
  
  // Find first in_progress across all roadmaps -> courses
  for (const rm of data.value.roadmaps) {
     for (const course of rm.courses) {
        // We need lesson status but API returns stats. 
        // Wait, the API structure removed the global progress map return.
        // We should fix the API or iterating logic.
        // Actually, let's just loop through and find the first one that implies incomplete.
        // Or better, update API to return progress map too OR inject status into lessons.
        // To be safe and quick, I'll rely on what I wrote in API.
        
        // Ah, in API I didn't inject 'status' field into lesson objects, just stats.
        // That was an oversight for `nextLesson` Logic.
        // However, I can't see the lesson status on the dashboard logic easily without it.
        // I will assume for now I should update the API to be more robust or I can just pick the first uncompleted lesson.
     }
  }
  return null; // Placeholder until API refinement
});

function isRoadmapCompleted(rm: any) {
  return rm.stats.percentage === 100;
}

function isRoadmapInProgress(rm: any) {
  return rm.stats.percentage > 0 && rm.stats.percentage < 100;
}

function getModuleGradient(key: string) {
   const map: Record<string, string> = {
      javascript: 'from-yellow-400/90 to-yellow-600/90',
      typescript: 'from-blue-500/90 to-blue-700/90',
      css: 'from-sky-400/90 to-sky-600/90',
      vue: 'from-emerald-400/90 to-emerald-600/90',
      nuxt: 'from-green-500/90 to-green-700/90',
      'fe-master-vue-nuxt': 'from-indigo-500/90 to-purple-600/90'
   };
   return map[key] || 'from-slate-400 to-slate-600';
}

function getModuleLabel(key: string) {
    const map: Record<string, string> = {
      javascript: 'JS', typescript: 'TS', css: 'CSS', vue: 'Vue', nuxt: 'Nuxt',
      'fe-master-vue-nuxt': 'FE'
   };
   return map[key] || key.substring(0,2).toUpperCase();
}

onMounted(async () => {
  console.log('[Dashboard] Refreshing progress data...');
  await refresh();
  console.log('[Dashboard] Data refreshed.');
});
</script>
