<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref, watch } from 'vue'
import { supabase } from "../../supabase"
import { useUserStore } from "../../stores/users"
import { storeToRefs } from "pinia"
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const appliedNum = ref(0)
const rejectedNum = ref(0)
const interviewNum = ref(0)
const hiredNum = ref(0)
const totalApplications = ref(0)

const calculateTotalApplications = () => {
    totalApplications.value = appliedNum.value + rejectedNum.value + interviewNum.value + hiredNum.value;
};
// fetcg DATA
const fetchAppliedApplications = async () => {
    const res = await supabase.from('applications').select().eq('user_id', user.value.id).eq('status', 'applied')
    if (res.data.length >= 1) {
        appliedNum.value = res.data.length
    } else {
        appliedNum.value = 0
    }
}
const fetchDeclinedApplications = async () => {
    const res = await supabase.from('applications').select().eq('user_id', user.value.id).eq('status', 'declined')
    if (res.data.length >= 1) {
        rejectedNum.value = res.data.length
    } else {
        rejectedNum.value = 0
    }
}
const fetchInterviewApplications = async () => {
    const res = await supabase.from('applications').select().eq('user_id', user.value.id).eq('status', 'interview')
    if (res.data.length >= 1) {
        interviewNum.value = res.data.length
    } else {
        interviewNum.value = 0
    }
}
const fetchHiredApplications = async () => {
    const res = await supabase.from('applications').select().eq('user_id', user.value.id).eq('status', 'hired')
    if (res.data.length >= 1) {
        hiredNum.value = res.data.length
    } else {
        hiredNum.value = 0
    }
}


let myChart = null;
const labels = ['Applied/Pending', 'rejected', 'interview', 'hired'];
const ctxRef = ref(null);
const updateChart = () => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Applications',
            backgroundColor: [
                '#003F5C',
                '#FF6361',
                '#FFA600',
                '#58508D'
            ],
            data: [appliedNum.value, rejectedNum.value, interviewNum.value, hiredNum.value]
        }]
    };

    if (myChart) {
        myChart.data = data;
        myChart.update();
    } else {
        const ctx = ctxRef.value;
        if (ctx) {
            myChart = new Chart(ctx, {
                type: 'pie',
                data: data,
                options: {}
            });
        }
    }
};


onMounted(async () => {
    ctxRef.value = document.getElementById('myChartCanvas');
    await fetchAppliedApplications();
    await fetchDeclinedApplications();
    await fetchHiredApplications();
    await fetchInterviewApplications();
    calculateTotalApplications()
    updateChart();
});

watch([appliedNum, rejectedNum, interviewNum, hiredNum], () => {
    calculateTotalApplications()
    updateChart();
});
</script>
<template>
    <canvas id="myChartCanvas"></canvas>
    <div class="total-applications">
        Total Applications: <span>{{ totalApplications }}</span>
    </div>
</template>
<style scoped>
.total-applications {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

span {
    font-size: 1.3rem;
    font-weight: 600;
}
</style>