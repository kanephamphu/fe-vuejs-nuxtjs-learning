<script setup>
definePageMeta({
  layout: 'admin'
});

const page = ref(1);
const { data, pending, refresh } = await useFetch(() => `/api/roadmaps?page=${page.value}`);

const nextPage = () => {
  page.value++;
  window.scrollTo(0,0);
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    window.scrollTo(0,0);
  }
};


import { reactive, ref } from 'vue'
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Roadmap Management</h1>
      <button @click="refresh" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition">
        🔄 Refresh
      </button>      
    </div>
    
    <!-- User Table -->
    <div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-900/50 text-gray-400 text-sm uppercase tracking-wider">
            <th class="p-6 font-medium">ID</th>
            <th class="p-6 font-medium">Title</th>
            <th class="p-6 font-medium">Description</th>
            <th class="p-6 font-medium">Created</th>
            <th class="p-6 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-if="pending">
            <td colspan="5" class="p-8 text-center text-gray-500">Loading users...</td>
          </tr>
          <tr v-else v-for="roadmap in data.roadmaps" :key="roadmap.id" class="hover:bg-gray-750 transition group">
            <td class="p-6 text-gray-500 font-mono">{{ roadmap.id }}</td>
            <td class="p-6">
              {{ roadmap.title }}
            </td>
            <td class="p-6">
              {{ roadmap.description }}
            </td>
            <td class="p-6">
              {{ new Date(roadmap.createdAt).toLocaleDateString()}}
            </td>
            <td class="p-6 text-right">
              <NuxtLink :to="`/admin/roadmaps/${roadmap.id}`" class="text-emerald-400 hover:text-emerald-300 font-medium text-sm">
                View Details →
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Pagination -->
      <div class="p-4 border-t border-gray-700 flex justify-between items-center bg-gray-900/30">
        <span class="text-sm text-gray-500">Showing page {{ page }}</span>
        <div class="space-x-2">
          <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 bg-gray-700 disabled:opacity-50 rounded text-sm hover:bg-gray-600 transition">Previous</button>
          <button @click="nextPage" class="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600 transition">Next</button>
        </div>
      </div>
    </div>
  </div>

  
</template>
