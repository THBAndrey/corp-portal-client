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
                    <h3 class="last text-bold">Обратная связь</h3>
                </div>
            </div>
        </header-layout>
        <content-layout>
            <div class="d-flex flex-col flex-h-center pad-5">
                <div class="form-control mar-bot-5">
                    <!-- <select v-model="selectedCategory" class="select">
                        <option :value="null">Select option</option>
                        <option
                            v-for="(category, index) in categories"
                            :key="index"
                            :value="index"
                            >{{ category }}</option
                        >
                    </select> -->
                    <input class="input" type="text" v-model="category" />
                    <div class="form-label form-label-small form-label-sticky">Категория</div>
                </div>
                <div class="form-control mar-bot-6">
                    <textarea v-model="message" class="textarea"></textarea>
                    <div class="form-label form-label-small form-label-sticky">Сообщение</div>
                </div>
                <button @click="sendFeedback" class="btn btn-primary">Отправить</button>
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
            categories: [],
            selectedCategory: null,
            category: '',
            message: ''
        };
    },
    methods: {
        async sendFeedback() {
            try {
                await this.$characterApi.addFeedback(this.category, this.message);
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Отзыв отправлен');
                this.$router.go(-1);
            } catch {
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Не удалось отправить отзыв');
            }
        }
    }
};
</script>

<style>
.textarea {
    height: 150px;
}
</style>
