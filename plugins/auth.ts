export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore();
  
  if (!userStore.isAuthenticated) {
    await userStore.fetchUser();
  }
});
