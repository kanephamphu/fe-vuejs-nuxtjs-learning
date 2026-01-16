<template>
  <div class="h-[calc(100vh-4rem)] flex flex-col lg:flex-row overflow-hidden bg-slate-50" :class="{ 'fixed inset-0 z-50 h-screen !bg-white': isFullScreen }">
    
    <!-- Slideshow Mode -->
    <LessonSlideshow 
      v-if="isSlideshow && lesson" 
      :content="lesson.content" 
      @finish="completeSlideshow"
    />
    <!-- Sidebar -->
    <div class="w-full lg:w-64 bg-white border-r border-slate-200 overflow-y-auto hidden lg:block" v-if="!isFullScreen && !isSlideshow">
      <div class="p-4">
        <NuxtLink to="/dashboard" class="flex items-center text-slate-500 hover:text-emerald-600 mb-6 font-medium">
          ← Back to Dashboard
        </NuxtLink>
        <h3 class="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider">Current Lesson</h3>
        <p class="text-sm text-slate-700 font-medium mb-4">{{ lesson?.title }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0" v-if="!isSlideshow">
      <div v-if="lesson" class="flex-1 overflow-y-auto p-4 lg:p-8" :class="{ '!p-0': isFullScreen }">
        <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-full flex flex-col" :class="{ '!max-w-none !rounded-none !border-0': isFullScreen }">
          <!-- Tabs -->
          <div class="flex border-b border-slate-200 justify-between items-center pr-4">
            <div class="flex">
              <button v-for="tab in tabs" :key="tab" @click="currentTab = tab" 
                class="px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200"
                :class="currentTab === tab ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'">
                {{ tab }}
              </button>
            </div>
             <button v-if="currentTab === 'Practice'" @click="toggleFullScreen" class="text-slate-500 hover:text-emerald-600 text-sm font-medium flex items-center gap-1">
               <span v-if="!isFullScreen">⤢ Full Screen</span>
               <span v-else>⤡ Exit Full Screen</span>
             </button>
          </div>

          <!-- Content -->
          <div class="p-6 lg:p-10 flex-1" :class="{ '!p-0 flex flex-col': isFullScreen }">
            <div v-if="currentTab === 'Definition'" class="prose prose-emerald max-w-none">
              <div class="prose prose-emerald max-w-none" v-html="renderedContent"></div>
            </div>

            <div v-else-if="currentTab === 'Practice'" class="h-full flex flex-col gap-6" :class="{ '!gap-0': isFullScreen }">
              <div v-if="!isFullScreen" class="prose prose-emerald max-w-none mb-4" v-html="renderedPracticeContent"></div>
              
              <div class="flex-1 flex flex-col">
                <h2 v-if="!isFullScreen" class="text-xl font-bold mb-4">Practice Area</h2>
                <div class="flex-1 border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col" :class="{ '!border-0 !rounded-none': isFullScreen }">
                  <VueMonacoEditor
                    v-model:value="code"
                    theme="vs-dark"
                    :options="{
                      automaticLayout: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      scrollBeyondLastLine: false
                    }"
                    :language="editorLanguage"
                    class="w-full transition-all duration-300"
                    :style="{ height: isFullScreen ? 'calc(100vh - 200px)' : '60vh' }"
                  />
                </div>
                <!-- Controls and Output -->
                <div class="flex flex-col gap-4 bg-slate-50 border-t border-slate-200 p-4" :class="{ 'fixed bottom-0 left-0 right-0 z-50': isFullScreen }">
                   <div class="flex justify-between items-center">
                      <p class="text-slate-500 text-sm">
                        {{ isFullScreen ? 'Press ESC to exit full screen' : 'Write your code above and click Run.' }}
                      </p>
                      <div class="flex gap-3">
                         <button @click="resetCode" class="text-slate-500 hover:text-slate-700 px-3 py-2 text-sm font-medium">
                          Reset Code
                        </button>
                        <button @click="runCode" class="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors flex items-center gap-2">
                          <span>▶</span> Run Code
                        </button>
                        <button 
                          v-if="!isFullScreen"
                          @click="markProgress('practice')" 
                          :disabled="lesson?.progress?.practiceCompleted"
                          class="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-200 transition-colors disabled:opacity-50"
                        >
                          {{ lesson?.progress?.practiceCompleted ? 'Practice Done ✓' : 'Mark Practice Done' }}
                        </button>
                      </div>
                   </div>
                   <!-- Console Output -->
                   <div v-if="output || logs.length > 0" class="bg-black text-green-400 font-mono text-sm p-4 rounded-xl whitespace-pre-wrap font-bold border-l-4 border-green-500 max-h-48 overflow-y-auto shadow-inner">
                      <div v-for="(log, idx) in logs" :key="idx" class="border-b border-gray-800 pb-1 mb-1 last:border-0 last:mb-0 last:pb-0">
                        <span class="text-gray-500 mr-2">[{{ log.time }}]</span> {{ log.message }}
                      </div>
                      <div v-if="output && logs.length === 0">{{ output }}</div>
                   </div>
                </div>
              </div>
            </div>

            <div v-else-if="currentTab === 'Exercise'">
              <h2 class="text-xl font-bold mb-4">Exercise</h2>
              <ExerciseViewer :instructions="lesson?.exercise?.instructions || ''" @update:completed="isExerciseReady = $event" />
              
              <div class="flex flex-col gap-4 mt-8 pt-8 border-t border-slate-100">
                <div v-if="lesson?.progress?.practiceCompleted" class="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium border border-emerald-100">
                  Practice session completed! Submit the exercise to finish the lesson.
                </div>
                <div v-else class="p-4 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium border border-amber-100">
                  Complete the Practice session first to unlock full lesson completion.
                </div>

                <div v-if="!isExerciseReady && !lesson?.progress?.exerciseCompleted" class="text-amber-600 text-xs font-bold uppercase tracking-wider">
                  ⚠️ Please complete all questions above to enable submission
                </div>

                <button 
                  @click="markProgress('exercise')" 
                  :disabled="lesson?.progress?.exerciseCompleted || !isExerciseReady"
                  class="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:grayscale"
                >
                  {{ lesson?.progress?.exerciseCompleted ? 'Exercise Submitted ✓' : 'Submit Exercise' }}
                </button>
              </div>
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
const isExerciseReady = ref(false);
const isFullScreen = ref(false);

const isSlideshow = computed(() => {
   // Identify "What is Vue" lesson by slug or a specific flag
   return route.params.slug === 'vue-what-is-vue-spa';
});

async function completeSlideshow() {
   await markProgress('practice'); // Mark both as done for simplified flow in slideshow
   await markProgress('exercise');
}

const editorLanguage = computed(() => {
  const module = route.params.module as string;
  const map: Record<string, string> = {
    typescript: 'typescript',
    vue: 'html', 
    nuxt: 'html',
    css: 'css',
    javascript: 'javascript'
  };
  return map[module] || 'javascript';
});

const { data: lesson } = await useFetch(`/api/lessons/${route.params.slug}`);

const code = ref(lesson.value?.exercise?.starterCode || '// Write your code here');

// Watch for lesson changes to update starter code
watch(() => lesson.value, (newLesson) => {
  if (newLesson?.exercise?.starterCode) {
    code.value = newLesson.exercise.starterCode;
  }
});

const resetCode = () => {
   if (confirm('Are you sure you want to reset your code?')) {
      code.value = lesson.value?.exercise?.starterCode || '// Write your code here';
      logs.value = [];
      output.value = '';
   }
}

const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value;
}

// Handle ESC key to exit full screen
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFullScreen.value) {
      isFullScreen.value = false;
    }
  })
})

const md = new MarkdownIt();
const renderedContent = computed(() => {
  return lesson.value?.content ? md.render(lesson.value.content) : '';
});

const renderedPracticeContent = computed(() => {
  return lesson.value?.practiceContent ? md.render(lesson.value.practiceContent) : '';
});

const output = ref('');
const logs = ref<{ time: string, message: string }[]>([]);

function runCode() {
  output.value = '';
  logs.value = [];
  
  // Create a logs capture mechanism that works with async code
  const captureLog = (type: string, args: any[]) => {
     const time = new Date().toLocaleTimeString().split(' ')[0];
     const message = args.map(a => {
        if (typeof a === 'object') return JSON.stringify(a);
        return String(a);
     }).join(' ');
     logs.value.push({ time, message });
  };

  // We need to override console within the context of execution
  // Since we use eval, we wrap the code in an IIFE that shadows console
  const wrappedCode = `
    (async () => {
       const console = {
          log: (...args) => matchConsole('log', args),
          warn: (...args) => matchConsole('warn', args),
          error: (...args) => matchConsole('error', args),
          info: (...args) => matchConsole('info', args),
       };
       
       try {
         ${code.value}
       } catch (err) {
         console.error(err.message);
       }
    })();
  `;

  // Expose the capture function globally so the eval'd code can call it
  // @ts-ignore
  window.matchConsole = (type: string, args: any[]) => {
      captureLog(type, args);
  }

  try {
    if (editorLanguage.value === 'typescript') {
        console.warn('TypeScript execution is not fully supported in this demo environment yet.');
    }
    
    // eslint-disable-next-line no-eval
    eval(wrappedCode);

  } catch (err: any) {
    logs.value.push({ time: new Date().toLocaleTimeString(), message: `Error: ${err.message}` });
  }
}

async function markProgress(type: 'practice' | 'exercise') {
  try {
    await $fetch('/api/user/progress', {
      method: 'POST',
      body: {
        lessonId: lesson.value?.id,
        type
      }
    });

    // Refresh lesson data to get updated progress
    await refreshNuxtData();
    
    if (type === 'practice') {
      alert('Practice marked as done! Now complete the exercise to finish the lesson.');
    } else {
      // SUCCESS: Automatic redirection
      alert('Lesson completed! 🎉 Returning to dashboard...');
      navigateTo('/dashboard');
    }
  } catch (error: any) {
    console.error('Failed to update progress:', error);
    if (error.statusCode === 401 || error.statusMessage?.includes('session')) {
      alert('Your session has expired. Please log in again.');
      navigateTo('/login');
    } else {
      alert(`Failed to save progress: ${error.statusMessage || 'Unknown error'}. Please try refreshing the page.`);
    }
  }
}
</script>
