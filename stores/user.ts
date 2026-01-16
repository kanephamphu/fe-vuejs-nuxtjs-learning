import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | { id: number; email: string },
    isAuthenticated: false,
  }),
  actions: {
    setUser(user: any) {
      this.user = user;
      this.isAuthenticated = !!user;
    },
    async fetchUser() {
      try {
        const headers = useRequestHeaders(['cookie']);
        const { user } = await $fetch('/api/auth/me', { headers });
        this.setUser(user);
      } catch (e) {
        this.setUser(null);
      }
    },
    async logout() {
      await $fetch('/api/auth/logout', { method: 'POST' });
      this.setUser(null);
      navigateTo('/login');
    }
  }
});
