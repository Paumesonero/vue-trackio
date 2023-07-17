<script setup>
import AddModal from "../UI/AddModal.vue"
import JobCard from "../UI/JobCard.vue"
</script>
<template>
    <section class="applications-box">
        <div class="top-header">
            <h2 class="applied-header">Applied</h2>
            <AddModal />
        </div>
        <div class="applied-cards">
            <JobCard>
                <div class="job-info">
                    <h3 class="role-title">Front End Developer</h3>
                    <p>Reddit</p>
                    <p>Auckland</p>
                    <p>LinkedIn</p>
                </div>
                <div class="job-info-left">
                    <div class="date-close">
                        <p>23/07/2023</p>
                        <p>X</p>
                    </div>

                    <div class="card-btns">
                        <button>Reached</button>
                        <button>Declined</button>
                    </div>

                </div>

            </JobCard>

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

.applied-cards {
    height: 46vh;
    margin-bottom: 2rem;
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
    gap: 14px;
}

.role-title {
    text-align: left;
    line-height: 15px;
}
</style>