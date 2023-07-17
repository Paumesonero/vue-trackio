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
        <a-modal v-model:open="open" title="Add" @ok="handleOk">
            <input type="text" placeholder="Role">
            <input type="text" placeholder="Company">
            <input type="text" placeholder="Location">
            <p>Applied on:</p>
            <select name="" id="">
                <option value="">Linkedin</option>
                <option value="">Seek</option>
                <option value="">Infojobs</option>
                <option value="">Other</option>
            </select>
        </a-modal>
    </div>
</template>
<style scoped>
.test {
    background-color: #CEC7BF;
    padding: 1px 10px;
}
</style>
