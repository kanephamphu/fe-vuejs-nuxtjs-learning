<template>
  <div class="exercise-viewer space-y-8 text-gray-100 max-w-4xl mx-auto">
    <div v-for="(item, idx) in exerciseState" :key="item.id || idx" class="animate-fade-in-up" :style="{ animationDelay: `${idx * 50}ms` }">
      
      <!-- Plain Text / Markdown -->
      <div v-if="item.type === 'text'" 
           class="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-emerald-400 prose-code:text-emerald-300 prose-code:bg-emerald-950/30 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-strong:text-white mb-6">
        <div v-html="renderMarkdown(item.content)"></div>
      </div>
      
      <!-- Standalone Checkbox (Knowledge Check) -->
      <div v-else-if="item.type === 'checkbox'" 
           class="group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer"
           :class="getStatusClass(item.status)"
           @click="toggleStandalone(item)">
        
        <!-- Hover Gradient -->
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

        <div class="relative flex items-center gap-5 p-5">
          <div class="flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300"
               :class="item.model ? 'bg-emerald-500 border-emerald-500 scale-110 shadow-lg shadow-emerald-500/30' : 'border-gray-500 bg-gray-900/50 group-hover:border-emerald-400'">
            <svg v-if="item.model" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span class="font-medium text-lg select-none" :class="item.model ? 'text-white' : 'text-gray-300 group-hover:text-white'">{{ item.text }}</span>
        </div>
      </div>

      <!-- Text Input Question -->
      <div v-else-if="item.type === 'input'" 
           class="relative p-1 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 shadow-xl">
        <div class="bg-gray-900 rounded-xl p-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <label class="block font-bold text-xl text-blue-400 mb-4 flex items-center gap-2">
            <span class="text-2xl">⚡</span> {{ item.label }}
          </label>
          
          <div class="relative group">
            <input type="text" v-model="item.model" 
                   class="w-full pl-5 pr-12 py-4 bg-gray-800/50 text-white rounded-xl border-2 border-gray-700 outline-none transition-all duration-300
                          focus:border-blue-500 focus:bg-gray-800 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]
                          placeholder:text-gray-600 text-lg font-mono"
                   :class="item.status === 'correct' ? '!border-emerald-500 !bg-emerald-950/10' : ''"
                   placeholder="Type your answer..."
                   @input="validateItem(item)">
            
            <!-- Status Icon -->
            <div class="absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 scale-0 opacity-0"
                 :class="item.status === 'correct' ? 'scale-100 opacity-100' : ''">
              <div class="bg-emerald-500 rounded-full p-1 shadow-lg shadow-emerald-500/40">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grouped Question (Multiple Choice) -->
      <div v-else-if="item.type === 'group'" 
           class="rounded-2xl border border-gray-700 bg-gray-900/80 backdrop-blur-sm overflow-hidden shadow-2xl">
        
        <!-- Header -->
        <div class="bg-white/5 p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
          <p class="font-bold text-xl text-indigo-300 leading-snug">{{ item.label }}</p>
          <span class="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
            {{ item.selection === 'single' ? 'Pick one' : 'Select all that apply' }}
          </span>
        </div>
        
        <!-- Options -->
        <div class="p-6 grid gap-3">
          <div v-for="opt in item.options" :key="opt.id" 
               class="group relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 active:scale-[0.99]"
               :class="getOptionClass(opt, item)"
               @click="selectOption(item, opt)">
            
            <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center border-2 transition-all duration-300"
                 :class="[
                   item.selection === 'single' ? 'rounded-full' : 'rounded-lg',
                   opt.model ? 'bg-indigo-500 border-indigo-500 shadow-md shadow-indigo-500/20' : 'border-gray-600 bg-gray-800/50 group-hover:border-indigo-400'
                 ]">
              <div v-if="opt.model" 
                   class="transition-transform duration-300"
                   :class="item.selection === 'single' ? 'w-2.5 h-2.5 rounded-full bg-white ring-2 ring-indigo-400/30' : ''">
                <svg v-if="item.selection === 'multiple'" class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <span class="flex-grow text-lg font-medium transition-colors" :class="opt.model ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'">
              {{ opt.text }}
            </span>

            <!-- Correct/Incorrect Indicator (only show if group is validated) -->
            <div v-if="item.status !== 'pending' && opt.model" class="absolute right-4">
               <span v-if="opt.model === opt.correct" class="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-500/30">CORRECT</span>
               <span v-else class="text-xs font-bold text-rose-400 bg-rose-950/50 px-2 py-1 rounded border border-rose-500/30">WRONG</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps<{
  instructions: string
}>();

const emit = defineEmits<{
  (e: 'update:completed', value: boolean): void
}>();

const md = new MarkdownIt({ html: true });

const renderMarkdown = (text: string) => md.render(text);

const parsedElements = computed(() => {
  const content = props.instructions || '';
  const lines = content.split('\n');
  const elements: any[] = [];
  
  let currentGroup: any = null;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentGroup) {
        finalizeGroup(currentGroup, elements);
        currentGroup = null;
      }
      return;
    }

    // Input question: ? Question ! Answer
    const inputMatch = line.match(/^\?\s+(.+)\s+!\s+(.+)/);
    if (inputMatch) {
      if (currentGroup) { finalizeGroup(currentGroup, elements); currentGroup = null; }
      elements.push({
        type: 'input',
        id: `in-${index}`,
        label: inputMatch[1].trim(),
        correctAnswer: inputMatch[2].trim(),
        model: '',
        status: 'pending'
      });
      return;
    }

    // Grouped question start: ? Question
    const questionMatch = line.match(/^\?\s+(.+)/);
    if (questionMatch) {
      // If we see a new question starter (?), check if it really is a new group or just a text line
      // Since inputMatch handled the '! Answer' case, this must be a multiple choice start
      if (currentGroup) { finalizeGroup(currentGroup, elements); }
      currentGroup = {
        type: 'group',
        id: `gr-${index}`,
        label: questionMatch[1].trim(),
        options: [],
        selection: 'single', // default
        status: 'pending'
      };
      return;
    }

    // Checkbox inside group or standalone: - [ ] text
    const checkboxMatch = line.match(/^-\s+\[( |x)\]\s+(.+)/i);
    if (checkboxMatch) {
      const isCorrectOption = checkboxMatch[1].toLowerCase() === 'x';
      const option = {
        id: `ch-${index}`,
        text: checkboxMatch[2].trim(),
        model: false,
        correct: isCorrectOption
      };

      if (currentGroup) {
        currentGroup.options.push(option);
      } else {
        elements.push({ type: 'checkbox', ...option, status: 'pending' });
      }
      return;
    }

    // Normal text
    if (currentGroup) { finalizeGroup(currentGroup, elements); currentGroup = null; }
    
    // Merge consecutive text blocks to avoid spacing issues
    const lastElement = elements[elements.length - 1];
    if (lastElement && lastElement.type === 'text') {
        lastElement.content += '\n' + line;
    } else {
        elements.push({ type: 'text', content: line });
    }
  });

  if (currentGroup) { finalizeGroup(currentGroup, elements); }
  return elements;
});

const finalizeGroup = (group: any, elements: any[]) => {
  const correctCount = group.options.filter((o: any) => o.correct).length;
  group.selection = correctCount > 1 ? 'multiple' : 'single';
  elements.push(group);
};

const exerciseState = ref<any[]>([]);

// Reset state when instructions change
watch(parsedElements, (newElements) => {
  exerciseState.value = JSON.parse(JSON.stringify(newElements));
}, { immediate: true });

const toggleStandalone = (item: any) => {
  item.model = !item.model;
  validateItem(item);
};

const selectOption = (group: any, option: any) => {
  if (group.selection === 'single') {
    group.options.forEach((o: any) => {
      o.model = o.id === option.id;
    });
  } else {
    option.model = !option.model;
  }
  validateGroup(group);
};

const validateItem = (item: any) => {
  if (item.type === 'checkbox') {
    item.status = item.model === item.correct ? 'correct' : 'pending';
  } else if (item.type === 'input') {
    if (!item.model.trim()) {
      item.status = 'pending';
    } else {
      const isCorrectValue = item.model.trim().toLowerCase() === item.correctAnswer.toLowerCase();
      item.status = isCorrectValue ? 'correct' : 'incorrect';
    }
  }
};

const validateGroup = (group: any) => {
  const isCorrect = group.options.every((opt: any) => opt.model === opt.correct);
  group.status = isCorrect ? 'correct' : 'incorrect';
  
  const noneSelected = group.options.every((opt: any) => !opt.model);
  if (noneSelected) group.status = 'pending';
};

const getStatusClass = (status: string) => {
  if (status === 'correct') return 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]';
  // Incorrect state isn't visually punished for checkboxes, just default back
  return 'bg-gray-800/40 border-gray-700 hover:border-gray-500 hover:bg-gray-800/60';
};

const getOptionClass = (opt: any, group: any) => {
  if (!opt.model) return 'bg-gray-800/30 border-gray-700/50 text-gray-400 hover:bg-gray-800/60 hover:border-gray-500';
  
  // Highlight based on group status (only if user made a choice)
  if (group.status === 'correct') return 'bg-emerald-950/40 border-emerald-500/50 shadow-inner';
  if (group.status === 'incorrect') return 'bg-rose-950/30 border-rose-500/50 shadow-inner';
  
  return 'bg-indigo-900/40 border-indigo-500/50';
};

const isReady = computed(() => {
  if (exerciseState.value.length === 0) return true;
  return exerciseState.value.every(item => {
    if (item.type === 'text') return true;
    return item.status === 'correct';
  });
});

watch(isReady, (val) => {
  emit('update:completed', val);
}, { immediate: true });
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
