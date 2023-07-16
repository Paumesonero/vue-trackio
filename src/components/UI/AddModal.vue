<script setup>
import { ref } from 'vue';
const open = ref(false);

const showModal = () => {
    open.value = true;
};

const handleOk = (e) => {
    console.log(e);
    open.value = false;
};
</script>
<template>
    <div>
        <a-button class="test" @click="showModal">Add</a-button>
        <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-modal>
    </div>
</template>
<style scoped>
.test {
    background-color: #CEC7BF;
    padding: 1px 10px;
}
</style>
