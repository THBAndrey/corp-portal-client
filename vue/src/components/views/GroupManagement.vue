<template>
    <div class="d-flex flex-col flex-grow scroll-hide">
        <header-layout>
            <div class="row row-collapse w-100">
                <div class="col col-auto">
                    <div
                        class="btn btn-icon round mar-right-l1"
                        style="margin: -6px 0 -6px -12px;"
                        v-ripple
                        @click="$router.push('/group/' + $route.params.id)"
                    >
                        <div class="icon">
                            <i class="mdi mdi-arrow-left mdi-18px"></i>
                        </div>
                    </div>
                </div>
                <div class="col col-vmid">
                    <h3 class="last text-bold">Управление</h3>
                </div>
            </div>
        </header-layout>
        <content-layout>
            <div class="d-flex flex-col scroll-hide">
                <router-link tag="div" to="management/edit-group">
                    <div v-ripple class="menu-item">
                        <div class="icon mar-right-5 color-primary">
                            <i class="mdi mdi-information-outline mdi-24px"></i>
                        </div>
                        <div>Информация</div>
                    </div>
                </router-link>
                <router-link tag="div" to="members">
                    <div v-ripple class="menu-item">
                        <div class="icon mar-right-5 color-primary">
                            <i class="mdi mdi-account-multiple-outline mdi-24px"></i>
                        </div>
                        <div>Участники</div>
                    </div>
                </router-link>
                <router-link tag="div" to="management/applications">
                    <div class="row row-collapse menu-item">
                        <div class="col col-auto">
                            <div class="icon mar-right-5 color-primary">
                                <i class="mdi mdi-account-arrow-right-outline mdi-24px"></i>
                            </div>
                        </div>
                        <div class="col">
                            Заявки
                        </div>
                        <!-- <div class="col col-auto">
                            <span class="badge color-white bg-grey round text-small">1</span>
                        </div> -->
                    </div>
                </router-link>
            </div>
        </content-layout>
    </div>
</template>

<script>
import HeaderLayout from '@/components/layouts/HeaderLayout';
import ContentLayout from '@/components/layouts/ContentLayout';

export default {
    components: {
        HeaderLayout,
        ContentLayout
    },
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
.menu-item {
    display: flex;
    align-items: center;
    height: 55px;
    padding: 0 16px;
    background-color: white;
}

.badge {
    width: 30px;
    height: 30px;
    justify-content: center;
}
</style>
