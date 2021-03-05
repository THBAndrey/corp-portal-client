<template>
    <div class="toast-manager pos-fixed pos-bot-center mar-bot-l5" style="z-index: 99999">
        <transition-group tag="div" name="transition-toast">
            <div class="text-center" v-for="item of queue" :key="item.id">
                <div class="toast mar-top-3" @click="dismissToast(item.id)">
                    {{ item.text }}
                </div>
            </div>
        </transition-group>
    </div>
</template>
<style lang="less" scoped>
.transition-toast {
    &-enter-active,
    &-leave-active {
        transition: all 0.2s ease;
    }
    &-enter {
        opacity: 0;
    }
    &-leave-to {
        opacity: 0;
        transform: translateY(-25%);
    }
}
</style>
<script>
import { EventBus, EventBusEvent } from '@/utils/EventBus';

export default {
    data() {
        return {
            id: 1,
            queue: []
        };
    },
    mounted() {
        EventBus.$on(EventBusEvent.SHOW_TOAST, this.onShowToast);
    },
    beforeUnmount() {
        EventBus.$off(EventBusEvent.SHOW_TOAST, this.onShowToast);
    },
    methods: {
        onShowToast(text) {
            this.addToast(text);
        },
        addToast(text, lifetime = 3000) {
            let id = this.id++;
            let timeout = setTimeout(() => this.dismissToast(id), lifetime);
            this.queue.push({
                id,
                text,
                timeout
            });
            return id;
        },
        dismissToast(id) {
            let i = this.queue.findIndex(e => e.id == id);
            if (i < 0) {
                return;
            }
            clearTimeout(this.queue[i].timeout);
            this.queue.splice(i, 1);
        }
    }
};
</script>
