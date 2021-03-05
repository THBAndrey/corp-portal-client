<template>
    <div class="d-flex flex-col w-100 h-100">
        <header-layout>
            <div class="row row-collapse w-100">
                <div v-if="$route.meta.backButton" class="col col-auto">
                    <div class="btn btn-icon round mar-right-l1" style="margin: -6px 0 -6px -12px" v-ripple @click="$route.meta.backButton">
                        <div class="icon">
                            <i class="mdi mdi-arrow-left mdi-18px"></i>
                        </div>
                    </div>
                </div>
                <div class="col col-vmid">
                    <h3 class="last text-bold">{{ $route.meta.title }}</h3>
                </div>
                <div v-for="(button, icon, index) in $route.meta.headerButtons" :key="index" class="col-auto col-vmid">
                    <div
                        v-if="!button.condition || button.condition(slotComponent)"
                        class="round h-100 d-flex flex-col flex-v-center flex-h-center vote-button"
                        v-ripple
                        style="width: 28px"
                        @mousedown.stop
                        @click="button.method"
                    >
                        <i class="mdi mdi-18px" :class="icon" style="line-height: 14px"></i>
                    </div>
                </div>
            </div>
        </header-layout>

        <content-layout>
            <transition :name="routerViewTransition" :mode="routerViewTransitionMode">
                <keep-alive>
                    <slot></slot>
                </keep-alive>
            </transition>
        </content-layout>
        <footer-layout></footer-layout>
    </div>
</template>

<script>
// import Push from '../../utils/Push';
export default {
    components: {
        HeaderLayout: () => import('@/components/layouts/HeaderLayout'),
        ContentLayout: () => import('@/components/layouts/ContentLayout'),
        FooterLayout: () => import('@/components/shared/footer/Footer.vue')
    },
    data() {
        return {
            routerViewTransition: '',
            routerViewTransitionMode: 'out-in',
            slotComponent: null
        };
    },
    watch: {
        $route(to, from) {
            if (to.name == 'auth' || from.name == 'auth') {
                this.routerViewTransition = 'fade';
                return;
            }
            let f = from.path.split('/').length;
            let t = to.path.split('/').length;
            if (to.meta.pageIndex === from.meta.pageIndex) {
                this.routerViewTransitionMode = '';
                this.routerViewTransition = t > f ? 'zoomIn' : 'zoomOut';
            } else {
                this.routerViewTransitionMode = 'out-in';
                this.routerViewTransition = to.meta.pageIndex > from.meta.pageIndex ? 'next' : 'prev';
            }
        }
    }
};
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.footerAppear-enter-active {
    transition: all 0.3s ease-out;
}
.footerAppear-enter {
    transform: translateY(100%);
}

.zoomIn-enter-active,
.zoomIn-leave-active {
    transition: all 0.3s ease;
}
.zoomIn-leave-active {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
}
.zoomIn-enter-active {
    z-index: 1;
}
.zoomIn-enter {
    opacity: 0;
    //transform: scale(1.2);
}
.zoomIn-leave-to {
    //transform: scale(1.2);
    opacity: 0;
}

.zoomOut-enter-active,
.zoomOut-leave-active {
    transition: all 0.3s ease;
}
.zoomOut-leave-active {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    transform-origin: center center;
}
.zoomOut-enter {
    opacity: 0;
    //transform: scale(0.8);
}
.zoomOut-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.next-enter-active,
.next-leave-active,
.prev-enter-active,
.prev-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
}

.next-enter,
.prev-leave-active {
    opacity: 0;
    transform: translate(2em, 0);
}

.next-leave-active,
.prev-enter {
    opacity: 0;
    transform: translate(-2em, 0);
}
</style>
