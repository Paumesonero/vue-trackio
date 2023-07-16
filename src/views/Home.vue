<script setup>
import router from "../router";
import { useUserStore } from "../stores/users"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const handleLogoutButton = async () => {
    await userStore.handleLogout()
    router.push('/login')
}
</script>
<template>
    <section class="container home-container">
        <h5>Welcome back {{ user && user.username }}</h5>
        <button @click="handleLogoutButton">logout</button>
    </section>
</template>
<style scoped>
.home-container {
    height: 100vh;
    color: white;
}
</style>