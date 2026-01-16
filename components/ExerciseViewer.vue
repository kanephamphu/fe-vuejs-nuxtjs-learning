<template>
  <div class="exercise-viewer space-y-6 text-gray-100">
    <div v-for="(item, idx) in exerciseState" :key="item.id || idx" class="mb-4">
      <!-- Plain Text / Markdown -->
      <div v-if="item.type === 'text'" v-html="renderMarkdown(item.content)" class="prose prose-invert max-w-none text-gray-200"></div>
      
      <!-- Standalone Checkbox -->
      <div v-else-if="item.type === 'checkbox'" 
           class="flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-[0.99]"
           :class="getStatusClass(item.status)"
           @click="toggleStandalone(item)">
        <div class="flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200"
             :class="item.model ? 'bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-gray-400 bg-gray-800'">
          <svg v-if="item.model" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <label class="cursor-pointer flex-grow font-semibold text-lg">{{ item.text }}</label>
      </div>

      <!-- Text Input Question -->
      <div v-else-if="item.type === 'input'" 
           class="p-6 rounded-xl border-2 transition-all duration-200 space-y-4 bg-gray-900 shadow-xl"
           :class="getStatusClass(item.status)">
        <p class="font-bold text-xl text-white">{{ item.label }}</p>
        <div class="relative">
          <input type="text" v-model="item.model" 
                 class="w-full p-4 bg-gray-800 text-white rounded-lg border-2 border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all placeholder:text-gray-500 text-lg"
                 placeholder="Type your answer here..."
                 @input="validateItem(item)">
          <div v-if="item.status === 'correct'" class="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>
      </div>

      <!-- Grouped Question (Single/Multiple Choice) -->
      <div v-else-if="item.type === 'group'" 
           class="p-6 rounded-xl border-2 border-gray-700 bg-gray-900 shadow-2xl space-y-5">
        <div class="flex items-center justify-between border-b border-gray-800 pb-3">
          <p class="font-black text-2xl text-blue-400 tracking-tight">{{ item.label }}</p>
          <span class="text-[10px] font-black uppercase tracking-widest text-white bg-blue-600 px-3 py-1 rounded-full shadow-lg">
            {{ item.selection === 'single' ? 'Single Choice' : 'Multiple Choice' }}
          </span>
        </div>
        
        <div class="grid gap-3">
          <div v-for="opt in item.options" :key="opt.id" 
               class="flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none group active:scale-[0.98]"
               :class="getOptionClass(opt, item)"
               @click="selectOption(item, opt)">
            
            <!-- Visual Indicator (Radio or Checkbox style) -->
            <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center border-2 transition-all duration-200"
                 :class="[
                   item.selection === 'single' ? 'rounded-full' : 'rounded',
                   opt.model ? 'bg-blue-500 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-500 bg-gray-800 group-hover:border-gray-300'
                 ]">
              <div v-if="opt.model" 
                   :class="item.selection === 'single' ? 'w-2.5 h-2.5 rounded-full bg-white shadow-sm' : ''">
                <svg v-if="item.selection === 'multiple'" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <span class="flex-grow font-bold text-lg">{{ opt.text }}</span>
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
      elements.push({ type: 'text', content: '' });
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
      if (currentGroup) { finalizeGroup(currentGroup, elements); }
      currentGroup = {
        type: 'group',
        id: `gr-${index}`,
        label: questionMatch[1].trim(),
        options: [],
        selection: 'single' // default
      };
      return;
    }

    // Checkbox: - [ ] text or - [x] text
    const checkboxMatch = line.match(/^-\s+\[( |x)\]\s+(.+)/i);
    if (checkboxMatch) {
      const isCorrectOption = checkboxMatch[1].toLowerCase() === 'x';
      const option = {
        id: `ch-${index}`,
        text: checkboxMatch[2].trim(),
        model: false,
        correct: isCorrectOption,
        status: 'pending'
      };

      if (currentGroup) {
        currentGroup.options.push(option);
      } else {
        elements.push({ type: 'checkbox', ...option });
      }
      return;
    }

    // Normal text
    if (currentGroup) { finalizeGroup(currentGroup, elements); currentGroup = null; }
    elements.push({ type: 'text', content: line });
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
  
  // Also check if completely unselected
  const noneSelected = group.options.every((opt: any) => !opt.model);
  if (noneSelected) group.status = 'pending';
};

const getStatusClass = (status: string) => {
  if (status === 'correct') return 'bg-emerald-950/40 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.1)]';
  if (status === 'incorrect') return 'bg-rose-950/40 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.1)]';
  return 'bg-gray-900 border-gray-700 text-gray-300';
};

const getOptionClass = (opt: any, group: any) => {
  if (!opt.model) return 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white';
  
  if (group.status === 'correct') return 'bg-emerald-900/40 border-emerald-500 text-emerald-300 font-black';
  if (group.status === 'incorrect') return 'bg-blue-900/40 border-blue-500 text-blue-100 font-black';
  
  return 'bg-blue-900/40 border-blue-500 text-blue-100 font-black';
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
