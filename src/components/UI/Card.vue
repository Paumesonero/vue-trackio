<template>
    <div class="card_container">
        <slot></slot>
    </div>
</template>

<style scoped>
.card_container {
    border-radius: 15px;
    padding: 1rem;
    margin-bottom: 0.3rem;
    box-shadow: 0px 0px 14px 7px rgba(0, 0, 0, 0.1);
    max-width: 350px;
    min-width: 350px;
    margin-left: 1rem;
    margin-right: 1rem;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(206, 199, 191);
}
</style>