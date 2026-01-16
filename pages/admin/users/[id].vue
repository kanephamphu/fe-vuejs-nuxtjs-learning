<script setup>
definePageMeta({
  layout: 'admin'
});

const route = useRoute();
const { data, pending, error } = await useFetch(() => `/api/admin/users/${route.params.id}`);
</script>

<template>
  <div v-if="pending" class="text-center p-12 text-gray-500">Loading profile...</div>
  <div v-else-if="error" class="text-center p-12 text-red-400">User not found</div>
  
  <div v-else>
    <!-- Header -->
    <div class="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-8 flex items-center gap-6 shadow-lg">
      <div class="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-inner">
        {{ data.user.email[0].toUpperCase() }}
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-1">{{ data.user.email }}</h1>
        <div class="flex items-center gap-4 text-sm text-gray-400">
          <span>🆔 User #{{ data.user.id }}</span>
          <span>📅 Joined {{ new Date(data.user.createdAt).toLocaleDateString() }}</span>
          <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">Verified Student</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: Analytics -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Progress Map -->
        <div class="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 class="text-lg font-semibold mb-6">Module Performance</h3>
          <div class="space-y-6">
            <div v-for="(count, module) in data.stats.progressMap" :key="module">
              <div class="flex justify-between mb-2">
                <span class="capitalize font-medium">{{ module }}</span>
                <span class="text-emerald-400 font-mono">{{ count }} Lessons</span>
              </div>
              <div class="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 transition-all duration-1000" :style="{ width: Math.min((count / 10) * 100, 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- History -->
        <div class="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 class="text-lg font-semibold mb-4">Lesson History</h3>
          <div class="max-h-96 overflow-y-auto pr-2 space-y-3">
            <div v-for="record in data.history" :key="record.lessonSlug" class="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full" :class="record.status === 'completed' ? 'bg-emerald-500' : 'bg-yellow-500'"></div>
                <span class="text-sm font-medium">{{ record.lessonTitle }}</span>
              </div>
              <span class="text-xs text-gray-500">{{ new Date(record.completedAt).toLocaleDateString() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Certificate & Actions -->
      <div class="space-y-6">
        <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6 text-center">
          <div class="text-6xl mb-4">🏆</div>
          <h3 class="text-xl font-bold mb-2">Certificate of Mastery</h3>
          <p class="text-gray-400 text-sm mb-6">Unlock this certificate when the student completes 100% of all modules.</p>
          <button disabled class="w-full py-3 bg-gray-700 text-gray-500 rounded-lg cursor-not-allowed font-medium">
            Not Yet Eligible
          </button>
        </div>

        <div class="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Admin Actions</h3>
          <div class="space-y-3">
            <button class="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition">Reset Password</button>
            <button class="w-full py-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-600/20 rounded-lg transition">Ban User</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
