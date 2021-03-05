<template>
    <div class="month-projects d-flex flex-col flex-grow h-100">
        <div v-if="allProjects && userProjects" class="pad-3">
            <div class="w-100">
                <div class="row">
                    <div class="col">
                        <div v-ripple @click="showUseTemplateModal = true" class="project-item" style="font-size: 14px">
                            <div>Применить шаблон</div>
                        </div>
                    </div>
                    <div class="col pad-left-3">
                        <div v-ripple @click="showAddProjectModal = true" class="project-item" style="font-size: 14px">
                            <div>Добавить проект</div>
                        </div>
                    </div>
                </div>
            </div>
            <modal v-model="showAddProjectModal">
                <div class="pad-left-5 pad-right-5 pad-top-3 pad-bot-3">
                    <hr style="border-top-width: 10px" />
                    <div>
                        <div class="row">
                            <div class="col">
                                <div
                                    v-ripple
                                    :class="switchProjects == 'myProjects' ? 'active' : ''"
                                    @click="switchProjects = 'myProjects'"
                                    class="project-item"
                                >
                                    <div>Мои проекты</div>
                                </div>
                            </div>
                            <div class="col">
                                <div
                                    v-ripple
                                    :class="switchProjects == 'allProjects' ? 'active' : ''"
                                    @click="switchProjects = 'allProjects'"
                                    class="project-item"
                                >
                                    <div>Все проекты</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style="border-top-width: 10px" />
                    <template v-for="project in notAddedProjects">
                        <div @click="addProject(project)" v-ripple :key="project.id" class="project-item mar-bot-4">
                            <div>{{ project.name }}</div>
                        </div>
                    </template>
                </div>
            </modal>
            <modal v-model="showUseTemplateModal">
                <div class="pad-left-5 pad-right-5 pad-top-3 pad-bot-3">
                    <hr style="border-top-width: 10px" />
                    <template v-for="template in projectTemplates">
                        <div @click="useTemplate(template)" v-ripple :key="template.id" class="project-item mar-bot-4">
                            <div>{{ template.name }}</div>
                        </div>
                    </template>
                </div>
            </modal>
            <div class="mar-3">Проекты:</div>
            <template v-for="(project, index) in userProjects">
                <modal :key="'removeModal' + index" v-model="project.showRemoveProjectModal">
                    <div class="pad-left-8 pad-right-8 pad-top-6 pad-bot-6 w-100 h-100 d-flex flex-col flex-v-center flex-h-center">
                        <button @click="removeProject(project)" class="btn btn-outline btn-small mar-top-6">Убрать проект</button>
                    </div>
                </modal>
                <div class="mar-bot-3" :key="'item' + index">
                    <div v-ripple @click="(openEdit = true), (editItem = { ...project })" class="row row-collapse project-item">
                        <div class="col">{{ project.name }}</div>
                        <div class="col col-auto d-flex">{{ project.time }}%</div>
                        <button
                            @click.stop="$set(project, 'showRemoveProjectModal', true)"
                            class="col col-auto btn btn-ghost btn-small round btn-icon color-grey"
                        >
                            <div class="icon close">
                                <i class="mdi mdi-close mdi-24px"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </template>

            <TimeManager v-model="openEdit">
                <div v-if="openEdit" class="w-100 h-100 d-flex flex-col" style="align-items: center; justify-content: space-between">
                    <div class="w-100" style="padding: 15px 20px 40px 20px">
                        <div class="d-flex flex-v-center" style="margin-bottom: 15px">
                            <Gauge :metricsSet="gaugeData" />
                            <div style="margin-left: 10px">
                                <div>Загрузка по проектам на {{ date }}</div>
                                <div>Проектов: {{ userProjects.length }}</div>
                            </div>
                        </div>
                        <div class="w-100 mar-bot-3 d-flex" style="justify-content: space-between">
                            <div>{{ editItem.name }}</div>
                            <div>{{ editItem.time }}%</div>
                        </div>
                        <div class="w-100 pos-rel" style="height: 10px">
                            <RangeInput
                                step="5"
                                min="0"
                                :stepsEnabled="true"
                                :color="distributedTime + addedTime === 100 ? '#76E09F' : '#ffc048'"
                                :max="undistributedTime + parseInt(userProjects.find(x => x.id == editItem.id).time)"
                                class="w-100 pos-abs"
                                v-model="editItem.time"
                            />
                        </div>
                        <div class="form-control w-100 mar-top-6">
                            <input v-model="editItem.comment" class="input" type="text" />
                            <div class="form-label form-label-small form-label-sticky">Комментарий:</div>
                        </div>
                    </div>
                    <!-- <div>Осталось времени: {{ undistributedTime }}%</div> -->
                    <div class="w-100" style="padding: 16px 20px; border-top: solid 1px #e5e3e3">
                        <button
                            @click="!saveTime ? setTimeWork(editItem) : ''"
                            :class="saveTime ? 'btn-loading' : ''"
                            class="btn btn-primary w-100"
                            style="
                                background: transparent linear-gradient(152deg, #5f126d 0%, #2c126d 51%, #2a1167 100%) 0% 0% no-repeat
                                    padding-box;
                            "
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            </TimeManager>
        </div>

        <load-layout v-else></load-layout>
    </div>
</template>

<script>
import Modal from '../shared/Modal';
import RangeInput from '../shared/RangeInput/RangeInput';
import TimeManager from '../shared/TimeManager';
import Gauge from '../shared/Gauge';
import dayjs from 'dayjs';
import { EventBus, EventBusEvent } from '@/utils/EventBus';
export default {
    components: {
        Modal,
        RangeInput,
        TimeManager,
        Gauge
    },
    data() {
        return {
            showAddProjectModal: false,
            showUseTemplateModal: false,
            allProjects: null,
            myProjects: null,
            switchProjects: 'allProjects',
            userProjects: null,
            projectTemplates: null,
            openEdit: false,
            editItem: {},
            saveTime: false
        };
    },
    computed: {
        date() {
            var d = new Date(this.$route.params.year, this.$route.params.month, this.$route.params.day);
            var day = dayjs(d);
            return day.format('DD.MM.YYYY');
        },
        distributedTime() {
            let projects = Object.values(this.userProjects);
            return projects.reduce((accumulator, proj) => accumulator + parseInt(proj.time), 0);
        },
        undistributedTime() {
            return 100 - this.distributedTime;
        },
        addedTime() {
            if (this.openEdit && this.editItem && this.editItem.time != null) {
                let originalProject = this.userProjects.find(x => x.id == this.editItem.id);
                return this.editItem.time - originalProject.time;
            }
            return 0;
        },
        notAddedProjects() {
            let projects = Object.values(this.userProjects);
            return this[this.switchProjects].filter(x => projects.find(y => y.id == x.id) == null);
        },
        gaugeData() {
            return [
                {
                    name: 'metric1',
                    radius: 28,
                    rounded: true,
                    limitColor: '#E4E2E2',
                    showLimit: true,
                    valueColor: this.distributedTime + this.addedTime === 100 ? '#76E09F' : '#ffc048',
                    limitWidth: 3,
                    valueWidth: 5,
                    limit: 100,
                    value: this.distributedTime + this.addedTime,
                    showValueSign: true,
                    valueSignFontSize: 1.2,
                    valueSignFontUnit: 'rem',
                    format: 'percent'
                }
            ];
        }
    },
    methods: {
        async getUserProjects() {
            this.userProjects = await this.$projectsApi.getProjectsDay(
                this.$route.params.year,
                this.$route.params.month,
                this.$route.params.day
            );
        },
        async getAllProjects() {
            this.allProjects = await this.$projectsApi.getOtherProjects(
                this.$route.params.year,
                this.$route.params.month,
                this.$route.params.day
            );
        },
        async getMyProjects() {
            this.myProjects = await this.$projectsApi.getActualProjectsForDate(
                this.$route.params.year,
                this.$route.params.month,
                this.$route.params.day
            );
        },
        async addProject(project) {
            await this.$projectsApi.addProjectDay(this.$route.params.year, this.$route.params.month, this.$route.params.day, project.id);
            let newProj = Object.assign({}, project);
            newProj.time = 0;
            this.userProjects.push(newProj);
        },
        async useTemplate(template) {
            await this.$projectsApi.setTemplateDay(template.id, this.$route.params.year, this.$route.params.month, this.$route.params.day);
            this.getUserProjects();
        },
        async getTemplates() {
            this.projectTemplates = (await this.$projectsApi.listTemplate()).list_template;
        },
        async removeProject(project) {
            await this.$projectsApi.removeProjectDay(this.$route.params.year, this.$route.params.month, this.$route.params.day, project.id); //REMOVE PROJECT DAY
            project.time = 0;
            this.userProjects = this.userProjects.filter(x => x.id != project.id);
        },
        async setTimeWork(editItem) {
            this.saveTime = true;
            try {
                await this.$projectsApi.setTimeWorkWithDay(
                    this.$route.params.year,
                    this.$route.params.month,
                    this.$route.params.day,
                    editItem.id,
                    editItem.time,
                    editItem.comment
                );
                this.$set(
                    this.userProjects,
                    this.userProjects.findIndex(x => x.id == editItem.id),
                    editItem
                );
                this.openEdit = false;
            } catch {
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Ошибка');
            } finally {
                this.saveTime = false;
            }
        }
    },
    created() {
        this.getUserProjects();
        this.getAllProjects();
        this.getMyProjects();
    },
    activated() {
        this.userProjects = null;
        this.showAddProjectModal = false;
        this.showUseTemplateModal = false;
        this.getUserProjects();
        this.getTemplates();
    }
};
</script>

<style scoped>
.month-projects {
}

.project-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background-color: white;

    border-radius: 4px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
}

.project-item.active {
    box-shadow: inset 0 0 6px #2c136d6b;
}

#value {
    position: absolute;
    top: 0;
    color: #0075ff;
    font-size: 14px;
}
</style>
