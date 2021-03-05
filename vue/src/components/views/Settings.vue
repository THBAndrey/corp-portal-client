<template>
    <div class="d-flex flex-col scroll-hide">
        <router-link tag="div" :to="{ name: 'feedback' }">
            <div v-ripple class="menu-item">
                <div>Обратная связь</div>
            </div>
        </router-link>
        <router-link tag="div" :to="{ name: 'dev' }">
            <div v-ripple class="menu-item">
                <div>Отладка</div>
            </div>
        </router-link>
        <router-link tag="div" :to="{ name: 'change-password' }">
            <div v-ripple class="menu-item">
                <div>Смена пароля</div>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    components: {}
};
</script>

<style scoped>
.menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 16px;
    background-color: white;
}
</style>
