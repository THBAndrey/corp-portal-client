<template>
    <div v-if="user">
        <img class="profile-img" src="img/profile.png" alt="" />
        <div class="row">
            <div class="col">
                <div class="pad-left-4 pad-right-4">
                    <v-lazy-image
                        class="avatar avatar-7 thumb shadow round d-block pull-center mar-bot-5"
                        @error.native="$e => ($e.target.src = imgPlaceholder)"
                        :src="user.photo || imgPlaceholder"
                        :style="{ 'object-fit': 'cover' }"
                    />
                    <h3 class="text-bold color-primary">{{ user.fio }}</h3>
                    <div class="text-bold">{{ user.job_title_name }}</div>
                    <div>{{ user.clanName }}</div>
                    <div>{{ user.mail_corp }}</div>
                    <!-- <div>{{ user.date_birth | datestamp('DD MMM YYYY') }}</div> -->
                </div>
            </div>
            <div class="col">
                <div class="pad-right-4 mar-top-6">
                    <router-link class="btn w-100 btn-primary mar-bot-4" :to="{ name: 'timesheettemplates' }">Шаблоны</router-link>
                    <!-- <router-link class="btn w-100 btn-primary mar-bot-4" :to="{ name: 'feedback' }">Обратная связь</router-link> -->
                    <div class="btn w-100 btn-primary" :class="{ loading: logoutLoading }" @click="logout">Выход</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Action from '../../store/action';

export default {
    components: {},
    computed: {
        user() {
            return this.$store.state.user;
        },
        imgPlaceholder() {
            return this.user.sex == 'm' ? 'img/boy2.png' : 'img/girl2.png';
        }
    },
    data() {
        return {
            logoutLoading: false
        };
    },
    methods: {
        logout() {
            this.logoutLoading = true;
            this.$store
                .dispatch(Action.LOGOUT)
                .then(() => this.$router.push({ name: 'auth' }))
                .finally(() => (this.logoutLoading = false));
        }
    }
};
</script>

<style scoped>
.profile-img {
    object-fit: cover;
    width: 100%;
    margin-top: -40px;
}

.avatar {
    margin-top: -80px;
}
</style>
