<template>
    <transition name="animation">
        <div v-if="open" @click.self="$emit('change', false)" class="wrapper">
            <div class="manager">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        open: Boolean
    },
    model: {
        prop: 'open',
        event: 'change'
    }
};
</script>

<style lang="less" scoped>
.wrapper {
    position: fixed;
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);

    .manager {
        width: 100%;
        position: absolute;
        bottom: 0;
        max-height: 80vh;
        background-color: #fff;
        overflow: auto;
        border-radius: 15px 15px 0 0;
    }
}

.animation-enter-active,
.animation-leave-active {
    transition: opacity 0.3s;
    .manager {
        transition: bottom 0.3s;
    }
}
.animation-enter, .animation-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;

    .manager {
        bottom: -80vh;
    }
}
</style>
