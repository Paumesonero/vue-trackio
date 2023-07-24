<script setup>
import { useRoute, useRouter, RouterView } from "vue-router";
import { supabase } from "../supabase"
import { ref, onMounted } from 'vue'

const route = useRoute();
const applicationId = route.params.id
let application = ref(null)
const fetchApplication = async () => {
    try {
        const res = await supabase.from('applications').select().eq('id', applicationId).single()
        application.value = res.data
        console.log('testtt', application.value.role)
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
        <div>
            <h2 class="application-role">{{ application.role }}</h2>
        </div>
        <div>
            <h6>{{ application.company }}</h6>
            <h6>{{ application.location }}</h6>
            <h6>{{ application.platform }}</h6>
        </div>
        <div>
            <p>{{ application.description }}</p>
        </div>
        <div>
            <p>Useful links:</p>
            <p>{{ application.links }}</p>
        </div>

    </section>
</template>
<style scoped>
.application-container {
    color: #CEC7BF;
}

.application-container {
    min-height: 100vh;
    max-height: fit-content;
}
</style>