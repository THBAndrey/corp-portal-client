<template>
    <div class="d-flex flex-col flex-grow scroll-hide">
        <header-layout>
            <div class="row row-collapse w-100">
                <div class="col col-auto">
                    <div class="btn btn-icon round mar-right-l1" style="margin: -6px 0 -6px -12px" v-ripple @click="$router.go(-1)">
                        <div class="icon">
                            <i class="mdi mdi-arrow-left mdi-18px"></i>
                        </div>
                    </div>
                </div>
                <div class="col col-vmid">
                    <h3 class="last text-bold">Создать группу</h3>
                </div>
                <div class="col col-auto">
                    <div class="btn btn-icon round" style="margin: -6px -16px -6px 0" v-ripple>
                        <div class="icon">
                            <i class="mdi mdi-dots-vertical mdi-24px"></i>
                        </div>
                    </div>
                </div>
            </div>
        </header-layout>
        <content-layout>
            <div class="d-flex flex-col flex-h-center pad-5">
                <div class="d-flex flex-col flex-h-center pad-bot-4">
                    <div class="icon color-primary h-100 w-100">
                        <i class="mdi mdi-forum-outline mdi-48px"></i>
                    </div>
                </div>
                <div class="form-control mar-bot-5">
                    <input class="input" type="text" v-model="name" />
                    <div class="form-label form-label-small form-label-sticky">Название</div>
                </div>
                <div class="form-control mar-bot-4">
                    <textarea class="textarea" v-model="desc"></textarea>
                    <div class="form-label form-label-small form-label-sticky">Описание</div>
                </div>
                <div class="form-control form-control-icon-right mar-bot-6">
                    <div class="form-label form-label-small">Аватар</div>
                    <input name="myFile" type="file" />
                </div>
                <div class="form-control form-control-icon-right mar-bot-6">
                    <label class="checkbox">
                        <input type="checkbox" v-model="isHidden" /><i style="display: inline-block"></i>
                        <span style="vertical-aling: middle; margin-left: 6px">Скрытая</span>
                    </label>
                </div>
                <div class="form-control form-control-icon-right mar-bot-6">
                    <label class="checkbox">
                        <input type="checkbox" v-model="isPublic" /><i style="display: inline-block"></i>
                        <span style="vertical-aling: middle; margin-left: 6px">Открытая</span>
                    </label>
                </div>
                <div class="form-control form-control-icon-right mar-bot-6">
                    <label class="checkbox">
                        <input type="checkbox" v-model="allowExit" /><i style="display: inline-block"></i>
                        <span style="vertical-aling: middle; margin-left: 6px">Можно выйти</span>
                    </label>
                </div>
                <button @click="createGroup" class="btn btn-primary">Создать группу</button>
            </div>
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
            name: '',
            desc: '',
            isHidden: false,
            isPublic: true,
            allowExit: true,
            avatarId: 1
        };
    },
    methods: {
        async createGroup() {
            if (!this.name) {
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Укажите имя группы');
                return;
            }
            if (!this.desc) {
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Укажите описание группы');
                return;
            }
            if (!this.avatarId) {
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Укажите id аватара');
                return;
            }
            try {
                let data = await this.$groupApi.createOrUpdateGroup({
                    name: this.name,
                    description: this.desc,
                    isPublic: this.isPublic,
                    isHidden: this.isHidden,
                    allowExit: this.allowExit,
                    avatarId: this.avatarId
                });
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Group created');
                this.$router.push('/group/' + data.group_id);
            } catch {
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Group create failed');
            }
        }
    }
};
</script>
