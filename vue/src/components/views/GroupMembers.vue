<template>
    <div>
        <div v-if="members">
            <div class="group d-flex flex-col h-100">
                <ul class="tabs tabs-grow">
                    <li
                        @click="activeTab = 'members'"
                        :class="{ active: activeTab === 'members' }"
                        class="pad-left-6 pad-right-6 pad-top-3 pad-bot-3"
                    >
                        <span>Участники</span>
                        <span class="pull-right">{{ members.length }}</span>
                    </li>
                    <li
                        @click="activeTab = 'contacts'"
                        :class="{ active: activeTab === 'contacts' }"
                        class="pad-left-6 pad-right-6 pad-top-3 pad-bot-3"
                    >
                        <span>Контакты</span> <span class="pull-right">{{ '0' }}</span>
                    </li>
                </ul>
                <div v-if="activeTab === 'members'">
                    <div v-for="(member, index) in members" :key="index" class="row row-collapse pad-4">
                        <div class="col col-auto col-vmid">
                            <div class="avatar round mar-right-4">
                                <img :src="String(member.photo)" @error="$e => ($e.target.src = avatarPlaceholder)" />
                            </div>
                        </div>
                        <div class="col col-vmid text-truncate">
                            <div>
                                {{ member.fio }}
                            </div>
                            <div class="text-xsmall">
                                {{ member.role_name }}
                            </div>
                        </div>
                        <div class="col col-vmid col-auto">
                            <div class="btn btn-icon">
                                <div class="icon color-primary">
                                    <i class="mdi mdi-chat-outline mdi-24px"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="activeTab === 'contacts'" class="pad-6 text-center text-small color-grey">нет контактов</div>
            </div>
        </div>
        <load-layout v-else></load-layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            avatarPlaceholder: 'img/avatar.png',
            members: null,
            groupId: null,
            activeTab: 'members'
        };
    },
    methods: {
        async loadMembes() {
            let data = await this.$groupApi.getGroupMembers(this.$route.params.id);
            this.id = this.$route.params.id;
            this.members = data.members;
        }
    },
    activated() {
        if (this.$route.query.contacts) {
            this.activeTab = 'contacts';
        } else {
            this.activeTab = 'members';
        }
        if (this.id !== this.$route.params.id) {
            this.members = null;
        }
        this.loadMembes();
    }
};
</script>

<style lang="less" scoped>
.avatar {
    width: 48px;
    height: 48px;
}
</style>
