<script setup>
import { ref } from "vue";

const showModal = ref(false)
const props = defineProps(['openModal']);
const bodyStyle = { width: '600px' }
const segmented = {
    content: "soft",
    footer: "soft"
}

if (props.openModal) {
    showModal.value = true
}

</script>
<template>
    <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="Modal" :bordered="false"
        size="huge" :segmented="segmented">
        <template #header-extra>
            Oops!
        </template>
        Content
        <template #footer>
            Footer
        </template>
    </n-modal>
</template>
  
  