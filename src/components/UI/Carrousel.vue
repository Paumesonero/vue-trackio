<script  setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import Applied from '../applications/Applied.vue';
</script>

<template>
    <a-carousel arrows class="carousel">
        <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1; top:79px">
                <font-awesome-icon icon="fa-solid fa-circle-chevron-left" class="arrow-icon" />
            </div>
        </template>
        <template #nextArrow>
            <div class="custom-slick-arrow " style="right: 10px; top:79px">
                <font-awesome-icon icon="fa-solid fa-circle-chevron-right" class="arrow-icon" />
            </div>
        </template>
        <div>
            <Applied />
        </div>
        <div>
            <h3>2</h3>
        </div>
        <div>
            <h3>3</h3>
        </div>
        <div>
            <h3>4</h3>
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