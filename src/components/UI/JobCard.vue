<template>
    <div class="card_container">
        <slot></slot>
    </div>
</template>

<style scoped>
.card_container {
    border-radius: 15px;
    padding: 0.5rem;
    margin-bottom: 0.3rem;
    box-shadow: 0px 0px 14px 7px rgba(0, 0, 0, 0.1);
    margin-top: 1.5rem;
    max-width: 350px;
    min-width: 350px;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 115px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    background-color: rgb(206, 199, 191);
}
</style>