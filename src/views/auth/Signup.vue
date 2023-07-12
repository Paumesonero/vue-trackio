<script setup>
import Card from "../../components/UI/Card.vue"
</script>
<template>
    <section class="container login-container">
        <Card>
            <form action="">
                <h1>Sign up</h1>
                <div class="main-form-box">
                    <div class="input-container">
                        <input type="text" placeholder="Email">
                        <input type="text" placeholder="Username">
                        <input type="text" placeholder="Password">
                    </div>
                    <button type="submit"> Signup</button>
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
    width: 100%;
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