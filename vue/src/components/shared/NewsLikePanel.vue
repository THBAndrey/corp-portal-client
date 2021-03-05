<template>
    <div :class="{ 'events-none': enabled != 1 }" class="d-flex">
        <div class="round d-flex flex-v-center flex-h-center mar-right-6" @mousedown.stop @click="onLike(1)">
            <div class="vote-button mar-right-3" v-ripple>
                <i class="mdi mdi-thumb-up mdi-18px" style="line-height: 14px" :class="liked ? 'color-primary' : 'color-easy'"></i>
            </div>
            <span style="font-size: 12px">{{ numLikes }}</span>
        </div>
        <div class="round d-flex flex-v-center flex-h-center mar-right-6" @mousedown.stop @click="onLike(-1)">
            <div class="vote-button mar-right-3" v-ripple>
                <i class="mdi mdi-thumb-down mdi-18px" style="line-height: 14px" :class="disliked ? 'color-primary' : 'color-easy'"></i>
            </div>
            <span style="font-size: 12px">{{ numDislikes }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        newsId: {
            type: String,
            default: ''
        },
        enabled: {
            type: Boolean,
            default: true
        },
        numLikes: {
            type: Number,
            default: 0
        },
        numDislikes: {
            type: Number,
            default: 0
        },
        like: {
            type: Number,
            default: 0 // 0 - no; 1 - already liked; -1 - already disliked
        }
    },
    computed: {
        liked() {
            return this.like > 0;
        },
        disliked() {
            return this.like < 0;
        }
    },
    methods: {
        onLike(val) {
            if (val == this.like) {
                this.$emit('like', this.like, 0);
            } else {
                this.$emit('like', this.like, val);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.vote-button {
    height: 35px;
    width: 35px;
    background-color: rgb(241, 245, 249);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
}

.color-easy {
    color: rgba(44, 18, 109, 0.4);
}
</style>
