<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

form{
  color: black;
}

input{
  color: black;
  border: 1px solid black;
}

.dialog {
  background: #fff;
  padding: 20px;
  width: 300px;
  height: auto;
  border-radius: 6px;
}
</style>

<script setup>
definePageMeta({
  layout: 'admin'
});

const page = ref(1);
const { data, pending, refresh } = await useFetch(() => `/api/admin/users?page=${page.value}`);

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
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

const showDlgNew = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const openDlgNew = () => {
  showDlgNew.value = true
}

const closeDlgNew = () => {
  showDlgNew.value = false
}

const createAccount = async () => {
  console.log('Create account:', { ...form })
  alert(`Account created for ${form.username} ${form.email}`)
  try{
    const { error } = await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
          email: form.email,
          password: form.password
        }
      })
      userStore.setUser(form.username);
      if (error) throw error

      alert('Tạo account thành công')

      // reset form
      form.username = ''
      form.email = ''
      form.password = ''

      closeDlgNew()
      refresh()
  }catch (err) {
    console.group('CREATE ACCOUNT ERROR')
    console.log('status:', err.statusCode)
    console.log('message:', err.data?.message)
    console.log('full error:', err)
    console.groupEnd()

    alert(err.data?.message || 'Tạo account thất bại')
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">User Management Bao</h1>
      <button @click="refresh" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition">
        🔄 Refresh
      </button>
      <button @click="openDlgNew" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition">        
        New User
      </button>
    </div>
    
    <!-- User Table -->
    <div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-900/50 text-gray-400 text-sm uppercase tracking-wider">
            <th class="p-6 font-medium">ID</th>
            <th class="p-6 font-medium">User</th>
            <th class="p-6 font-medium">Status</th>
            <th class="p-6 font-medium">Progress</th>
            <th class="p-6 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-if="pending">
            <td colspan="5" class="p-8 text-center text-gray-500">Loading users...</td>
          </tr>
          <tr v-else v-for="user in data.users" :key="user.id" class="hover:bg-gray-750 transition group">
            <td class="p-6 text-gray-500 font-mono">#{{ user.id }}</td>
            <td class="p-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {{ user.email[0].toUpperCase() }}
                </div>
                <div>
                  <div class="font-medium text-white">{{ user.email }}</div>
                  <div class="text-xs text-gray-500">Joined {{ new Date(user.createdAt).toLocaleDateString() }}</div>
                </div>
              </div>
            </td>
            <td class="p-6">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                Active
              </span>
            </td>
            <td class="p-6">
              <div class="flex items-center gap-2">
                <div class="flex-1 h-2 bg-gray-700 rounded-full w-24 overflow-hidden">
                  <div class="h-full bg-emerald-500" :style="{ width: user.progress + '%' }"></div>
                </div>
                <span class="text-xs text-gray-400">{{ user.progress }}%</span>
              </div>
            </td>
            <td class="p-6 text-right">
              <NuxtLink :to="`/admin/users/${user.id}`" class="text-emerald-400 hover:text-emerald-300 font-medium text-sm">
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

  <!-- Dialog Add new -->
  <div v-if="showDlgNew" class="overlay">
    <div class="dialog">
      <h3 class="text-black">Create account</h3>

      <form @submit.prevent="createAccount">
        <table cellspacing="2" cellpadding="2" border="1">
          <tr>
            <td><label>Username:</label></td>
            <td><input type="text" name="username" v-model="form.username"/></td>
          </tr>
          <tr>
            <td><label>Email:</label></td>
            <td><input type="email" name="email" v-model="form.email"/></td>       
          </tr>   
          <tr>
            <td><label>Password:</label></td>
            <td><input type="password" name="password" v-model="form.password"/></td>       
          </tr>
          <tr>
            <td colspan="2" class="text-right">
              <button type="button" @click="closeDlgNew" class="mr-4 px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded-lg text-sm transition">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition">
                Create
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
