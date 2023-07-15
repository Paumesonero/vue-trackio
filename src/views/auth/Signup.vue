<script setup>
import { reactive } from 'vue';
import Card from "../../components/UI/Card.vue"
import trackioLogo from "../../assets/trackioLogo.png"
import Spinner from "../../components/UI/Spinner.vue"
import router from "../../router"
import { useUserStore } from "../../stores/users"
import { storeToRefs } from "pinia"

const userStore = useUserStore()
const { errorMessage, loading, user } = storeToRefs(userStore)
const userCredentials = reactive({
    email: '',
    password: '',
    username: ''
})

const clearUserCredentials = () => {
    userCredentials.email = ''
    userCredentials.username = ''
    userCredentials.password = ''
}
const handleSignupSubmit = async (e) => {
    e.preventDefault()
    await userStore.handleSignup(userCredentials)
    if (user.value) {
        clearUserCredentials()
        router.push('/')
    }
}
</script>
<template>
    <section class="container login-container">
        <Card>
            <Spinner v-if="loading" />
            <form @submit="handleSignupSubmit" name="signupForm" v-else>
                <div class="form-header">
                    <h1>Sign up</h1>
                    <img :src="trackioLogo" alt="trackioLogo" class="trackioLogo">
                </div>
                <div class="main-form-box">
                    <div class="input-container">
                        <input type="email" placeholder="Email" v-model="userCredentials.email">
                        <input type="text" placeholder="Username" v-model="userCredentials.username">
                        <input type="password" placeholder="Password" v-model="userCredentials.password">
                        <p>{{ errorMessage }}</p>
                    </div>
                    <button type="submit"> Signup</button>
                </div>

            </form>
        </Card>
    </section>
</template>
<style scoped>
.form-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.trackioLogo {
    width: 160px;
    border-radius: 10px;
}

.login-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.7rem;
    margin-bottom: 2rem;
}

h1 {
    text-align: center;
    font-size: 1.8rem;
    margin-top: 1rem;
}

.main-form-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 1rem;
    margin-left: 1.4rem;
    margin-right: 1.4rem;
}

.main-form-box button {
    width: 40%;
    padding: 8px 20px;
    border-radius: 10px;
    border: none;
    background-color: rgb(7, 22, 27);
    color: rgb(206, 199, 191);
    font-weight: 600;
    margin-top: 1rem;
}

.input-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.input-container input {
    width: 100%;
    background-color: transparent;
    border-style: none none solid none;
    border-width: 1px;
    border-color: black;
    outline: none;
    padding-left: 0.3rem;
}
</style>