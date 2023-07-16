<script setup>
import AddModal from "../UI/AddModal.vue"

</script>
<template>
    <section class="applications-box">
        <div class="top-header">
            <h2 class="applied-header">Applied</h2>
            <AddModal />
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
}

.top-header {
    min-width: 300px;
    display: flex;
    justify-content: center;
    gap: 25px;
}
</style>