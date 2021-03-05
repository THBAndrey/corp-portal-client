import VueRouter from 'vue-router';
import Vue from 'vue';
import store from '../store';
import Action from '../store/action';

import GroupPage from '../components/views/GroupPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {
            name: 'news'
        }
    },
    {
        name: 'auth',
        path: '/auth',
        component: () => import(/* webpackChunkName: "auth" */ '../components/views/Auth.vue'),
        meta: {
            title: 'Auth',
            authRequired: false,
            showFooter: false,
            showInFooterLinks: false,
            pageIndex: 0,
            layout: 'basic'
        }
    },
    {
        name: 'links',
        path: '/links',
        component: () => import(/* webpackChunkName: "links" */ '../components/views/Links.vue'),
        meta: {
            title: 'Меню',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: true,
            pageIndex: 1,
            layout: 'menu',
            icon: 'mdi-information-outline'
        }
    },
    {
        name: 'news',
        path: '/news',
        component: () => import(/* webpackChunkName: "news" */ '../components/views/News.vue'),
        meta: {
            title: 'Лента',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: true,
            pageIndex: 1,
            layout: 'menu',
            icon: 'mdi-newspaper-variant-multiple-outline',
            headerButtons: {
                'mdi-bell': {
                    method: () => {
                        router.push({ name: 'notifications' });
                    }
                }
            }
        }
    },
    {
        name: 'news-item',
        path: '/news/:newsId',
        component: () => import(/* webpackChunkName: "news-item" */ '../components/views/NewsItem.vue'),
        meta: {
            title: 'Новость',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'menu',
            backButton: () => {
                router.go(-1);
            }
        },
        props: true
    },
    {
        name: 'profile',
        path: '/profile',
        component: () => import(/* webpackChunkName: "profile" */ '../components/views/Profile.vue'),
        meta: {
            title: 'Профиль',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: true,
            pageIndex: 4,
            layout: 'menu',
            icon: 'mdi-account-outline',
            headerButtons: {
                // 'mdi-cog': {
                //     method: () => {
                //         router.push({ name: 'settings' });
                //     }
                // }
            }
        }
    },
    {
        name: 'settings',
        path: '/profile/settings',
        component: () => import(/* webpackChunkName: "news" */ '../components/views/Settings.vue'),
        meta: {
            title: 'Настройки',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: true,
            pageIndex: 4,
            layout: 'menu',
            icon: 'mdi-settings-outline',
            backButton: () => {
                router.push({ name: 'profile' });
            }
        }
    },
    {
        name: 'dev',
        path: '/dev',
        component: () => import(/* webpackChunkName: "feedback" */ '../components/views/Dev.vue'),
        meta: {
            title: 'Dev',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'basic'
        }
    },
    {
        name: 'feedback',
        path: '/feedback',
        component: () => import(/* webpackChunkName: "feedback" */ '../components/views/Feedback.vue'),
        meta: {
            title: 'Feedback',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'basic'
        }
    },
    {
        name: 'timesheet',
        path: '/timesheet',
        component: () => import(/* webpackChunkName: "timesheet" */ '../components/views/TimeSheet.vue'),
        meta: {
            title: 'Ресурсы по проектам',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 3,
            layout: 'menu'
        }
    },
    {
        name: 'timesheettemplates',
        path: '/profile/templates',
        component: () => import(/* webpackChunkName: "timesheettemplates" */ '../components/views/ProjectsTemplates.vue'),
        meta: {
            title: 'Шаблоны',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 4,
            layout: 'menu',
            backButton: () => {
                router.push({ name: 'profile' });
            }
        }
    },
    {
        name: 'edittemplate',
        path: '/profile/templates/:id',
        component: () => import(/* webpackChunkName: "timesheettemplates" */ '../components/views/EditTemplate.vue'),
        meta: {
            title: 'Шаблоны',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 4,
            layout: 'menu',
            backButton: () => {
                router.push({ name: 'timesheettemplates' });
            }
        }
    },
    {
        name: 'monthprojects',
        path: '/timesheet/monthprojects/:year/:month',
        component: () => import(/* webpackChunkName: "monthprojects" */ '../components/views/MonthProjects.vue'),
        meta: {
            title: 'Месяц',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 3,
            layout: 'menu',
            backButton: () => {
                router.push({ name: 'timesheet' });
            }
        }
    },
    {
        name: 'dayprojects',
        path: '/timesheet/dayprojects/:year/:month/:day',
        component: () => import(/* webpackChunkName: "dayprojects" */ '../components/views/DayProjects.vue'),
        meta: {
            title: 'День',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 3,
            layout: 'menu',
            backButton: () => {
                router.push({ name: 'monthprojects' });
            }
        }
    },
    {
        name: 'notifications',
        path: '/notifications',
        component: () => import(/* webpackChunkName: "notifications" */ '../components/views/Notifications.vue'),
        meta: {
            title: 'Уведомления',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'basic'
        }
    },
    {
        name: 'group',
        path: '/group',
        component: () => import(/* webpackChunkName: "group" */ '../components/views/Groups.vue'),
        meta: {
            title: 'Группы',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 2,
            layout: 'menu'
        }
    },
    {
        name: 'group-page',
        path: '/group/:id',
        component: GroupPage,
        meta: {
            title: 'Группа',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'menu',
            backButton: () => {
                router.push({ name: 'group' });
            },
            headerButtons: {
                'mdi-cog': {
                    condition: () => {
                        if (store.state.userGroupPermissions && store.state.userGroupPermissions.can_update_group) {
                            return true;
                        }
                        return false;
                    },
                    method: () => {
                        router.push({ name: 'group-management' });
                    }
                }
            }
        }
    },
    {
        name: 'create-group',
        path: '/create-group',
        component: () => import(/* webpackChunkName: "group-page" */ '../components/views/CreateGroup.vue'),
        meta: {
            title: 'Создать группу',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'group'
        }
    },
    {
        name: 'group-management',
        path: '/group/:id/management',
        component: () => import(/* webpackChunkName: "group-page" */ '../components/views/GroupManagement.vue'),
        meta: {
            title: 'Управление группой',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'group'
        }
    },
    {
        name: 'group-applications',
        path: '/group/:id/management/applications',
        component: () => import(/* webpackChunkName: "group-page" */ '../components/views/GroupApplications.vue'),
        meta: {
            title: 'Заявки в группу',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'group'
        }
    },
    {
        name: 'group-members',
        path: '/group/:id/members',
        component: () => import(/* webpackChunkName: "group-page" */ '../components/views/GroupMembers.vue'),
        meta: {
            title: 'Участники группы',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'menu',
            backButton: () => {
                router.push({ name: 'group-page' });
            }
        }
    },
    {
        name: 'group-files',
        path: '/group/:id/files',
        component: () => import(/* webpackChunkName: "group-page" */ '../components/views/GroupFiles.vue'),
        meta: {
            title: 'Файлы группы',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'group'
        }
    },
    {
        name: 'edit-group',
        path: '/group/:id/management/edit-group',
        component: () => import(/* webpackChunkName: "group-page" */ '../components/views/EditGroup.vue'),
        meta: {
            title: 'Редактировать группу',
            authRequired: true,
            showFooter: true,
            showInFooterLinks: false,
            pageIndex: 1,
            layout: 'group'
        }
    }
];
let init = true;
const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    new Promise(resolve => {
        if (init) {
            store
                .dispatch(Action.GET_USER)
                .then(() => resolve())
                .catch(() => resolve());
            init = false;
        } else {
            resolve();
        }
    }).then(() => {
        if (store.state.user && store.state.notificationsId == null) store.dispatch(Action.REGISTER_NOTIFICATIONS);
        if (to.name == 'auth' && store.state.user) {
            next({
                path: '/'
            });
            return;
        }
        if (to.meta.authRequired && store.state.user == null) {
            next({
                name: 'auth'
            });
        } else {
            next();
        }
    });
});
export default router;
