<template>
    <div>
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
                    <h3 class="last text-bold">Dev</h3>
                </div>
            </div>
        </header-layout>
        <div class="pad-5">
            <div class="menu-item">
                <div>NOTIFICATIONS ID:</div>
                <div style="user-select: all">
                    {{ String($store.state.notificationsId) }}
                </div>
            </div>
            <br />
            <div class="menu-item">
                NOTIFICATIONS TYPE:
                <span style="user-select: all">{{ String($store.state.notificationsType) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderLayout from '@/components/layouts/HeaderLayout';

export default {
    components: {
        HeaderLayout
    }
};
</script>

<style></style>
