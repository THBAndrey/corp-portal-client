<template>
    <div class="d-flex flex-col flex-grow scroll-hide">
        <header-layout>
            <div class="row row-collapse w-100">
                <div class="col col-auto">
                    <div class="btn btn-icon round mar-right-l1" style="margin: -6px 0px -6px -12px" v-ripple @click="$router.go(-1)">
                        <div class="icon">
                            <i class="mdi mdi-arrow-left mdi-18px"></i>
                        </div>
                    </div>
                </div>
                <div class="col col-vmid">
                    <h3 class="last text-bold">{{ $route.meta.title }}</h3>
                </div>
            </div>
        </header-layout>
        <content-layout>
            <div>
                <infinite-scroll :loadFunction="loadFunction">
                    <template v-slot="{ elements }">
                        <div v-for="(notification, index) in elements" :key="index" class="notification">
                            <div class="content">
                                <div style="font-weight: 500; font-size: 16px">Уведомление</div>
                                <div>{{ notification.text }}</div>
                            </div>
                        </div>
                    </template>
                </infinite-scroll>
            </div>
        </content-layout>
    </div>
</template>

<script>
import HeaderLayout from '@/components/layouts/HeaderLayout';
import ContentLayout from '@/components/layouts/ContentLayout';
import InfiniteScroll from '@/components/shared/InfiniteScroll';
export default {
    components: {
        HeaderLayout,
        ContentLayout,
        InfiniteScroll
    },
    methods: {
        async loadFunction(page) {
            return await this.$notificationApi.getCurrent(page);
        }
    }
};
</script>

<style lang="less" scoped>
.notification {
    width: 100%;
    padding: 16px;
    margin-bottom: -16px;

    .content {
        border-radius: 4px;
        padding: 8px;
        background-color: white;
    }
}
</style>
