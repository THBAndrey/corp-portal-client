<template>
    <div class="d-flex flex-col flex-grow scroll-hide">
        <content-layout class="d-flex flex-v-center flex-h-center">
            <div class="w-f2">
                <img class="logo d-block pull-center mar-bot-l2 w-5-12 s-w-5-12" src="img/logo.png" />
                <div class="p pos-rel">
                    <input class="input w-100" :class="{ invalid: error }" type="email" placeholder="Email" v-model="name" />
                    <div class="color-red text-small" v-if="error">
                        {{ error }}
                    </div>
                </div>
                <div class="block">
                    <input class="input w-100" type="password" placeholder="Password" v-model="password" />
                </div>
                <div class="text-right">
                    <div
                        class="btn btn-primary w-100"
                        :class="{ 'btn-loading': loading, disabled: loading }"
                        tabindex="0"
                        v-ripple
                        @click="onSubmit"
                    >
                        <span class="label">Войти</span>
                    </div>
                </div>
            </div>
        </content-layout>
    </div>
</template>
<style lang="less" scopped>
.logo {
    max-width: 200px;
}
</style>
<script>
import Action from '@/store/action';
import ContentLayout from '@/components/layouts/ContentLayout';

export default {
    components: {
        ContentLayout
    },
    data() {
        return {
            loading: false,
            name: '',
            password: '',
            error: null
        };
    },
    methods: {
        onSubmit() {
            let { name, password } = this;
            this.loading = true;
            this.error = null;
            this.$store
                .dispatch(Action.LOGIN, { name, password })
                .then(() => {
                    this.$store.dispatch(Action.GET_USER).then(() => {
                        this.$router.replace({ name: 'news' });
                    });
                    this.$store.dispatch(Action.REGISTER_NOTIFICATIONS);
                })
                .catch(e => {
                    this.error = e.message;
                    this.loading = false;
                });
        }
    }
};
</script>
