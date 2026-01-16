<template>
  <div class="h-full w-full bg-slate-50 relative overflow-hidden flex flex-col" tabindex="0" @keydown="handleKeydown" ref="containerRef">
    
    <!-- Slides Container -->
    <div class="flex-1 relative overflow-hidden">
      <transition :name="transitionName">
        <div :key="currentSlideIndex" class="absolute inset-0 w-full h-full flex items-center justify-center p-8">
           <PresentationSlide 
             :title="currentSlideMetadata.title" 
             :subtitle="currentSlideMetadata.subtitle"
             :theme="currentSlideMetadata.theme"
           >
              <!-- Render Markdown Content -->
              <div class="prose prose-lg md:prose-2xl mx-auto text-center" v-html="currentSlideContent"></div>
           </PresentationSlide>
        </div>
      </transition>
    </div>

    <!-- Navigation Bar -->
    <div class="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-8 z-10 shrink-0">
       <button 
         @click="prev" 
         :disabled="currentSlideIndex === 0"
         class="px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-bold disabled:opacity-30 flex items-center gap-2 transition-colors"
       >
         ← Previous
       </button>

       <!-- Progress Dots -->
       <div class="flex gap-2">
         <button 
           v-for="(_, idx) in slides" 
           :key="idx"
           @click="currentSlideIndex = idx"
           class="w-2.5 h-2.5 rounded-full transition-all"
           :class="currentSlideIndex === idx ? 'bg-emerald-500 w-8' : 'bg-slate-300 hover:bg-slate-400'"
         />
       </div>

       <button 
         v-if="currentSlideIndex < slides.length - 1"
         @click="next" 
         class="px-4 py-2 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700 flex items-center gap-2 transition-colors transition-transform active:scale-95"
       >
         Next →
       </button>
       <button 
         v-else
         @click="$emit('finish')" 
         class="px-6 py-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
       >
         Finish Lesson 🎉
       </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps<{
  content: string;
}>();

const emit = defineEmits(['finish']);

const containerRef = ref<HTMLElement | null>(null);
const currentSlideIndex = ref(0);
const transitionName = ref('slide-next');
const md = new MarkdownIt({ html: true });

// Parse content into slides based on '---' delimiter
const slides = computed(() => {
  if (!props.content) return [];
  return props.content.split(/\n---\n/).map(slideRaw => {
     // Extract Metadata (simple top-level headers detection)
     // Supported format:
     // # Title
     // ## Subtitle
     // <!-- theme: emerald -->
     
     let raw = slideRaw.trim();
     let title = '';
     let subtitle = '';
     let theme: 'default' | 'emerald' | 'dark' = 'default';

     // Extract Theme
     const themeMatch = raw.match(/<!--\s*theme:\s*(default|emerald|dark)\s*-->/);
     if (themeMatch) {
        theme = themeMatch[1] as any;
        raw = raw.replace(themeMatch[0], '');
     }

     // Extract H1 as Title
     const titleMatch = raw.match(/^#\s+(.*)$/m);
     if (titleMatch) {
       title = titleMatch[1];
       raw = raw.replace(titleMatch[0], ''); // Remove title from body
     }

     // Extract H2 as Subtitle
     const subtitleMatch = raw.match(/^##\s+(.*)$/m);
     if (subtitleMatch) {
       subtitle = subtitleMatch[1];
       raw = raw.replace(subtitleMatch[0], ''); // Remove subtitle from body
     }

     return {
       title: title.trim(),
       subtitle: subtitle.trim(),
       theme,
       markdownBody: raw.trim()
     };
  });
});

const currentSlideMetadata = computed(() => slides.value[currentSlideIndex.value] || {});
const currentSlideContent = computed(() => {
   const body = slides.value[currentSlideIndex.value]?.markdownBody || '';
   return md.render(body);
});

const next = () => {
  if (currentSlideIndex.value < slides.value.length - 1) {
    transitionName.value = 'slide-next';
    currentSlideIndex.value++;
  }
};

const prev = () => {
  if (currentSlideIndex.value > 0) {
    transitionName.value = 'slide-prev';
    currentSlideIndex.value--;
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight' || e.key === 'Space') next();
  if (e.key === 'ArrowLeft') prev();
};

onMounted(() => {
  containerRef.value?.focus();
});
</script>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-next-enter-from { transform: translateX(100%); opacity: 0; }
.slide-next-leave-to { transform: translateX(-20%); opacity: 0; }

.slide-prev-enter-from { transform: translateX(-100%); opacity: 0; }
.slide-prev-leave-to { transform: translateX(20%); opacity: 0; }
</style>
