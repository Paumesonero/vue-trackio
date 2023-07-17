<script setup>
import router from "../router";
import Applied from "../components/applications/Applied.vue";
import Carrousel from "../components/UI/Carrousel.vue";
import Drawer from "../components/UI/Drawer.vue";
import { useUserStore } from "../stores/users"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

</script>
<template>
    <section class="container home-container">
        <div class="home-header">
            <div class="drawer-container">
                <Drawer />
            </div>
            <h3 class="username-greeting">Hi,{{ user && user.username }}</h3>
            <div class="job-applications-container">
                <h6 class="h6-label">Manage my <br /> job applications</h6>
            </div>
        </div>
        <div class="applications">
            <Carrousel />
        </div>

    </section>
</template>

<style scoped>
.home-container {
    height: 100vh;
    color: #CEC7BF;
}

.username-greeting {
    font-size: 1.8rem;
}

.h6-label {
    font-size: 1.2rem;
}

.home-header {
    height: 28vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1px;
    border-bottom: 1px solid #CEC7BF;
}

.drawer-container {
    align-self: flex-end;
    margin-right: 15px;
    margin-top: 15px;
}

.job-applications-container {
    max-width: 500px;
    min-width: 300px;
    height: 6.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #3D737F;
    padding: 10px 15px;
    border-radius: 10px;

}

.applications {
    height: 72vh;
}

/********** Media Queries */

/* M */
@media (min-width: 768px) {
    .applications {
        display: flex;
        justify-content: center;
    }
}
</style>