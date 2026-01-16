<script setup>
definePageMeta({
  layout: 'admin'
});

const { data: stats, pending } = await useFetch('/api/admin/stats');
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Command Center</h1>

    <div v-if="pending" class="text-gray-400">Loading metrics...</div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Card 1: Total Users -->
      <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-400 text-sm mb-1">Total Students</p>
            <h3 class="text-4xl font-bold text-white">{{ stats.totalUsers }}</h3>
          </div>
          <div class="p-3 bg-blue-500/10 rounded-lg text-blue-400 text-2xl">👥</div>
        </div>
        <div class="mt-4 text-sm text-green-400">
          +{{ stats.activeToday }} active today
        </div>
      </div>

      <!-- Card 2: Completion Rate -->
      <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-400 text-sm mb-1">Avg. Completion</p>
            <h3 class="text-4xl font-bold text-white">{{ stats.averageCompletion }}%</h3>
          </div>
          <div class="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 text-2xl">📈</div>
        </div>
        <div class="mt-4 w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <div class="bg-emerald-500 h-full" :style="{ width: stats.averageCompletion + '%' }"></div>
        </div>
      </div>

      <!-- Card 3: Platform Health -->
      <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-400 text-sm mb-1">System Status</p>
            <h3 class="text-4xl font-bold text-white">Online</h3>
          </div>
          <div class="p-3 bg-green-500/10 rounded-lg text-green-400 text-2xl">🟢</div>
        </div>
        <div class="mt-4 text-sm text-gray-400">
          Latency: 24ms • Version 1.0.0
        </div>
      </div>
    </div>

    <!-- Recent Activity Placeholder -->
    <div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div class="p-6 border-b border-gray-700">
        <h3 class="text-xl font-semibold">Real-time Activity Feed</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div class="flex items-center gap-4 text-sm" v-for="i in 5" :key="i">
            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span class="text-gray-300">User <span class="text-white font-medium">Student #{{ i }}</span> completed <span class="text-emerald-400">Lesson {{ 80 + i }}</span></span>
            <span class="ml-auto text-gray-500 text-xs">{{ i }}m ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
