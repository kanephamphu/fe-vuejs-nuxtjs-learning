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

            <div v-else-if="currentTab === 'Practice'" class="h-full flex flex-col">
              <h2 class="text-xl font-bold mb-4">Practice Area</h2>
              <div class="flex-1 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <VueMonacoEditor
                  v-model:value="code"
                  theme="vs-dark"
                  :options="{
                    automaticLayout: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false
                  }"
                  language="javascript"
                  class="h-full w-full"
                />
              </div>
              <div class="mt-4 flex flex-col gap-4">
                 <div class="flex justify-between items-center">
                    <p class="text-slate-500 text-sm">Write your code above and click Run.</p>
                    <button @click="runCode" class="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">
                      Run Code
                    </button>
                 </div>
                 <div v-if="output" class="bg-black text-green-400 font-mono text-sm p-4 rounded-xl whitespace-pre-wrap font-bold border-l-4 border-green-500">
                    {{ output }}
                 </div>
              </div>
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
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';

const route = useRoute();
const currentTab = ref('Definition');
const tabs = ['Definition', 'Practice', 'Exercise'];

const { data: lesson } = await useFetch(`/api/lessons/${route.params.slug}`);

const code = ref(lesson.value?.exercise?.starterCode || '// Write your code here');

// Watch for lesson changes to update starter code
watch(() => lesson.value, (newLesson) => {
  if (newLesson?.exercise?.starterCode) {
    code.value = newLesson.exercise.starterCode;
  }
});

const md = new MarkdownIt();
const renderedContent = computed(() => {
  return lesson.value?.content ? md.render(lesson.value.content) : '';
});

const output = ref('');

function runCode() {
  output.value = 'Running...';
  try {
    const logs: string[] = [];
    // Capture console.log
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(a => String(a)).join(' '));
      originalLog(...args);
    };

    // Execute code (Note: eval is used for demo purposes. In production, use a sandboxed environment)
    // eslint-disable-next-line no-eval
    eval(code.value);

    console.log = originalLog;
    output.value = logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output).';
  } catch (err: any) {
    output.value = `Error: ${err.message}`;
  }
}

async function markCompleted() {
  try {
    await $fetch('/api/user/progress', {
      method: 'POST',
      body: {
        lessonId: lesson.value?.id,
        status: 'completed'
      }
    });

    // Clear cached data to ensure dashboard updates
    clearNuxtData();
    
    alert('Lesson completed! 🎉');
    navigateTo('/dashboard');
  } catch (error) {
    console.error('Failed to mark lesson as completed:', error);
    alert('Failed to save progress. Please try again.');
  }
}
</script>
