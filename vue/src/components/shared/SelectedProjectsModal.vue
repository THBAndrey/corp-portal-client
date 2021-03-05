<template>
    <modal :value="open" @input="closeWithoutSave">
        <div class="w-100 modal-content">
            <div class="head">
                <div>Выбранные проекты ({{ mode == 'all' ? 'все' : 'мои' }})</div>
                <div @click="mode = mode == 'all' ? 'my' : 'all'"><span class="mdi mdi-format-list-checks"></span></div>
            </div>
            <div class="body">
                <div v-for="(project, i) in projects" :key="i" class="project" @click="onClickProject(project)">
                    <div class="project-data">
                        <div class="d-flex flex-v-center">
                            <input @click.prevent type="checkbox" :checked="project.enabled" style="margin-right: 10px" />
                        </div>
                        {{ project.name }}
                    </div>
                </div>
            </div>
            <div class="foot">
                <button
                    @click="!saveLoading ? saveChanges() : ''"
                    :class="saveLoading ? 'btn-loading' : ''"
                    class="btn btn-primary w-100"
                    style="
                        background: transparent linear-gradient(152deg, #5f126d 0%, #2c126d 51%, #2a1167 100%) 0% 0% no-repeat padding-box;
                    "
                >
                    Сохранить
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
import Modal from './Modal';
export default {
    components: {
        Modal
    },
    props: {
        open: {
            type: Boolean,
            required: true
        },
        allProjects: {
            type: Array,
            required: true
        },
        myProjects: {
            type: Array,
            required: true
        },
        userProjects: {
            type: Array,
            required: true
        },
        saveLoading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            mode: 'my',
            projects: []
        };
    },
    methods: {
        setProjects() {
            let currentProjects = this.mode == 'all' ? this.allProjects : this.myProjects;
            this.projects = currentProjects.map(x => ({ ...x, enabled: Boolean(this.userProjects.find(p => p.id == x.id)) }));
        },
        onClickProject(project) {
            project.enabled = !project.enabled;
        },
        closeWithoutSave() {
            this.$emit('closeWithoutSave');
        },
        saveChanges() {
            let addProjects = this.projects.filter(x => x.enabled && !this.userProjects.find(p => p.id == x.id));
            let removeProjects = this.projects.filter(x => !x.enabled && this.userProjects.find(p => p.id == x.id));
            this.$emit('closeWithSave', { add: addProjects, remove: removeProjects });
        }
    },
    watch: {
        mode: {
            immediate: true,
            handler() {
                this.setProjects();
            }
        }
    }
};
</script>

<style lang="less" scoped>
.modal-content {
    .head {
        border-bottom: solid 1px #eee;
        padding: 10px;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
    }
    .body {
        height: 300px;
        overflow-y: auto;
        .project {
            height: 45px;
            padding: 0 15px;

            &-data {
                height: 100%;
                display: flex;
                align-items: center;
                border-bottom: solid 1px #eee;
            }

            &:last-child {
                .project-data {
                    border-bottom: none;
                }
            }
        }
    }
    .foot {
        border-top: solid 1px #eee;
        padding: 10px;
    }
}
</style>
