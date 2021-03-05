<template>
    <div class="pos-rel">
        <div @click="disabled ? () => {} : (openMenu = true)">
            <slot />
        </div>
        <div
            v-if="openMenu"
            v-on-clickaway="away"
            class="pos-abs dropdown"
            :style="(right ? 'right: 0;' : '') + (dropdown ? 'top: 37px;' : 'top: 0;')"
            style="width: max-content; z-index: 10000"
        >
            <slot name="menu" />
        </div>
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
    mixins: [clickaway],
    props: {
        disabled: Boolean,
        right: Boolean,
        dropdown: Boolean
    },
    data() {
        return {
            openMenu: false
        };
    },
    methods: {
        away() {
            this.openMenu = false;
        }
    }
};
</script>

<style></style>
