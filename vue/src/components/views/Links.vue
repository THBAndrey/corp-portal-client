<template>
    <div class="d-flex flex-col scroll-hide">
        <router-link tag="div" to="timesheet">
            <div v-ripple class="menu-item">
                <div>Учет рабочего времени</div>
            </div>
        </router-link>
        <router-link tag="div" to="group">
            <div v-ripple class="menu-item">
                <div>Группы</div>
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
