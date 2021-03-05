<template>
    <div class="d-flex flex-col flex-grow scroll-hide">
        <header-layout>
            <div class="row row-collapse w-100">
                <div class="col col-auto">
                    <div
                        class="btn btn-icon round mar-right-l1"
                        style="margin: -6px 0 -6px -12px;"
                        v-ripple
                        @click="$router.push('/group/' + $route.params.id + '/management')"
                    >
                        <div class="icon">
                            <i class="mdi mdi-arrow-left mdi-18px"></i>
                        </div>
                    </div>
                </div>
                <div class="col col-vmid">
                    <h3 class="last text-bold">Заявки</h3>
                </div>
            </div>
        </header-layout>
        <content-layout>
            <div v-for="(member, i) in applications" :key="i" class="row row-collapse pad-4">
                <div class="col col-auto col-vmid">
                    <div class="avatar round mar-right-4">
                        <img :src="String(member.photo)" @error="$e => ($e.target.src = avatarPlaceholder)" />
                    </div>
                </div>
                <div class="col col-vmid text-truncate">
                    <div class="text-small text-bold mar-bot-3">
                        {{ member.fio }}
                    </div>
                    <div>
                        <button @click="acceptInvite(member.id)" class="btn btn-primary btn-small mar-right-3">Принять</button>
                        <button @click="dissmissInvite(member.id)" class="btn btn-outline btn-small">Отклонить</button>
                    </div>
                </div>
            </div>
            <div class="pad-4 text-center text-small color-grey">{{ applications.length }} заявок</div>
        </content-layout>
    </div>
</template>

<script>
import HeaderLayout from '@/components/layouts/HeaderLayout';
import ContentLayout from '@/components/layouts/ContentLayout';
import { EventBus, EventBusEvent } from '@/utils/EventBus';

export default {
    components: {
        HeaderLayout,
        ContentLayout
    },
    data() {
        return {
            id: null,
            applications: null,
            avatarPlaceholder: 'img/avatar.png'
        };
    },
    methods: {
        async getApplications() {
            let data = await this.$groupApi.getGroupApplications(this.$route.params.id);
            this.id = this.$route.params.id;
            this.applications = data.members;
        },
        async acceptInvite(id) {
            try {
                await this.$groupApi.sendInvite(this.$route.params.id, id);
                let data = await this.$groupApi.getGroupApplications(this.$route.params.id);
                this.applications = data.members;
            } catch {
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Ошибка');
            }
        },
        async dissmissInvite(id) {
            try {
                await this.$groupApi.kickUser(this.$route.params.id, id);
                let data = await this.$groupApi.getGroupApplications(this.$route.params.id);
                this.applications = data.members;
            } catch {
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Ошибка');
            }
        }
    },
    activated() {
        if (this.id !== this.$route.params.id) {
            this.members = null;
        }
        this.getApplications();
    }
};
</script>

<style lang="less" scoped>
.avatar {
    width: 60px;
    height: 60px;
}
</style>
