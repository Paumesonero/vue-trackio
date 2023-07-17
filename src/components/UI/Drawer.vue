<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        const active = ref(false);
        const placement = ref("right");
        const activate = (place) => {
            active.value = true;
            placement.value = place;
        };
        return {
            active,
            placement,
            activate
        };
    }
});
</script>
<template>
    <n-button-group>
        <font-awesome-icon @click="activate('bottom')" icon="fa-solid fa-bars" class="burger-icon" />
    </n-button-group>
    <n-drawer v-model:show="active" :width="502" :placement="placement">
        <n-drawer-content title="Stoner">
            Stoner is a 1965 novel by the American writer John Williams.
        </n-drawer-content>
    </n-drawer>
</template>
<style scoped>
.burger-icon {
    font-size: 2.5rem;
}
</style>

  
  