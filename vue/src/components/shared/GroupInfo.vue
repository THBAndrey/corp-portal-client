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
                    <h3 class="last text-bold">{{ pageTitle }}</h3>
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
                    <input class="input" type="text" />
                    <div class="form-label form-label-small form-label-sticky">Название</div>
                </div>
                <div class="form-control mar-bot-4">
                    <textarea class="textarea"></textarea>
                    <div class="form-label form-label-small form-label-sticky">Описание</div>
                </div>
                <div class="form-control form-control-icon-right mar-bot-6">
                    <div class="form-label form-label-small">Аватар</div>
                    <input name="myFile" type="file" />
                </div>
                <div class="form-control form-control-icon-right mar-bot-6">
                    <select class="select">
                        <option value="">Открытая</option>
                        <option value="">Закрытая</option>
                        <option value="">Скрытая</option>
                    </select>
                    <div class="icon"><i class="mdi mdi-chevron-down"></i></div>
                    <div class="form-label form-label-small form-label-sticky">Тип группы</div>
                </div>
                <button @click="isPopupOpened = true" class="btn btn-primary">Создать группу</button>
            </div>

            <div v-if="isPopupOpened" class="popup">
                <div class="popup-dialog">
                    <div @click="isPopupOpened = false" class="icon close color-primary">
                        <i class="mdi mdi-close mdi-24px"></i>
                    </div>
                    <div class="popup-dialog-body pad-6">
                        <h3>Ошибка</h3>
                        <p>Текст ошибки текст ошибки</p>
                    </div>
                </div>
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
    props: {
        pageTitle: String
    },
    data() {
        return {
            isPopupOpened: false,
            name: '',
            desc: '',
            avatarId: '',
            isHidden: false,
            isClosed: false,
            error: null
        };
    },
    methods: {
        async createOrUpdateGroup() {
            let result = await this.$groupApi.createOrUpdateGroup({}, id);
            console.log(result);
        }
    }
};
</script>
