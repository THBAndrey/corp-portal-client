<template>
    <div class="timesheet h-100">
        <div class="w-100 d-flex flex-v-center flex-h-center pad-3">
            <button v-ripple @click="showAddProjectModal = true" class="btn btn-primary w-100">Добавить проект</button>
        </div>
        <modal v-model="showAddProjectModal">
            <div class="pad-5">
                <hr style="border-top-width: 10px" />
                <template v-for="project in notAddedProjects">
                    <div @click="addProject(project)" v-ripple :key="project.id" class="project-item">
                        <div>{{ project.name }}</div>
                    </div>
                    <hr :key="'hr' + project.id" style="border-top-width: 10px" />
                </template>
            </div>
        </modal>
        <hr style="border-top-width: 10px" />
        <div class="w-100 d-flex flex-v-center flex-h-center pad-3">
            <div class="form-control w-100">
                <input v-model="templateName" class="input" type="text" />
                <div class="form-label form-label-xsmall form-label-sticky">Название шаблона</div>
            </div>
        </div>
        <hr style="border-top-width: 10px" />
        <div class="mar-3">Проекты:</div>
        <template v-for="(project, index) in templateProjects">
            <modal :key="'modal' + index" v-model="project.showModal">
                <div class="pad-left-8 pad-right-8 pad-top-6 pad-bot-6 w-100 h-100 d-flex flex-col flex-v-center flex-h-center">
                    <div class="w-100 pos-rel" style="height: 40px">
                        <label
                            :style="`left: ${
                                (project.time_work_percent / (undistributedTime + parseInt(project.time_work_percent))) * 100
                            }%`"
                            class="pos-abs"
                            for="range"
                            id="value"
                            >{{ project.time_work_percent }}%</label
                        >
                        <input
                            id="range"
                            style="top: 22px"
                            class="w-100 pos-abs"
                            v-model="project.time_work_percent"
                            type="range"
                            step="10"
                            min="0"
                            :max="undistributedTime + parseInt(project.time_work_percent)"
                        />
                    </div>
                    <div class="d-flex w-100" style="justify-content: space-between">
                        <div>0%</div>
                        <div>{{ undistributedTime + parseInt(project.time_work_percent) }}%</div>
                    </div>
                    <div>Осталось времени: {{ undistributedTime }}%</div>
                    <button @click="project.showModal = false" class="btn btn-outline btn-small mar-top-6">Сохранить</button>
                </div>
            </modal>
            <modal :key="'removeModal' + index" v-model="project.showRemoveProjectModal">
                <div class="pad-left-8 pad-right-8 pad-top-6 pad-bot-6 w-100 h-100 d-flex flex-col flex-v-center flex-h-center">
                    <button @click="removeProject(project)" class="btn btn-outline btn-small mar-top-6">Убрать проект</button>
                </div>
            </modal>
            <div v-ripple @click="$set(project, 'showModal', true)" class="row row-collapse project-item" :key="'item' + index">
                <div class="col">{{ project.project_name }}</div>
                <div class="col col-auto d-flex">{{ project.time_work_percent }}%</div>
                <button
                    @click.stop="$set(project, 'showRemoveProjectModal', true)"
                    class="col col-auto btn btn-ghost btn-small round btn-icon color-grey"
                >
                    <div class="icon close">
                        <i class="mdi mdi-close mdi-24px"></i>
                    </div>
                </button>
            </div>
            <hr :key="'hr' + index" style="border-top-width: 10px" />
        </template>
        <div class="w-100">
            <div class="row pad-5">
                <div class="col" v-if="this.$route.params.id != 'new'">
                    <button @click="deleteTemplate" v-ripple class="btn btn-primary w-100">Удалить</button>
                </div>
                <div class="col">
                    <button @click="saveTemplate" v-ripple class="btn btn-primary w-100">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from '../shared/Modal';

import { EventBus, EventBusEvent } from '@/utils/EventBus';

export default {
    components: {
        Modal
    },
    data() {
        return {
            templateName: '',
            showAddProjectModal: false,
            allProjects: [],
            templateProjects: []
        };
    },
    computed: {
        distributedTime() {
            let projects = Object.values(this.templateProjects);
            return projects.reduce((accumulator, proj) => accumulator + parseInt(proj.time_work_percent), 0);
        },
        undistributedTime() {
            return 100 - this.distributedTime;
        },
        notAddedProjects() {
            let projects = Object.values(this.templateProjects);
            return this.allProjects.filter(x => projects.find(y => y.project_id == x.id) == null);
        }
    },
    methods: {
        async getAllProjects() {
            this.allProjects = await this.$projectsApi.getActualProjects();
        },
        async getTemplateProjects(id) {
            let template = (await this.$projectsApi.infoTemplate(id)).template;
            this.templateName = template.name;
            this.templateProjects = template.items;
        },
        addProject(project) {
            let newProj = {
                project_id: project.id,
                project_name: project.name,
                time_work_percent: 0
            };
            this.templateProjects.push(newProj);
        },
        removeProject(project) {
            project.time = 0;
            this.templateProjects = this.templateProjects.filter(x => x.project_id != project.project_id);
        },
        async deleteTemplate() {
            await this.$projectsApi.deleteTemplate(this.$route.params.id);
            EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Шаблон удален');
            this.$router.push({ name: 'timesheettemplates' });
        },
        async saveTemplate() {
            if (this.$route.params.id != 'new') {
                await this.$projectsApi.updateTemplate({
                    id: this.$route.params.id,
                    name: this.templateName,
                    projects: this.templateProjects.map(proj => ({
                        project_id: proj.project_id,
                        timeWorkPercent: proj.time_work_percent
                    }))
                });
            } else {
                await this.$projectsApi.addTemplate({
                    name: this.templateName,
                    projects: this.templateProjects.map(proj => ({
                        project_id: proj.project_id,
                        timeWorkPercent: proj.time_work_percent
                    }))
                });
            }
            EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Шаблон сохранен');
            this.$router.push({ name: 'timesheettemplates' });
        }
    },
    created() {
        if (this.$route.params.id != 'new') {
            this.getTemplateProjects(this.$route.params.id);
        }
        this.getAllProjects();
    },
    activated() {
        this.templateName = '';
        this.templateProjects = [];
        if (this.$route.params.id != 'new') {
            this.getTemplateProjects(this.$route.params.id);
        }
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

#value {
    position: absolute;
    top: 0;
    color: #0075ff;
    font-size: 14px;
}
</style>
