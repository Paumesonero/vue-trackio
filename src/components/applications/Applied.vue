<script setup>
import AddModal from "../UI/AddModal.vue"
import JobCard from "../UI/JobCard.vue"
import Spinner from "../UI/Spinner.vue"
import { supabase } from "../../supabase"
import { useUserStore } from "../../stores/users"
import { storeToRefs } from "pinia"
import { onMounted, ref } from 'vue'
import router from "../../router"

const applicationsFromDb = ref([])
const errorMessage = ref('')

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const isLoading = ref(false)
const openDetails = ref(false)

// we get data from api
const fetchApplications = async () => {

    const res = await supabase.from('applications').select().eq('user_id', user.value.id).eq('status', 'applied')
    if (res.data.length >= 1) {
        applicationsFromDb.value = res.data

        return applicationsFromDb.value.reverse()
    } else {
        applicationsFromDb.value = []
    }
}

onMounted(() => {
    fetchApplications()
})
// we delete data from api
const handleDelete = async (item) => {
    const { data, error } = await supabase.from('applications').delete().eq('id', item.id)
    if (error) {
        return errorMessage.value = 'Oops something went wrong'
    } else {
        applicationsFromDb.value = applicationsFromDb.value.filter(
            (application) => application.id !== item.id
        )
    }
}
// various functions, to format date, dymanic class etc.
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('default', { dateStyle: 'long' }).format(date);
}

const cardClass = (index) => {
    return index % 2 === 0 ? 'white-card' : 'blue-card';
};

// we change the status of the specific item


const handleInterview = async (itemId) => {
    const { data, error } = await supabase.from('applications').update({ status: 'interview' }).eq('id', itemId)
    if (error) {
        console.error('Error updating status:', error);
        return;
    }
    fetchApplications()
}

const handleDeclined = async (itemId) => {
    const { data, error } = await supabase.from('applications').update({ status: 'declined' }).eq('id', itemId)
    if (error) {
        console.error('Error updating status:', error);
        return;
    }
    fetchApplications()
}

const handleDetails = (id) => {
    return router.push(`/application/${id}`)
}
</script>

<template>
    <n-message-provider>
        <section class="applications-box">
            <div class="top-header">
                <h2 class="applied-header">Applied</h2>
                <AddModal :fetchApplications="fetchApplications" />
            </div>
            <div class="applied-cards-wrapper">
                <div v-if="applicationsFromDb && applicationsFromDb.length === 0" class="empty-applications">
                    <h6>You don't have any applications yet</h6>
                    <font-awesome-icon icon="fa-solid fa-battery-empty" class="empty-icon" />
                </div>
                <div v-if="isLoading" class="isLoading">
                    <Spinner />
                </div>
                <TransitionGroup name="applications">
                    <div class="applied-cards" v-for="(application, index) in applicationsFromDb" :key="application.id"
                        v-if="!isLoading">
                        <JobCard v-if="applicationsFromDb" :class="cardClass(index)">
                            <!-- this could be a component -->
                            <div class="job-info">
                                <h3 class="role-title" @click="handleDetails(application.id)">{{ application.role }}</h3>
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
                                    <button @click="handleInterview(application.id)" class="btn-blue hover-btn">Inter <br>
                                        view</button>
                                    <button @click="handleDeclined(application.id)"
                                        class="btn-white hover-btn">Declined</button>
                                </div>

                            </div>
                            <!-- this could be a component -->
                        </JobCard>
                    </div>
                </TransitionGroup>
            </div>
        </section>
    </n-message-provider>
</template>
<style scoped>
.hover-btn:hover {
    cursor: pointer;
}

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

.isLoading {
    position: absolute;
    top: 300px;
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
    border: none;
    border-radius: 10px;
    font-weight: 600;
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

.white-card {
    background-color: rgb(206, 199, 191);
}

.white-card button.btn-blue {
    background-color: #3D737F;
}

.white-card button.btn-white {
    background-color: rgb(7, 22, 27);
    color: rgb(206, 199, 191);
}

.blue-card {
    background-color: #3D737F;
    color: rgb(206, 199, 191);
}

.blue-card button.btn-blue {
    background-color: rgb(206, 199, 191)
}

.blue-card button.btn-white {
    background-color: rgb(7, 22, 27);
    color: rgb(206, 199, 191);
}

.empty-applications {
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    color: rgb(206, 199, 191);
}

.empty-icon {
    font-size: 2rem;
}


/* transitions */

.applications-enter-from {
    opacity: 0;
    transform: scale(0.5);
}

.applications-enter-to {
    opacity: 1;
    transform: scale(1);
}

.applications-enter-active {
    transition: all 1s ease;
}

.applications-leave-from {
    opacity: 1;
    transform: scale(1);
}

.applications-leave-to {
    opacity: 0;
    transform: scale(0);
}

.applications-leave-active {
    transition: all 0.6s ease;
    position: absolute;
}

.applications-move {
    transition: all 0.5 ease;
}
</style>