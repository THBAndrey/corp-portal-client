<template>
    <div class="timesheet h-100">
        <div class="w-100 d-flex flex-v-center flex-h-center pad-3">
            <router-link :to="{ name: 'edittemplate', params: { id: 'new' } }" class="btn btn-primary w-100">Добавить шаблон</router-link>
        </div>
        <template v-for="(item, index) in templates">
            <router-link tag="div" :key="'item' + index" :to="{ name: 'edittemplate', params: { id: item.id } }">
                <div class="project-item">
                    <div>{{ item.name }}</div>
                </div>
            </router-link>
            <hr :key="'hr' + index" style="border-top-width: 10px" />
        </template>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            templates: []
        };
    },
    methods: {
        async getTemplates() {
            this.templates = (await this.$projectsApi.listTemplate()).list_template;
        }
    },
    activated() {
        this.getTemplates();
    }
};
</script>

<style scoped>
.timesheet {
    background-color: #eee;
}

.project-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 16px;
    background-color: white;
}
</style>
