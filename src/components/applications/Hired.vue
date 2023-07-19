<script setup>
import JobCard from "../UI/JobCard.vue"
import { supabase } from "../../supabase"
import { ref } from 'vue'

const { hiredApplications, fetchData } = defineProps(['hiredApplications', 'fetchData'])
const errorMessage = ref('')

// we delete data from api
const handleDelete = async (item) => {
    const { data, error } = await supabase.from('applications').delete().eq('id', item.id)
    if (error) {
        return errorMessage.value = 'Oops something went wrong'
    } else {
        hiredApplications.value = hiredApplications.filter(
            (application) => application.id !== item.id
        )
    }
    await fetchData()
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
const handleHired = async (itemId) => {
    const { data, error } = await supabase.from('applications').update({ status: 'hired' }).eq('id', itemId)
    if (error) {
        console.error('Error updating status:', error);
        return;
    }
    await fetchData()

}

</script>

<template>
    <section class="applications-box">
        <div class="top-header">
            <h2 class="applied-header">Hired</h2>
        </div>
        <div class="applied-cards-wrapper">
            <div v-if="hiredApplications && hiredApplications.length === 0" class="empty-applications">
                <h6>You don't have any applications yet</h6>
                <font-awesome-icon icon="fa-solid fa-battery-empty" class="empty-icon" />
            </div>

            <TransitionGroup name="applications">
                <div class="applied-cards" v-for="(application, index) in hiredApplications" :key="application.id">
                    <JobCard v-if="hiredApplications" :class="cardClass(index)">
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
                                <font-awesome-icon icon="fa-solid fa-trophy" class="trophy-icon" />
                                <p>Congrats!</p>
                            </div>

                        </div>
                        <!-- this could be a component -->
                    </JobCard>
                </div>
            </TransitionGroup>
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
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 80%;
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

.white-card {
    background-color: rgb(206, 199, 191);
}

.blue-card {
    background-color: #3D737F;
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

.trophy-icon {
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