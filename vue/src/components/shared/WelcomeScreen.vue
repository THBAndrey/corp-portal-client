<template>
    <transition name="welcome-fade">
        <div v-if="show && propShow" class="welcome-screen" :style="screenStyle">
            <div class="circle slide-bottom" :style="circleStyle"></div>
            <div class="smile-text slide-top-min">
                <div v-if="user" class="text-center">
                    <img class="welcome-smile" src="img/welcome/smile.png" alt="" />
                    <div v-if="image == 'morning'">Доброе утро,</div>
                    <div v-else-if="image == 'afternoon'">Добрый день,</div>
                    <div v-else-if="image == 'evening'">Добрый вечер,</div>
                    <div v-else>Доброй ночи,</div>
                    <div>{{ user.fio }}!</div>
                </div>
            </div>
            <div class="clouds slide-top scale-down-center" :style="cloudsStyle"></div>
            <div class="ground slide-top slide-top-min" :style="groundStyle"></div>
            <div class="forest slide-top slide-top-forest scale-down-center" :style="forestStyle"></div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props: {
        propShow: Boolean
    },
    data() {
        return {
            image: null,
            show: true
        };
    },
    computed: {
        ...mapState({
            user: 'user'
        }),
        screenStyle() {
            return {
                backgroundImage: `url(img/welcome/background/${this.image}_bg.png)`
            };
        },
        circleStyle() {
            return {
                backgroundImage: `url(img/welcome/circle/${this.image}_circle.png)`
            };
        },
        cloudsStyle() {
            return {
                backgroundImage: `url(img/welcome/clouds/${this.image}_clouds.png)`
            };
        },
        groundStyle() {
            return {
                backgroundImage: `url(img/welcome/ground/${this.image}_ground.png)`
            };
        },
        forestStyle() {
            return {
                backgroundImage: `url(img/welcome/forest/${this.image}_forest.png)`
            };
        }
    },
    methods: {
        timerFade() {
            setTimeout(() => {
                this.show = false;
            }, 3000);
        }
    },
    created() {
        let hours = new Date().getHours();
        if (hours > 0 && hours < 7) {
            this.image = 'night';
        } else if (hours > 6 && hours < 13) {
            this.image = 'morning';
        } else if (hours > 12 && hours < 19) {
            this.image = 'afternoon';
        } else {
            this.image = 'evening';
        }

        this.timerFade();
    },
    watch: {
        propShow(val) {
            if (val == true) {
                this.show = true;
                this.timerFade();
            }
        }
    }
};
</script>

<style lang="less" scoped>
.welcome-screen {
    z-index: 2;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-position: center;
    background-size: cover;
    transition: 0.5s;

    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-size: 21px;
    font-weight: 500;

    .welcome-smile {
        width: 20vw;
        height: 20vw;
        margin-top: 10vh;
        margin-bottom: 20px;
    }
}

.circle {
    z-index: 3;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    background-position: top;
    background-size: cover;
}

.clouds {
    z-index: 10;
    position: absolute;
    height: 200px;
    width: 100%;
    bottom: 200px;
    background-position: top;
    background-size: cover;
}

.forest {
    z-index: 15;
    position: absolute;
    height: 230px;
    width: 100%;
    bottom: 65px;
    background-position: top;
    background-size: cover;
}

.ground {
    z-index: 20;
    position: absolute;
    height: 80px;
    width: 100%;
    bottom: -40px;
    background-size: cover;
}

.smile-text {
    z-index: 25;
    position: absolute;
    top: 76px;
}

.slide-top,
.slide-top-min,
.slide-top-forest {
    animation: slide-top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.slide-bottom {
    animation: slide-bottom 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.scale-down-center {
    animation: scale-down-center 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/**
 * ----------------------------------------
 * animation slide-bottom
 * ----------------------------------------
 */
@keyframes slide-bottom {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(45%);
    }
}
/**
 * ----------------------------------------
 * animation slide-top
 * ----------------------------------------
 */
@keyframes slide-top {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-50%);
    }
}

@keyframes slide-top-min {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-3%);
    }
}

@keyframes slide-top-forest {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-60%);
    }
}
/**
 * ----------------------------------------
 * animation scale-down-center
 * ----------------------------------------
 */
@keyframes scale-down-center {
    0% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

.welcome-fade-enter-active,
.welcome-fade-leave-active {
    transition: opacity 1s;
}
.welcome-fade-enter,
.welcome-fade-leave-to {
    opacity: 0;
}
</style>
