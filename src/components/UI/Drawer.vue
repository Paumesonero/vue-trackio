<script>
import { defineComponent, ref } from "vue";
import { RouterLink } from 'vue-router'
import { useUserStore } from "../../stores/users"
import router from "../../router";

export default defineComponent({
    setup() {
        const userStore = useUserStore()
        const active = ref(false);
        const placement = ref("right");
        const activate = (place) => {
            active.value = true;
            placement.value = place;
        };
        const handleLogoutButton = async () => {
            await userStore.handleLogout()
            router.push('/login')
        }
        return {
            active,
            placement,
            activate,
            handleLogoutButton
        };
    }
});
</script>
<template>
    <n-button-group>
        <font-awesome-icon @click="activate('bottom')" icon="fa-solid fa-bars" class="burger-icon" />
    </n-button-group>
    <n-drawer v-model:show="active" :width="502" :placement="placement" class="drawer">
        <div class="menu-content">
            <RouterLink to=""> See Statistics</RouterLink>
            <RouterLink to=""> Applied</RouterLink>
            <RouterLink to=""> Reached</RouterLink>
            <RouterLink to="">Declined </RouterLink>
            <RouterLink to=""> Interview</RouterLink>
            <RouterLink to=""> Hired</RouterLink>
            <button @click="handleLogoutButton" class="logout-btn">Logout</button>
        </div>
    </n-drawer>
</template>
<style scoped>
.burger-icon {
    font-size: 2.5rem;
}

.menu-content {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
    gap: 10px;
}

.logout-btn {
    background-color: transparent;
    border: none;
    max-width: 80px;
    padding: 0;
    margin: 0;
    text-align: left;
    font-weight: 600;
}
</style>

  
  