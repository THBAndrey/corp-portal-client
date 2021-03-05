<template>
    <div v-if="value" @click.self="$emit('input', false)" class="wrapper">
        <div class="dialog">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: Boolean
    }
};
</script>

<style scoped>
.wrapper {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
}

.dialog {
    width: 300px;
    max-width: 95vw;
    max-height: 90vh;
    background-color: #fff;
    overflow: auto;
    border-radius: 4px;
}
</style>
