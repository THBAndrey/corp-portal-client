<template>
    <div class="w-100 h-100">
        <div class="group d-flex flex-col h-100" style="overflow-y: hidden">
            <div class="w-100 pad-5" style="border-bottom: solid 1px #e5e3e3">
                <div class="form-control form-control-icon-left w-100">
                    <input v-model="searchText" class="input w-100" placeholder="Найти группу" type="text" />
                    <div class="icon"><i class="mdi mdi-magnify"></i></div>
                </div>
            </div>
            <div class="row pad-5">
                <div class="col">
                    <button @click="activeTab = 'my'" :class="activeTab == 'my' ? 'btn-primary' : 'btn-outline'" class="btn w-100">
                        Мои группы
                    </button>
                </div>
                <div class="col">
                    <button @click="activeTab = 'all'" :class="activeTab == 'all' ? 'btn-primary' : 'btn-outline'" class="btn w-100">
                        Все группы
                    </button>
                </div>
            </div>

            <div style="flex: 1; overflow-y: auto">
                <div class="d-flex flex-col flex-grow pad-left-5 pad-right-5">
                    <template v-if="(activeTab === 'my' && myGroups) || (activeTab === 'all' && groups)">
                        <router-link
                            v-for="(group, index) in soughtGroups"
                            :key="activeTab + index"
                            :to="'group/' + group.id"
                            tag="div"
                            v-ripple
                            class="group-item mar-bot-4"
                        >
                            <div class="row row-collapse">
                                <div class="col col-auto col-vmid">
                                    <div class="avatar round mar-right-4">
                                        <img
                                            :src="group.avatar_name ? group.avatar_name : avatarPlaceholder"
                                            @error="$e => ($e.target.src = avatarPlaceholder)"
                                        />
                                    </div>
                                </div>
                                <div class="col col-vmid text-truncate group-item__header">
                                    <div class="group-item__name">
                                        {{ group.name }}
                                    </div>
                                    <div class="group-item__type">
                                        {{ group.description }}
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </template>
                    <load-layout v-else></load-layout>
                    <div v-if="soughtGroups && soughtGroups.length == 0" class="text-center">Ничего не найдено</div>
                </div>
            </div>

            <div @click="createGroup = true" class="new-group-button">
                <div class="btn btn-icon btn-large shadow-float round" style="background: white">
                    <div class="icon">
                        <i class="mdi mdi-plus mdi-24px"></i>
                    </div>
                </div>
            </div>
            <GroupCreater v-model="createGroup" />
        </div>
    </div>
</template>

<script>
import GroupCreater from '../shared/GroupCreater.vue';
export default {
    components: {
        GroupCreater
    },
    data() {
        return {
            avatarPlaceholder: 'img/avatar-group.png',
            activeTab: 'my',
            searchText: '',
            loading: true,
            error: null,
            groups: null,
            myGroups: null,
            createGroup: false
        };
    },
    computed: {
        soughtGroups() {
            if (this.searchText) {
                if (this.activeTab === 'my') {
                    return this.myGroups.filter(x => x.name.toLowerCase().includes(this.searchText.toLowerCase()));
                } else {
                    return this.groups.filter(x => x.name.toLowerCase().includes(this.searchText.toLowerCase()));
                }
            } else {
                return this.activeTab === 'my' ? this.myGroups : this.groups;
            }
        }
    },
    methods: {
        async loadAllGroups() {
            let data = await this.$groupApi.getAllGroups(0);
            this.groups = data.groups.records;
        },
        async loadMyGroups() {
            let data = await this.$groupApi.getUserGroups(0);
            this.myGroups = data.groups.records;
        }
    },
    activated() {
        this.loadAllGroups();
        this.loadMyGroups();
    }
};
</script>

<style lang="less" scoped>
.group {
    &-item {
        background: white;
        border-radius: 4px;
        padding: 15px;

        .avatar {
            width: 40px;
            height: 40px;
        }

        &__header {
            color: #616161;
        }

        &__type {
            font-size: 10px;
            line-height: 13px;
        }

        &__name {
            font-size: 14px;
            line-height: 19px;
            font-weight: 500;
        }
    }
}

.new-group-button {
    position: absolute;
    right: 15px;
    bottom: 15px;
}
</style>
