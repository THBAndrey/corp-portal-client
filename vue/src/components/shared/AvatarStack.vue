<template>
    <div class="d-flex" style="flex-direction: row-reverse">
        <div
            v-for="(avatar, i) in avatars ? avatars : numMembers > 5 ? 5 : numMembers"
            :key="i"
            class="pos-rel"
            style="height: 20px"
            :style="i != 0 ? 'margin-right: -5px' : ''"
        >
            <v-lazy-image
                class="mini-avatar"
                :src="avatars ? avatar : imgPlaceholder"
                @error.native="$e => ($e.target.src = imgPlaceholder)"
                :style="{ 'object-fit': 'cover' }"
            ></v-lazy-image>
            <div
                class="mini-avatar pos-abs d-flex flex-v-center flex-h-center"
                v-if="i == 0 && numMembers > 5"
                style="top: 0; background-color: rgba(0, 0, 0, 0.6)"
            >
                <span class="mdi mdi-dots-horizontal" style="color: white; font-size: 11px"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        avatars: {
            type: Array,
            defaut: null
        },
        numMembers: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            imgPlaceholder: 'img/avatar.png'
        };
    }
};
</script>

<style lang="less" scoped>
.mini-avatar {
    height: 20px;
    width: 20px;
    border-radius: 50%;

    border: 1px solid #ffffff;
    background-color: lightgray;
}
</style>
