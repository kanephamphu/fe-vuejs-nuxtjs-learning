<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    
    <!-- Slideshow Overlay -->
    <LessonSlideshow 
      v-if="showIntro && introLesson" 
      :content="introLesson.content" 
      @finish="showIntro = false"
    />

   <div v-if="!showIntro && roadmap">
       <!-- Hero Section -->
       <div class="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
          <!-- Background Decor -->
          <div class="absolute inset-0 overflow-hidden">
             <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
             <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px] -ml-20 -mb-20"></div>
          </div>
          
          <div class="container mx-auto px-4 relative z-10 text-center">
             <div class="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl shadow-2xl mb-6 font-bold bg-gradient-to-br"
                :class="moduleColorClasses(roadmap.slug)">
                {{ moduleIcon(roadmap.slug) }}
             </div>
             
             <h1 class="text-4xl md:text-6xl font-black mb-4 capitalize tracking-tight">{{ roadmap.title }}</h1>
             <p class="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
               {{ roadmap.description }}
             </p>
             
             <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  v-if="introLesson"
                  @click="showIntro = true"
                  class="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-emerald-50 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                >
                  <span>📺</span> Watch Introduction
                </button>
                <NuxtLink to="/dashboard" class="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm">
                  ← Back to Dashboard
                </NuxtLink>
             </div>
          </div>
       </div>

       <!-- Curriculum -->
       <div class="container mx-auto px-4 py-12 max-w-5xl">
          <div class="flex items-center justify-between mb-8">
             <h2 class="text-2xl font-bold text-slate-900">Curriculum</h2>
             <span class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">{{ roadmap.stats.total }} Lessons</span>
          </div>

          <div class="space-y-12">
             <!-- Course Group Loop -->
             <div v-for="(course, cIdx) in roadmap.courses" :key="course.id" class="relative">
                <!-- Course Connector Line -->
                <div v-if="cIdx < roadmap.courses.length - 1" class="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200 -z-10"></div>
                
                <!-- Course Header -->
                <div class="flex items-start gap-4 mb-6">
                   <div class="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-lg shrink-0 z-10">
                      {{ cIdx + 1 }}
                   </div>
                   <div>
                      <h3 class="text-xl font-bold text-slate-900">{{ course.title }}</h3>
                      <p class="text-slate-500 text-sm">{{ course.lessons.length }} lessons • Estimated {{ course.lessons.length * 15 }} mins</p>
                   </div>
                </div>

                <!-- Lessons List -->
                <div class="pl-0 md:pl-16 space-y-3">
                   <NuxtLink 
                     v-for="(lesson, lIdx) in course.lessons" 
                     :key="lesson.id"
                     :to="`/learn/${roadmap.slug}/${lesson.slug}`"
                     class="group flex flex-col md:flex-row md:items-center bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
                   >
                      <div class="flex-1 min-w-0 flex items-center gap-3">
                         <!-- Status Icon -->
                         <div class="shrink-0">
                            <!-- TODO: Inject IsCompleted into lesson API or use client side lookup map if present -->
                            <div v-if="lesson.isCompleted" class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                            <div v-else class="w-6 h-6 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center text-[10px] group-hover:bg-emerald-50 group-hover:text-emerald-500">●</div>
                         </div>
                         
                         <div>
                            <h4 class="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{{ lesson.title }}</h4>
                            <span class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 border border-slate-100 group-hover:border-emerald-100 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                              {{ lesson.complexity }}
                            </span>
                         </div>
                      </div>
                      
                      <div class="mt-2 md:mt-0 md:ml-4 text-xs font-bold text-slate-400 group-hover:text-emerald-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         Start Lesson →
                      </div>
                   </NuxtLink>
                </div>
             </div>
          </div>
       </div>
    </div>
    <div v-else-if="!showIntro" class="flex-1 flex items-center justify-center">
       <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const moduleSlug = computed(() => route.params.module as string);
const showIntro = ref(false);

const { data } = await useFetch('/api/roadmaps');

// Find the specific roadmap from the full list
const roadmap = computed(() => {
  if (!data.value?.roadmaps) return null;
  return data.value.roadmaps.find((r: any) => r.slug === moduleSlug.value);
});

const introLesson = computed(() => {
   if (!roadmap.value) return null;
   // Search recursively or just flat map
   for (const course of roadmap.value.courses) {
      const match = course.lessons.find((l: any) => l.slug.includes('introduction') || l.slug.includes('what-is'));
      if (match) return match;
   }
   return null;
});

// Helper for UI
function moduleColorClasses(mod: string) {
   const map: Record<string, string> = {
      javascript: 'from-yellow-400 to-yellow-600 shadow-yellow-500/30',
      typescript: 'from-blue-500 to-blue-700 shadow-blue-500/30',
      css: 'from-sky-400 to-sky-600 shadow-sky-500/30',
      vue: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30',
      nuxt: 'from-green-500 to-green-700 shadow-green-500/30',
      'fe-master-vue-nuxt': 'from-indigo-500 to-purple-600 shadow-purple-500/30'
   };
   return map[mod] || 'from-slate-400 to-slate-600';
}

function moduleIcon(mod: string) {
   const map: Record<string, string> = {
      javascript: 'JS', typescript: 'TS', css: 'CSS', vue: 'V', nuxt: 'N'
   };
   return map[mod] || '?';
}

function moduleDescription(mod: string) {
   const map: Record<string, string> = {
      javascript: 'Master the language of the web. From variables to async programming.',
      typescript: 'Add type safety to your JavaScript code. Build scalable applications.',
      css: 'Style the web with confidence. Flexbox, Grid, and responsive design.',
      vue: 'The progressive JavaScript framework. Components, Reactivity, and more.',
      nuxt: 'The Intuitive Web Framework. SSR, SEO, and fullbox powers.'
   };
   return map[mod] || 'Detailed curriculum for mastery.';
}
</script>
