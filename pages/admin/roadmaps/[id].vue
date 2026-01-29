<script setup>
definePageMeta({
  layout: 'admin'
});

const route = useRoute();
const { data, pending, error } = await useFetch(() => `/api/admin/roadmaps/${route.params.id}`);
</script>

<template>
  <div v-if="pending" class="text-center p-12 text-gray-500">Loading profile...</div>
  <div v-else-if="error" class="text-center p-12 text-red-400">Roadmap not found</div>
  
  <div v-else>
    <!-- Header -->
    <div class="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-8 flex items-center gap-6 shadow-lg">
      <div class="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-inner">
        {{ data.roadmap.id }}
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-1">{{ data.roadmap.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-gray-400">
          <span>🆔 #{{ data.roadmap.id }}</span>
          <span>Description #{{ data.roadmap.description }}</span>
          <span>📅 Created {{ new Date(data.roadmap.createdAt).toLocaleDateString() }}</span>
          <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">Verified Student</span>
        </div>
      </div>
    </div>

  </div> 
</template>
