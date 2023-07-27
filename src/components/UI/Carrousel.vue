<script  setup>
import Applied from '../applications/Applied.vue';
import Interview from '../applications/Interview.vue';
import Declined from '../applications/Declined.vue'
import Hired from '../applications/Hired.vue'
import { supabase } from "../../supabase"
import { useUserStore } from "../../stores/users"
import { storeToRefs } from "pinia"
import { ref } from 'vue'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
let declinedArr = ref([])
let interviewArr = ref([])
let hiredArr = ref([])
// we get data from api

const fetchDeclinedApplications = async () => {
    const res = await supabase.from('applications').select().eq('user_id', user.value.id).eq('status', 'declined')
    if (res.data.length >= 1) {
        declinedArr.value = res.data
        return declinedArr.value.reverse()
    } else {
        declinedArr.value = []
    }
}
const fetchInterviewApplications = async () => {
    const res = await supabase.from('applications').select().eq('user_id', user.value.id).eq('status', 'interview')
    if (res.data.length >= 1) {
        interviewArr.value = res.data
        return interviewArr.value.reverse()
    } else {
        interviewArr.value = []
    }
}
const fetchHiredApplications = async () => {
    const res = await supabase.from('applications').select().eq('user_id', user.value.id).eq('status', 'hired')
    if (res.data.length >= 1) {
        hiredArr.value = res.data
        return hiredArr.value.reverse()
    } else {
        hiredArr.value = []
    }
}
</script>
<template>
    <a-carousel arrows class="carousel">
        <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1; top:79px">
                <font-awesome-icon icon="fa-solid fa-circle-chevron-left" class="arrow-icon"
                    @click=" fetchDeclinedApplications(); fetchInterviewApplications(); fetchHiredApplications()" />
            </div>
        </template>
        <template #nextArrow>
            <div class="custom-slick-arrow " style="right: 10px; top:79px">
                <font-awesome-icon icon="fa-solid fa-circle-chevron-right" class="arrow-icon"
                    @click=" fetchDeclinedApplications(); fetchInterviewApplications(); fetchHiredApplications()" />
            </div>
        </template>
        <div>
            <Applied />
        </div>
        <div>
            <Interview :interviewApplications="interviewArr" :fetchData="fetchInterviewApplications" />
        </div>
        <div>
            <Declined :declinedApplications="declinedArr" :fetchData="fetchDeclinedApplications" />
        </div>
        <div>
            <Hired :hiredApplications="hiredArr" :fetchData="fetchHiredApplications" />
        </div>
    </a-carousel>
</template>
  
<style scoped>
/* For demo */
.arrow-icon {
    font-size: 2rem;
}

.carousel {
    max-width: 500px;
}

.carousel .ant-carousel-dots {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

:deep(.slick-slide) {
    text-align: center;
    height: 72vh;
    /* line-height: 160px; */
    background: transparent;
    overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 0.5;
}

/* :deep(.slick-slide h3) {} */
</style>