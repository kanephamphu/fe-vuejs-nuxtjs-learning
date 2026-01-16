<template>
  <div class="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden bg-slate-50">
    <!-- Sidebar -->
    <div class="w-full lg:w-64 bg-white border-r border-slate-200 overflow-y-auto hidden lg:block">
      <div class="p-4">
        <NuxtLink to="/dashboard" class="flex items-center text-slate-500 hover:text-emerald-600 mb-6 font-medium">
          ← Back to Dashboard
        </NuxtLink>
        <h3 class="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider">Current Lesson</h3>
        <p class="text-sm text-slate-700 font-medium mb-4">{{ lesson?.title }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <div v-if="lesson" class="flex-1 overflow-y-auto p-4 lg:p-8">
        <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-full flex flex-col">
          <!-- Tabs -->
          <div class="flex border-b border-slate-200">
            <button v-for="tab in tabs" :key="tab" @click="currentTab = tab" 
              class="px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200"
              :class="currentTab === tab ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'">
              {{ tab }}
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 lg:p-10 flex-1">
            <div v-if="currentTab === 'Definition'" class="prose prose-emerald max-w-none">
              <div class="prose prose-emerald max-w-none" v-html="renderedContent"></div>
            </div>

            <div v-else-if="currentTab === 'Practice'" class="h-full">
              <h2 class="text-xl font-bold mb-4">Practice Area</h2>
              <div class="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-sm h-96">
                {{ lesson.exercise?.starterCode || '// No practice code available' }}
              </div>
              <p class="mt-4 text-slate-500 text-sm">Interactive editor would go here.</p>
            </div>

            <div v-else-if="currentTab === 'Exercise'">
              <h2 class="text-xl font-bold mb-4">Exercise</h2>
              <p class="mb-4 text-slate-700">{{ lesson.exercise?.instructions || 'No instructions.' }}</p>
              
              <button @click="markCompleted" class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-center h-full text-slate-500">
        Loading lesson...
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import MarkdownIt from 'markdown-it';

const route = useRoute();
const currentTab = ref('Definition');
const tabs = ['Definition', 'Practice', 'Exercise'];

const { data: lesson } = await useFetch(`/api/lessons/${route.params.slug}`);

const md = new MarkdownIt();
const renderedContent = computed(() => {
  return lesson.value?.content ? md.render(lesson.value.content) : '';
});

async function markCompleted() {
  await $fetch('/api/user/progress', {
    method: 'POST',
    body: {
      lessonId: lesson.value?.id,
      status: 'completed'
    }
  });
  alert('Lesson completed!');
  navigateTo('/dashboard');
}
</script>
