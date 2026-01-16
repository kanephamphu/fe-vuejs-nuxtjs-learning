<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="font-bold text-2xl tracking-tight text-emerald-600 flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <span class="text-xl">V</span>
          </div>
          VueMastery
        </NuxtLink>
        
        <div class="flex items-center gap-6">
          <template v-if="userStore.isAuthenticated">
            <NuxtLink to="/dashboard" active-class="text-emerald-600" class="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Dashboard</NuxtLink>
            <div class="h-4 w-px bg-slate-200"></div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-slate-700">{{ userStore.user?.email }}</span>
              <button @click="userStore.logout()" class="text-sm text-rose-500 hover:text-rose-600 font-medium">Logout</button>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Log in</NuxtLink>
            <NuxtLink to="/register" class="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-95">Get Started</NuxtLink>
          </template>
        </div>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();

// Init user on load
onMounted(() => {
  if (!userStore.isAuthenticated) {
    userStore.fetchUser();
  }
});
</script>
