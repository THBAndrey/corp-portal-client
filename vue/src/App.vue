<template>
    <div id="app">
        <welcome-screen :propShow="$route.meta.authRequired"></welcome-screen>
        <component :is="layout">
            <router-view />
        </component>
        <toast-manager></toast-manager>
        <div class="popup popup-fixed" v-if="apiError">
            <div class="popup-dialog" style="max-width: 90%; min-width: 18rem">
                <div class="icon close" @click="apiError = null">
                    <i class="mdi mdi-close"></i>
                </div>
                <div class="popup-dialog-body">
                    <h3>Api error</h3>
                    <p>{{ apiError }}</p>
                </div>
                <div class="popup-dialog-footer text-right">
                    <span class="btn btn-ghost" @click="apiError = null">close</span>
                </div>
            </div>
        </div>
    </div>
</template>
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
<script>
import WelcomeScreen from '@/components/shared/WelcomeScreen';
import BasicLayout from '@/components/layouts/BasicLayout';
import MenuLayout from '@/components/layouts/MenuLayout';
import GroupLayout from '@/components/layouts/GroupLayout';
import FooterLayout from '@/components/layouts/FooterLayout';
import ToastManager from '@/components/managers/ToastManager';
import Mutation from '@/store/mutation';

export default {
    name: 'app',
    components: {
        WelcomeScreen,
        BasicLayout,
        FooterLayout,
        GroupLayout,
        ToastManager,
        MenuLayout
    },
    data() {
        return {
            showFooter: false,
            routerViewTransition: '',
            routerViewTransitionMode: 'out-in'
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
    },
    computed: {
        layout() {
            return (this.$route.meta.layout || 'basic') + '-layout';
        },
        apiError: {
            set(error) {
                this.$store.commit(Mutation.SET_API_ERROR, { error });
            },
            get() {
                return this.$store.state.apiError;
            }
        }
    },
    created() {
        // :hover fix for mobile devices
        document.addEventListener('touchstart', () => {}, true);
    },
    mounted() {}
};
</script>
