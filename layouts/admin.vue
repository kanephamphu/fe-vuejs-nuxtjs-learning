<template>
  <div class="min-h-screen bg-gray-900 text-white flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 border-r border-gray-700 fixed h-full flex flex-col">
      <div class="p-6 border-b border-gray-700">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          CodeMastery
        </h1>
        <span class="text-xs text-gray-400 uppercase tracking-widest">Admin Panel</span>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <NuxtLink to="/admin" class="block px-4 py-3 rounded-lg hover:bg-gray-700 transition" active-class="bg-emerald-600 text-white shadow-lg">
          📊 Command Center
        </NuxtLink>
        <NuxtLink to="/admin/users" class="block px-4 py-3 rounded-lg hover:bg-gray-700 transition" active-class="bg-emerald-600 text-white shadow-lg">
          👥 User Management
        </NuxtLink>
        <div class="pt-4 mt-4 border-t border-gray-700">
          <NuxtLink to="/dashboard" class="block px-4 py-3 text-gray-400 hover:text-white transition">
            ⬅️ Back to App
          </NuxtLink>
        </div>
      </nav>

      <div class="p-4 border-t border-gray-700 text-center text-xs text-gray-500">
        v1.0.0 Admin Build
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 flex-1 p-8 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<style scoped>
/* Custom scrollbar for admin area */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #1f2937;
}
::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
</style>
