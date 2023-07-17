<script setup>
import AddModal from "../UI/AddModal.vue"
import JobCard from "../UI/JobCard.vue"
import { supabase } from "../../supabase"
import { useUserStore } from "../../stores/users"
import { storeToRefs } from "pinia"
import { onMounted, ref, watch } from 'vue'

const applicationsFromDb = ref([])
const errorMessage = ref('')

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const fetchApplications = async () => {
    const res = await supabase.from('applications').select().eq('user_id', user.value.id)
    if (res.data.length >= 1) {
        applicationsFromDb.value = res.data
        return applicationsFromDb.value.reverse()
    }
}
onMounted(async () => {
    fetchApplications()
})

const handleDelete = async (item) => {
    const { data, error } = await supabase.from('applications').delete().eq('id', item.id)
    if (error) {
        return errorMessage.value = 'Oops something went wrong'
    } else {
        applicationsFromDb.value = applicationsFromDb.value.filter((item) => item.id !== application.id);
    }
}
watch(applicationsFromDb, async () => {
    const updatedApplications = await fetchApplications();
    applicationsFromDb.value = updatedApplications;
    return applicationsFromDb.value
})

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('default', { dateStyle: 'long' }).format(date);
}

</script>
<template>
    <section class="applications-box">
        <div class="top-header">
            <h2 class="applied-header">Applied</h2>
            <AddModal />
        </div>
        <div class="applied-cards-wrapper">
            <div class="applied-cards" v-for="application in applicationsFromDb" :key="application.id">
                <JobCard v-if="applicationsFromDb">
                    <!-- this could be a component -->
                    <div class="job-info">
                        <h3 class="role-title">{{ application.role }}</h3>
                        <p>{{ application.company }}</p>
                        <p>{{ application.location }}</p>
                        <p>{{ application.platform }}</p>
                    </div>
                    <div class="job-info-left">
                        <div class="date-close">
                            <p class="application-date">{{ formatDate(application.created_at) }}</p>
                            <font-awesome-icon icon="fa-solid fa-xmark" class="close-icon"
                                @click="handleDelete(application)" />
                        </div>

                        <div class="card-btns">
                            <button>Reached</button>
                            <button>Declined</button>
                        </div>

                    </div>
                    <!-- this could be a component -->
                </JobCard>

            </div>
        </div>

    </section>
</template>
<style scoped>
.applications-box {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.applied-header {
    font-size: 1.5rem;
    color: #CEC7BF;
}

.top-header {
    min-width: 300px;
    display: flex;
    justify-content: center;
    gap: 25px;
}

.applied-cards-wrapper {
    height: fit-content;
    margin-top: 1rem;
    max-height: 470px;
    /* Set a maximum height for the card wrapper */
    overflow: auto;
    scrollbar-color: #cec7bf;
}

.applied-cards {
    height: fit-content;
    overflow: auto;
    scrollbar-color: #CEC7BF;
}

.job-info {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.job-info-left {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    height: 100%;
    width: 40%;
}

.card-btns {
    display: flex;
    gap: 3px;

}

.card-btns button {
    font-size: 0.8rem;
    height: 68px;
    width: 68px;
}

.date-close {
    display: flex;
    width: 100%;
    gap: 20px;
}

.role-title {
    text-align: left;
    line-height: 15px;
}

.application-date {
    font-size: 0.8rem;
}

.close-icon:hover {
    cursor: pointer;
    font-size: 1.2rem;
}
</style>