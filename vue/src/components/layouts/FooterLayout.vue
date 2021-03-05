<template>
    <div class="footer pos-rel">
        <div class="row row-collapse">
            <div class="col" v-for="link in links" :key="link.title">
                <router-link class="btn footer-btn text-small radius-none color-grey w-100" active-class="active" :to="link.to">
                    <div class="icon">
                        <i :class="link.icon" class="mdi mdi-24px"></i>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="footer-slider pos-abs pos-bot bg-primary" :style="sliderStyle"></div>
    </div>
</template>
<style lang="less" scoped>
.footer-slider {
    height: 3px;
    transition: all 0.2s ease-out;
}
</style>
<script>
export default {
    data() {
        return {
            linkActiveIndex: 0
        };
    },
    watch: {
        $route: {
            handler: function (newVal) {
                this.linkActiveIndex = this.links.findIndex(link => newVal.name.indexOf(link.to.name) === 0);
            },
            immediate: true
        }
    },
    computed: {
        sliderStyle() {
            let w = 100 / this.links.length;
            let x = this.linkActiveIndex * w;
            return {
                left: `${x}%`,
                width: `${w}%`
            };
        },
        links() {
            let routes = this.$router.options.routes.filter(r => r.meta && r.meta.showInFooterLinks);
            return routes.map(({ name, meta }) => {
                return { title: meta.title, icon: meta.icon, to: { name } };
            });
        }
    }
};
</script>
