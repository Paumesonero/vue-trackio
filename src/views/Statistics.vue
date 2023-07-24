<script setup>
import Card from "../components/UI/Card.vue"
import Drawer from "../components/UI/Drawer.vue";
import OverallChart from "../components/charts/OverallChart.vue"

</script>

<template>
    <section class="container statistics-container">
        <div class="drawer-container">
            <Drawer />
        </div>
        <h2 class="statistics-heading">Statistics</h2>
        <div class="cards-container">
            <Card class="pie-chart-overall">
                <h6>Overall</h6>
                <OverallChart />
            </Card>
        </div>
    </section>
</template>
<style scoped>
.statistics-container {
    height: 100vh;
}

.drawer-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: #CEC7BF;
    padding-top: 15px;
    padding-right: 15px;
}

.statistics-heading {
    color: #CEC7BF;
    font-size: 1.8rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
}

.cards-container {
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>