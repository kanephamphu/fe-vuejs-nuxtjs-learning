<template>
  <div class="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-slate-50" tabindex="0" @keydown="handleKeydown" ref="deckRef">
    
    <!-- Slides Container -->
    <div 
      class="w-full h-full flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <!-- Slide 1: Welcome -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide 
          title="Master Vue 3 & Nuxt 3" 
          subtitle="From Zero to Full Stack Hero"
        >
          <div class="flex flex-col items-center gap-6 mt-8">
            <div class="flex gap-4 mb-4">
               <div class="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center text-5xl shadow-lg transition-transform hover:scale-110">💚</div>
               <div class="w-24 h-24 bg-slate-800 rounded-2xl flex items-center justify-center text-5xl shadow-lg transition-transform hover:scale-110">▲</div>
            </div>
            <p class="text-xl">A comprehensive guide to modern web development.</p>
          </div>
        </PresentationSlide>
      </div>

      <!-- Slide 2: Agenda -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide title="Today's Session" subtitle="What we will cover">
          <div class="grid grid-cols-2 gap-8 text-left max-w-2xl mx-auto mt-8">
            <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
              <span class="text-2xl mb-2 block">🎯</span>
              <h4 class="font-bold text-slate-900">Target Audience</h4>
              <p class="text-sm text-slate-700 font-medium">Who is this course for?</p>
            </div>
            <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
              <span class="text-2xl mb-2 block">💡</span>
              <h4 class="font-bold text-slate-900">The Technology</h4>
              <p class="text-sm text-slate-700 font-medium">Vue.js & Nuxt.js explained</p>
            </div>
            <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
              <span class="text-2xl mb-2 block">🗺️</span>
              <h4 class="font-bold text-slate-900">Lesson Roadmap</h4>
              <p class="text-sm text-slate-700 font-medium">Detailed curriculum breakdown</p>
            </div>
            <div class="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
              <span class="text-2xl mb-2 block">🚀</span>
              <h4 class="font-bold text-slate-900">Why Use Them?</h4>
              <p class="text-sm text-slate-700 font-medium">Benefits & Career impact</p>
            </div>
          </div>
        </PresentationSlide>
      </div>

      <!-- Slide 3: Target Audience -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide title="Who Should Learn This?" subtitle="Is this course right for you?">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
             <div class="flex flex-col items-center p-6 bg-blue-50 rounded-2xl">
               <span class="text-4xl mb-4">👶</span>
               <h3 class="font-bold text-lg mb-2">Beginners</h3>
               <p class="text-sm text-slate-700 font-medium">New developers engaging in their first framework interaction, looking for an approachable entry point.</p>
             </div>
             <div class="flex flex-col items-center p-6 bg-purple-50 rounded-2xl">
               <span class="text-4xl mb-4">⚛️</span>
               <h3 class="font-bold text-lg mb-2">React Developers</h3>
               <p class="text-sm text-slate-700 font-medium">Experienced devs wanting to expand their toolkit with Vue's intuitive Composition API.</p>
             </div>
             <div class="flex flex-col items-center p-6 bg-emerald-50 rounded-2xl">
               <span class="text-4xl mb-4">🎨</span>
               <h3 class="font-bold text-lg mb-2">Designers</h3>
               <p class="text-sm text-slate-700 font-medium">Creatives who want to bring their high-fidelity UI designs to life with code.</p>
             </div>
          </div>
        </PresentationSlide>
      </div>

      <!-- Slide 4: What is Vue.js? -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide title="What is Vue.js?" subtitle="The Progressive JavaScript Framework">
          <div class="flex flex-col md:flex-row items-center gap-12 mt-8">
            <div class="w-48 h-48 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 animate-pulse">
               <span class="text-8xl">v</span>
            </div>
            <div class="text-left space-y-4">
              <p class="text-xl">Vue is a framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a decorative and component-based programming model.</p>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">✨ <strong>Declarative Rendering</strong>: HTML extended with template syntax</li>
                <li class="flex items-center gap-2">🔄 <strong>Reactivity</strong>: State changes automatically update the DOM</li>
              </ul>
            </div>
          </div>
        </PresentationSlide>
      </div>

       <!-- Slide 5: What is Nuxt.js? -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide title="What is Nuxt?" subtitle="The Intuitive Web Framework">
          <div class="flex flex-col md:flex-row-reverse items-center gap-12 mt-8">
            <div class="w-48 h-48 bg-slate-800 text-white rounded-full flex items-center justify-center shrink-0">
               <span class="text-8xl font-bold">N</span>
            </div>
             <div class="text-left space-y-4">
              <p class="text-xl">Nuxt constitutes a higher-level framework built on top of Vue. It abstracts away complex configuration to let you focus on shipping.</p>
               <ul class="grid grid-cols-2 gap-4 mt-4">
                <li class="bg-gray-100 p-3 rounded-lg text-sm text-center">Server-Side Rendering</li>
                <li class="bg-gray-100 p-3 rounded-lg text-sm text-center">Static Site Generation</li>
                <li class="bg-gray-100 p-3 rounded-lg text-sm text-center">File-system Routing</li>
                <li class="bg-gray-100 p-3 rounded-lg text-sm text-center">API Routes</li>
              </ul>
            </div>
          </div>
        </PresentationSlide>
      </div>

      <!-- Slide 6: Why Use Them? -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide title="Why Choose This Stack?" subtitle="Performance, Developer Experience, Scalability">
           <div class="space-y-6 mt-6 max-w-4xl mx-auto">
                 <div class="bg-white p-6 rounded-xl shadow-md border-l-8 border-emerald-500 flex gap-4 text-left">
               <div class="text-3xl">🚀</div>
               <div>
                 <h4 class="font-bold text-lg">Incredible Speed</h4>
                 <p class="text-slate-700 font-medium">Nuxt's hybrid rendering and code-splitting mean your app loads instantly, great for SEO and User Experience.</p>
               </div>
             </div>
             <div class="bg-white p-6 rounded-xl shadow-md border-l-8 border-blue-500 flex gap-4 text-left">
               <div class="text-3xl">😊</div>
               <div>
                 <h4 class="font-bold text-lg">Joyful Development</h4>
                 <p class="text-slate-700 font-medium">Single File Components (SFCs) keep HTML, CSS, and JS together. Auto-imports reduce boilerplate.</p>
               </div>
             </div>
             <div class="bg-white p-6 rounded-xl shadow-md border-l-8 border-purple-500 flex gap-4 text-left">
               <div class="text-3xl">📈</div>
               <div>
                 <h4 class="font-bold text-lg">Ecosystem Growth</h4>
                 <p class="text-slate-700 font-medium">A massive community with high-quality libraries (Tailwind, Pinia, Drizzle) standardizes your workflow.</p>
               </div>
             </div>
           </div>
        </PresentationSlide>
      </div>

      <!-- Slide 7: Lesson Plan - Phase 1 -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide title="Lesson Plan: Phase 1" subtitle="Vue 3 Fundamentals">
          <div class="max-w-4xl mx-auto mt-8 relative">
             <!-- Timeline line -->
             <div class="absolute left-8 top-0 bottom-0 w-1 bg-emerald-200"></div>
             
             <div class="space-y-8">
               <div class="flex items-center gap-6 relative">
                 <div class="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl z-10 shrink-0">01</div>
                 <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex-1 text-left">
                   <h4 class="font-bold text-lg">Vue Basics & Templates</h4>
                   <p class="text-sm text-slate-700 font-medium">Understanding the virtual DOM, reactivity system, and template syntax.</p>
                 </div>
               </div>
               <div class="flex items-center gap-6 relative">
                 <div class="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl z-10 shrink-0">02</div>
                 <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex-1 text-left">
                   <h4 class="font-bold text-lg">Composition API</h4>
                   <p class="text-sm text-slate-700 font-medium">Modern Vue development with `script setup`, `ref`, and `computed`.</p>
                 </div>
               </div>
                <div class="flex items-center gap-6 relative">
                 <div class="w-16 h-16 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xl z-10 shrink-0">03</div>
                 <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex-1 text-left">
                   <h4 class="font-bold text-lg">Components & State</h4>
                   <p class="text-sm text-slate-700 font-medium">Props, events, slots, and global state management with Pinia.</p>
                 </div>
               </div>
             </div>
          </div>
        </PresentationSlide>
      </div>

      <!-- Slide 8: Lesson Plan - Phase 2 -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide title="Lesson Plan: Phase 2" subtitle="Nuxt 3 Architecture">
           <div class="grid grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
              <div class="bg-slate-800 text-white p-6 rounded-2xl text-left">
                 <div class="text-emerald-400 text-xl font-mono mb-2">&lt;Routing /&gt;</div>
                 <p class="text-sm text-slate-300">Mastering file-system routing, dynamic pages, and nested layouts.</p>
              </div>
              <div class="bg-slate-800 text-white p-6 rounded-2xl text-left">
                 <div class="text-emerald-400 text-xl font-mono mb-2">useFetch()</div>
                 <p class="text-sm text-slate-300">Data fetching patterns, hydration, and handling async state.</p>
              </div>
               <div class="bg-slate-800 text-white p-6 rounded-2xl text-left">
                 <div class="text-emerald-400 text-xl font-mono mb-2">server/api</div>
                 <p class="text-sm text-slate-300">Building a robust backend API directly within your Nuxt application.</p>
              </div>
               <div class="bg-slate-800 text-white p-6 rounded-2xl text-left">
                 <div class="text-emerald-400 text-xl font-mono mb-2">Modules</div>
                 <p class="text-sm text-slate-300">Extending Nuxt with the rich ecosystem (Tailwind, Image, Content).</p>
              </div>
           </div>
        </PresentationSlide>
      </div>

      <!-- Slide 9: Lesson Plan - Phase 3 -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide title="Lesson Plan: Phase 3" subtitle="Full Stack Mastery">
          <p class="mb-8">Putting it all together to build real-world applications.</p>
          <div class="flex justify-center gap-4 flex-wrap">
             <div class="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center w-40">
               <span class="text-3xl mb-2">🔐</span>
               <span class="font-bold">Auth</span>
               <span class="text-xs text-slate-700 font-bold">JWT & Cookies</span>
             </div>
             <div class="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center w-40">
               <span class="text-3xl mb-2">🗄️</span>
               <span class="font-bold">Database</span>
               <span class="text-xs text-slate-700 font-bold">Drizzle & SQLite</span>
             </div>
             <div class="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center w-40">
               <span class="text-3xl mb-2">🛡️</span>
               <span class="font-bold">Validation</span>
               <span class="text-xs text-slate-700 font-bold">Zod Schemas</span>
             </div>
              <div class="p-4 bg-white shadow-lg rounded-xl flex flex-col items-center w-40">
               <span class="text-3xl mb-2">🚢</span>
               <span class="font-bold">Deploy</span>
               <span class="text-xs text-slate-700 font-bold">Edge & Serverless</span>
             </div>
          </div>
        </PresentationSlide>
      </div>

      <!-- Slide 10: Call to Action -->
      <div class="min-w-full h-full shrink-0">
        <PresentationSlide title="Ready to Start?" subtitle="Join us on this journey" theme="emerald">
          <div class="flex flex-col items-center gap-6 mt-8">
             <NuxtLink 
              to="/register" 
              class="px-12 py-4 bg-emerald-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:bg-emerald-700 hover:scale-105 transition-all"
            >
              Start Learning Now
            </NuxtLink>
             <div class="flex gap-8 text-emerald-900 font-bold mt-4">
               <span class="flex items-center gap-2">✅ Free Access</span>
               <span class="flex items-center gap-2">✅ Certificate Included</span>
             </div>
          </div>
        </PresentationSlide>
      </div>

    </div>

    <!-- Navigation Controls -->
    <div class="absolute bottom-8 left-0 w-full flex items-center justify-between px-8 md:px-16 pointer-events-none">
       <button 
         @click="prevSlide" 
         class="pointer-events-auto p-3 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-emerald-600 shadow-lg backdrop-blur-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
         :disabled="currentSlide === 0"
       >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
       </button>

       <!-- Slide Indicators -->
       <div class="flex gap-2 pointer-events-auto">
          <button 
            v-for="(_, index) in totalSlides" 
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-emerald-600 w-8' : 'bg-slate-300 hover:bg-slate-400'"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
       </div>

       <button 
         @click="nextSlide" 
         class="pointer-events-auto p-3 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-emerald-600 shadow-lg backdrop-blur-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
         :disabled="currentSlide === totalSlides - 1"
       >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
       </button>
    </div>

    <!-- Keyboard Hint -->
     <div class="absolute bottom-2 right-4 text-xs text-slate-400 pointer-events-none hidden md:block">
        Use <span class="font-mono bg-slate-100 p-1 rounded">←</span> <span class="font-mono bg-slate-100 p-1 rounded">→</span> to navigate
     </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const totalSlides = 10
const deckRef = ref<HTMLElement | null>(null)

const nextSlide = () => {
  if (currentSlide.value < totalSlides - 1) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight' || e.key === 'Space') {
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    prevSlide()
  }
}

onMounted(() => {
  // Focus the deck so keyboard events work immediately
  deckRef.value?.focus()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
   window.removeEventListener('keydown', handleKeydown)
})
</script>

