<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
      <h1 class="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
        Master <span class="text-emerald-600">Vue 3</span> & <span class="text-emerald-600">Nuxt 3</span>
        <span class="block text-slate-900 mt-2">Full Stack</span>
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-600">
        A comprehensive learning platform to take you from frontend fundamentals to backend mastery with Node.js and SQLite. Interactive exercises, real-time progress tracking, and modern practices.
      </p>
      <div class="mt-10 flex justify-center gap-x-6">
        <NuxtLink to="/register" class="group relative inline-flex items-center justify-center rounded-2xl bg-emerald-600 py-3 px-8 text-base font-semibold text-white hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/20 active:scale-95 transition-all duration-200">
          Start Learning Free
          <span class="absolute -right-1 -top-1 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </NuxtLink>
        <NuxtLink to="/login" class="inline-flex items-center justify-center rounded-2xl py-3 px-8 text-base font-semibold text-slate-900 ring-1 ring-slate-200 hover:ring-slate-300 hover:bg-slate-50 transition-all duration-200">
          Already have an account?
        </NuxtLink>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-600/10 transition-all bg-gradient-to-br from-white to-slate-50">
          <div class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-2xl">⚡️</div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Modern Stack</h3>
          <p class="text-slate-600">Learn the latest Nuxt 3 features, TailwindCSS, Pinia, and Drizzle ORM.</p>
        </div>
        <div class="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-600/10 transition-all bg-gradient-to-br from-white to-slate-50">
          <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-2xl">💻</div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Interactive Practice</h3>
          <p class="text-slate-600">Write code directly in the browser with our embedded Monaco editor.</p>
        </div>
        <div class="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-600/10 transition-all bg-gradient-to-br from-white to-slate-50">
          <div class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-2xl">📈</div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">Track Progress</h3>
          <p class="text-slate-600">Visualize your learning journey with detailed charts and offline support.</p>
        </div>
      </div>
    </div>
  </div>
</template>
