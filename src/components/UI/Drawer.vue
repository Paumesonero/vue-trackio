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
    <n-drawer v-model:show="active" :width="502" :placement="placement" class="drawer" style="background-color: #CEC7BF;">
        <div class="menu-content">
            <RouterLink to="/statistics" class="see-statistics-btn"> See Statistics</RouterLink>
            <button @click="handleLogoutButton" class="logout-btn see-statistics-btn">Logout</button>
        </div>
    </n-drawer>
</template>
<style scoped>
.burger-icon {
    font-size: 2.5rem;
}

.see-statistics-btn {
    margin-top: 1rem;
    color: rgb(7, 22, 27);
    font-size: 1.5rem;
    border: none;
    text-decoration: none;

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
    max-width: 90px;
    padding: 0;
    margin: 0;
    text-align: left;
    font-weight: 400;
}
</style>

  
  