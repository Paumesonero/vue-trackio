<script setup>
import { useUserStore } from "../stores/users"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { user } = storeToRefs(userStore)


</script>
<template>
    <section class="container home-container">
        <h5>Welcome back {{ user.username }}</h5>
    </section>
</template>
<style scoped>
.home-container {
    height: 100vh;
    color: white;
}
</style>