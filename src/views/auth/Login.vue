<script setup>
import Card from "../../components/UI/Card.vue"
</script>
<template>
    <section class="container login-container">
        <Card>
            <form action="">
                <h1>Welcome to Trackio</h1>
                <div class="main-form-box">
                    <div class="input-container">
                        <input type="text" placeholder="Username">
                        <input type="text" placeholder="Password">
                    </div>

                    <p>Don't you have an account yet? sign up <RouterLink to="/signup" class="signup-link">here</RouterLink>
                    </p>
                    <button type="submit"> Login</button>
                </div>

            </form>

        </Card>
    </section>
</template>
<style scoped>
.login-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5rem;
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

.main-form-box p {
    font-size: 0.8rem;
    margin-top: 0.25rem;
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
    border-color: rgb(7, 22, 27);
    outline: none;
    padding-left: 0.3rem;
}

.signup-link {
    text-decoration: none;
    color: rgb(61, 115, 127);
}
</style>