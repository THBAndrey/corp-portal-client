<template>
    <TimeManager :open="openManager" @change="$emit('change', false)">
        <div v-if="openManager" class="w-100 h-100 d-flex flex-col pos-rel" style="align-items: center; justify-content: space-between">
            <div class="w-100" style="margin-bottom: 72px">
                <div v-if="days" class="days">
                    <Splide :options="options" class="w-100">
                        <SplideSlide v-for="(day, i) in days" :key="i" class="d-flex flex-v-center flex-h-center">
                            <div
                                @click="usingDate = { day: day.day, month: day.month, year: day.year }"
                                class="d-flex flex-v-center flex-h-center"
                            >
                                <div :style="isActiveDay(day) ? 'background-color: #f2f6fa; padding: 5px; border-radius: 4px' : ''">
                                    {{ ('0' + day.day).slice(-2) }}.{{ ('0' + day.month).slice(-2) }}
                                </div>
                            </div>
                        </SplideSlide>
                    </Splide>
                </div>
                <hr />
                <div class="d-flex" style="margin: 15px 20px 15px 20px; align-items: flex-end">
                    <Gauge :metricsSet="gaugeData" />
                    <div style="margin-left: 10px">
                        <div class="mar-bot-2">Загрузка по проектам на {{ currentDate }}</div>
                        <context-menu dropdown>
                            <template>
                                <button
                                    class="btn btn-small btn-outline mar-bot-1"
                                    style="border: solid 1px #eee; padding: 4px 14px; min-height: none"
                                >
                                    <div>Проектов: {{ userProjects.length }}</div>
                                    <div class="mar-left-4"><span class="mdi mdi-menu-down"></span></div>
                                </button>
                            </template>
                            <template v-slot:menu>
                                <ul>
                                    <li @click="showAddProjectModal = true" class="text-small">
                                        <span>Добавить проект</span>
                                    </li>
                                    <li @click="showUseTemplateModal = true" class="text-small">
                                        <span>Применить шаблон</span>
                                    </li>
                                </ul>
                            </template>
                        </context-menu>
                        <modal v-model="showUseTemplateModal">
                            <div style="border-bottom: solid 1px #eee; padding: 10px; font-size: 18px">
                                <div>Выберите шаблон</div>
                            </div>
                            <div style="max-height: 300px">
                                <div
                                    v-ripple
                                    v-for="(template, i) in projectTemplates"
                                    style="height: 45px; padding: 0 15px"
                                    :key="i"
                                    @click="useTemplate(template)"
                                >
                                    <div style="height: 100%; display: flex; align-items: center; border-bottom: solid 1px #eee">
                                        {{ template.name }}
                                    </div>
                                </div>
                            </div>
                        </modal>
                    </div>
                </div>
                <div v-if="userProjects.length == 0" class="d-flex flex-col" style="padding: 0 20px">
                    <button
                        v-ripple
                        @click="showAddProjectModal = true"
                        class="btn btn-outline mar-bot-5"
                        style="border: solid 1px #eee; box-shadow: 0 0 15px #e1e2e780"
                    >
                        Добавить проект
                    </button>
                    <button
                        v-ripple
                        @click="showUseTemplateModal = true"
                        class="btn btn-outline mar-bot-5"
                        style="border: solid 1px #eee; box-shadow: 0 0 15px #e1e2e780"
                    >
                        Применить шаблон
                    </button>
                </div>
                <hr />
                <template v-if="!loadProjects">
                    <div
                        v-for="(item, i) in userProjects"
                        v-ripple
                        v-long-press="
                            () => {
                                onLongPress(item);
                            }
                        "
                        style="padding: 15px 20px 15px 20px; border-bottom: solid 1px #eee"
                        :key="i"
                    >
                        <div class="w-100 mar-bot-3 d-flex" style="justify-content: space-between">
                            <div>{{ item.name }}</div>
                            <div>{{ item.time }}%</div>
                        </div>
                        <div class="w-100 pos-rel mar-bot-5" style="height: 10px">
                            <RangeInput
                                step="10"
                                min="0"
                                :stepsEnabled="true"
                                :color="distributedTime + addedTime >= 100 ? '#76E09F' : '#ffc048'"
                                :max="100"
                                :trueMax="undistributedTime + parseInt(userProjects.find(x => x.id == item.id).time)"
                                class="w-100 pos-abs"
                                v-model="item.time"
                            />
                        </div>
                        <div class="row">
                            <div class="col">
                                <button
                                    :disabled="item.time == 0"
                                    @mousedown.stop
                                    @click="item.time = parseInt(item.time) - 10"
                                    class="w-100 btn btn-outline"
                                >
                                    -10%
                                </button>
                            </div>
                            <div class="col">
                                <button
                                    :disabled="undistributedTime <= 0"
                                    @mousedown.stop
                                    @click="item.time = parseInt(item.time) + 10"
                                    class="w-100 btn btn-outline"
                                >
                                    +10%
                                </button>
                            </div>
                        </div>
                        <div class="mar-top-5">
                            <input v-model="item.comment" class="input w-100" type="text" placeholder="Комментарий" />
                        </div>
                    </div>
                </template>
                <load-layout class="pad-3" v-else></load-layout>
            </div>
            <!-- <div>Осталось времени: {{ undistributedTime }}%</div> -->
            <div
                class="w-100 pos-fixed"
                style="padding: 16px 20px; border-top: solid 1px #eee; margin-top: -1px; bottom: 0; background-color: white"
            >
                <button
                    @click="!saveTime ? saveChanges() : ''"
                    :class="saveTime ? 'btn-loading' : ''"
                    class="btn btn-primary w-100"
                    style="
                        background: transparent linear-gradient(152deg, #5f126d 0%, #2c126d 51%, #2a1167 100%) 0% 0% no-repeat padding-box;
                    "
                >
                    Сохранить
                </button>
            </div>
            <SelectedProjectsModal
                :open="showAddProjectModal"
                @closeWithoutSave="showAddProjectModal = false"
                @closeWithSave="selectProjects"
                :allProjects="allProjects"
                :myProjects="myProjects"
                :userProjects="userProjects"
            />
        </div>
    </TimeManager>
</template>

<script>
import TimeManager from './TimeManager';
import RangeInput from './RangeInput/RangeInput';
import Gauge from './Gauge';
import SelectedProjectsModal from './SelectedProjectsModal';
import ContextMenu from '@/components/shared/ContextMenu';
import Modal from './Modal';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import dayjs from 'dayjs';
import { EventBus, EventBusEvent } from '@/utils/EventBus';

export default {
    components: {
        TimeManager,
        RangeInput,
        Gauge,
        SelectedProjectsModal,
        ContextMenu,
        Modal,
        Splide,
        SplideSlide
    },
    model: {
        prop: 'openManager',
        event: 'change'
    },
    props: {
        openManager: {
            type: Boolean
        },
        forDate: {
            type: Object,
            default: () => {
                let now = dayjs();
                return {
                    year: now.year(),
                    month: now.month() + 1,
                    day: now.date()
                };
            }
        }
    },
    data() {
        return {
            showAddProjectModal: false,
            showUseTemplateModal: false,
            allProjects: [],
            myProjects: [],
            switchProjects: 'allProjects',
            userProjects: [],
            openEdit: false,
            loadProjects: false,
            editItem: {},
            saveTime: false,
            days: null,
            usingDate: null,
            projectTemplates: null,
            options: {
                direction: 'rtl',
                perPage: 7,
                arrows: false,
                pagination: false
            }
        };
    },
    computed: {
        date() {
            return this.usingDate || this.forDate;
        },
        currentDate() {
            var day = dayjs(new Date(this.date.year, this.date.month - 1, this.date.day));
            return day.format('DD.MM.YYYY');
        },
        notAddedProjects() {
            if (!this.userProjects || !this[this.switchProjects]) return [];
            let projects = Object.values(this.userProjects);
            return this[this.switchProjects].filter(x => projects.find(y => y.id == x.id) == null);
        },
        distributedTime() {
            let projects = Object.values(this.userProjects);
            return projects.reduce((accumulator, proj) => accumulator + parseInt(proj.time), 0);
        },
        undistributedTime() {
            return 100 - this.distributedTime;
        },
        addedTime() {
            return 0;
        },
        gaugeData() {
            return [
                {
                    name: 'metric1',
                    radius: 28,
                    rounded: true,
                    limitColor: '#E4E2E2',
                    showLimit: true,
                    valueColor: this.distributedTime + this.addedTime >= 100 ? '#76E09F' : '#ffc048',
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
        onLongPress(item) {
            document.addEventListener(
                'deviceready',
                () => {
                    navigator.notification.confirm(
                        `Удалить проект ${item.name}?`, // message
                        button => {
                            if (button == 1) {
                                this.removeProject(item);
                            }
                        }, // callback to invoke with index of button pressed
                        'Удалить', // title
                        ['Удалить', 'Отмена']
                    );
                },
                false
            );
        },
        isActiveDay(day) {
            return day.day == this.date.day && day.month == this.date.month && day.year == this.date.year;
        },
        async getUserProjects() {
            this.userProjects = await this.$projectsApi.getProjectsDay(this.date.year, this.date.month, this.date.day);
        },
        async getAllProjects() {
            this.allProjects = await this.$projectsApi.getOtherProjects(this.date.year, this.date.month, this.date.day);
        },
        async getMyProjects() {
            this.myProjects = await this.$projectsApi.getActualProjectsForDate(this.date.year, this.date.month, this.date.day);
        },
        async selectProjects({ add, remove }) {
            if (add.length > 0) {
                await this.$projectsApi.addProjectsDay(
                    this.date.year,
                    this.date.month,
                    this.date.day,
                    add.map(x => x.id)
                );
            }
            if (remove.length > 0) {
                await this.$projectsApi.removeProjectsDay(
                    this.date.year,
                    this.date.month,
                    this.date.day,
                    remove.map(x => x.id)
                );
            }
            this.getUserProjects();
            this.showAddProjectModal = false;
        },
        async addProject(project) {
            await this.$projectsApi.addProjectDay(this.date.year, this.date.month, this.date.day, project.id);
            let newProj = Object.assign({}, project);
            newProj.time = 0;
            this.userProjects.push(newProj);
        },
        async removeProject(project) {
            await this.$projectsApi.removeProjectDay(this.date.year, this.date.month, this.date.day, project.id); //REMOVE PROJECT DAY
            project.time = 0;
            this.userProjects = this.userProjects.filter(x => x.id != project.id);
        },
        async getTemplates() {
            this.projectTemplates = (await this.$projectsApi.listTemplate()).list_template;
        },
        async getDays() {
            let data = await this.$projectsApi.getActiveDays();
            this.days = data.reverse();
        },
        async useTemplate(template) {
            this.$projectsApi
                .setTemplateDay(template.id, this.date.year, this.date.month, this.date.day)
                .then(() => {
                    this.getUserProjects();
                })
                .catch(() => {
                    EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Ошибка применения шаблона');
                })
                .finally(() => {
                    this.showUseTemplateModal = false;
                });
        },
        saveChanges() {
            this.saveTime = true;
            this.$projectsApi
                .setTimeWorksWithDay(
                    this.date.year,
                    this.date.month,
                    this.date.day,
                    this.userProjects.map(proj => ({ id: proj.id, time: proj.time, comment: proj.comment }))
                )
                .then(() => {
                    this.$emit('change', false);
                    this.$emit('updated');
                })
                .catch(() => {
                    EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Ошибка сохранения проектов');
                })
                .finally(() => {
                    this.saveTime = false;
                });
        }
    },
    watch: {
        openManager(val) {
            if (val == true) {
                this.loadProjects = true;
                this.getUserProjects().then(() => {
                    this.loadProjects = false;
                });
                this.getMyProjects();
                this.getAllProjects();
                this.getTemplates();
            }
        },
        date: {
            handler() {
                this.userProjects = [];
                this.myProjects = [];
                this.loadProjects = true;
                this.getUserProjects().then(() => {
                    this.loadProjects = false;
                });
                this.getMyProjects();
                this.getAllProjects();
                this.getTemplates();
            }
        }
    },
    created() {
        this.loadProjects = true;
        this.getUserProjects().then(() => {
            this.loadProjects = false;
        });
        this.getMyProjects();
        this.getAllProjects();
        this.getTemplates();
        this.getDays();
    }
};
</script>

<style lang="less" scoped>
.days {
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
