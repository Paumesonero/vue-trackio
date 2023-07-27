<script setup>
import { useRoute } from "vue-router";
import { supabase } from "../supabase"
import { ref, onMounted } from 'vue'
import Drawer from '../components/UI/Drawer.vue'

const route = useRoute();
const applicationId = route.params.id
let application = ref(null)
const fetchApplication = async () => {
    try {
        const res = await supabase.from('applications').select().eq('id', applicationId).single()
        application.value = res.data
    } catch (error) {
        console.error("Error fetching application data:", error);
    }


}
onMounted(async () => {
    await fetchApplication()
})

</script>
<template>
    <section class="container application-container" v-if="application">
        <div class="drawer-container">
            <Drawer />
        </div>
        <div class="application-role">
            <h2>{{ application.role }}</h2>
        </div>
        <div class="h6-container">
            <h6> <span class="info-label">Company:</span> {{ application.company }}</h6>
            <h6><span class="info-label">Location:</span> {{ application.location }}</h6>
            <h6><span class="info-label">Platform:</span> {{ application.platform }}</h6>
            <a v-if="application.links" :href="application.links" target="_blank" rel="noopener noreferrer"
                class="application-link"> Click <span class="info-label here-link">here</span> to Go to the
                application</a>
        </div>
        <div class="description-container">
            <p>
                {{ application.description }}
            </p>
        </div>
    </section>
</template>
<style scoped>
.drawer-container {
    align-self: flex-end;
    margin-right: 15px;
    margin-top: 15px;
}

.application-container {
    color: #CEC7BF;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    max-height: fit-content;
    max-height: fit-content;
}

.application-role {
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;

}

.application-role h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 1rem;
}

.info-label {
    color: #3D737F;
}

.h6-container {
    height: fit-content;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 1rem;
}

.h6-container h6 {
    font-size: 1.5rem;
}

.description-container {
    border: 1px solid #CEC7BF;
    max-width: 380px;
    min-width: 380px;
    padding: 20px 10px;
    min-height: 350px;
    border-radius: 10px;
    margin-top: 3rem;
    overflow-wrap: break-word;
    margin-bottom: 1rem;
}

.application-link {
    text-decoration: none;
    color: #CEC7BF;
}

.here-link {
    font-weight: 600;
    border-bottom: 1px solid #CEC7BF;
    padding-bottom: 2px;
}
</style>