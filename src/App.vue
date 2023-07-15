<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue'
import { useUserStore } from "./stores/users"

const userStore = useUserStore()

onMounted(() => {
  userStore.getUser()
})

</script>
<template>
  <main>
    <RouterView />
  </main>
</template>
<style scoped>
main {
  background-color: rgb(7, 22, 27);
}
</style>