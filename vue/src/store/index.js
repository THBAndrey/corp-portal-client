import Vue from 'vue';
import Vuex from 'vuex';
import Action from './action';
import Mutation from './mutation';
import { characterApi, newspostApi } from '@/services/index';
/* eslint-disable */
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        apiError: null,
        user: null,
        news: {
            page: 0,
            pages: 1,
            records: []
        },
        newsItem: null,
        newsComments: [],
        articles: {},
        articleItem: null,
        routeScrollPos: {},
        notificationsId: null,
        notificationsType: null,
        pushManager: null,
        userGroupPermissions: null
    },
    mutations: {
        [Mutation.SET_API_ERROR](state, { error }) {
            state.apiError = error;
        },
        [Mutation.SET_USER](state, user) {
            state.user = user;
        },
        [Mutation.SET_ARTICLE](state, { articles }) {
            state.articles = articles;
        },
        [Mutation.SET_ARTICLE_ITEM](state, { articleItem }) {
            state.articleItem = articleItem;
        },
        [Mutation.SET_NEWS](state, { news }) {
            state.news = news;
        },
        [Mutation.ADD_NEWS](state, { news }) {
            state.news.page = news.page;
            state.news.pages = news.pages;
            state.news.records = [...(state.news.records || []), ...news.records];
        },
        [Mutation.SET_NEWS_ITEM](state, { newsItem }) {
            state.newsItem = newsItem;
        },
        [Mutation.SET_NEWS_VOTE](state, { id, vote }) {
            let handler = (news, vote) => {
                if (news.like) {
                    let voteOld = news.like;
                    let propOld = voteOld > 0 ? 'num_likes' : 'num_dislikes';
                    let prop = vote > 0 ? 'num_likes' : 'num_dislikes';

                    news[propOld] = Number(news[propOld]) - 1;
                    news[prop] = Number(news[prop]) + 1;
                    news.like = vote;
                } else {
                    news.like = vote;
                    let prop = vote > 0 ? 'num_likes' : 'num_dislikes';
                    news[prop] = Number(news[prop]) + 1;
                }
            };
            let news = state.news.records ? state.news.records.find(i => i.id == id) : null;
            news && handler(news, vote);
            state.newsItem && state.newsItem.id == id && handler(state.newsItem, vote);
        },
        [Mutation.SET_NEWS_COMMENTS](state, { comments }) {
            state.newsComments = comments;
        },
        [Mutation.ADD_NEWS_COMMENT](state, { comment }) {
            state.newsComments.push(comment);
        },
        [Mutation.SET_ROUTE_SCROLL_POS](state, { name, x, y }) {
            state.routeScrollPos[name] = {
                x,
                y
            };
        },
        [Mutation.SET_NOTIFICATIONS_ID](state, id) {
            state.notificationsId = id;
        },
        [Mutation.SET_PUSH_MANAGER](state, pushManager) {
            state.pushManager = pushManager;
        },
        [Mutation.SET_NOTIFICATIONS_TYPE](state, type) {
            state.notificationsType = type;
        },
        [Mutation.SET_USER_GROUP_PERMISSIONS](state, permissions) {
            state.userGroupPermissions = permissions;
        }
    },
    actions: {
        [Action.LOGOUT]({ commit, state }) {
            return new Promise(resolve => {
                characterApi.removeDevice(state.registrationType, state.notificationsId);
                characterApi.logout().then(() => {
                    commit(Mutation.SET_USER, null);
                    resolve();
                });
            });
        },
        [Action.LOGIN]({ commit }, { name, password }) {
            commit;
            return characterApi.login(name, password);
        },
        [Action.GET_USER]({ commit }) {
            return new Promise((resolve, reject) => {
                characterApi
                    .info()
                    .then(user => {
                        commit(Mutation.SET_USER, user);
                        resolve();
                    })
                    .catch(e => reject(e));
            });
        },
        [Action.GET_NEWS]({ commit }, page = 1) {
            return new Promise(resolve => {
                newspostApi.getUserNews(page).then(news => {
                    commit(Mutation.SET_NEWS, {
                        news
                    });
                    resolve();
                });
            });
        },
        [Action.LOAD_NEWS]({ state, commit }, page = 1) {
            return new Promise(resolve => {
                newspostApi.getUserNews(page).then(news => {
                    let newNews = {
                        page: news.page,
                        pages: news.pages,
                        records: [...state.news.records, ...news.records]
                    };
                    commit(Mutation.SET_NEWS, {
                        news: newNews
                    });
                    resolve();
                });
            });
        },
        [Action.GET_NEWS_ITEM]({ commit, state }, { id }) {
            commit(Mutation.SET_NEWS_COMMENTS, {
                comments: []
            });
            return new Promise(resolve => {
                let newsItem = state.news.records ? state.news.records.find(i => i.id == id) : null;
                if (newsItem) {
                    commit(Mutation.SET_NEWS_ITEM, {
                        newsItem
                    });
                    resolve();
                } else {
                    newspostApi.getPostInfo(id).then(newsItem => {
                        commit(Mutation.SET_NEWS_ITEM, {
                            newsItem
                        });
                        resolve();
                    });
                }
            });
        },
        [Action.GET_NEWS_COMMENTS]({ commit }, { id }) {
            return new Promise(resolve => {
                characterApi.newsCommentsList(id).then(comments => {
                    commit(Mutation.SET_NEWS_COMMENTS, {
                        comments
                    });
                    resolve();
                });
            });
        },
        [Action.VOTE_NEWS]({ commit }, { id, vote }) {
            return new Promise(resolve => {
                characterApi.newsVote(id, vote).then(() => {
                    commit(Mutation.SET_NEWS_VOTE, {
                        id,
                        vote
                    });
                    resolve();
                });
            });
        },
        [Action.ADD_NEWS_COMMENT]({ commit }, { newsId, text }) {
            return new Promise(resolve => {
                characterApi.addNewsComment(newsId, text).then(comment => {
                    commit(Mutation.ADD_NEWS_COMMENT, {
                        comment
                    });
                    resolve(comment);
                });
            });
        },
        [Action.REGISTER_NOTIFICATIONS]({ commit }) {
            let registrationCallback = data => {
                commit(Mutation.SET_NOTIFICATIONS_ID, data.registrationId);
                commit(Mutation.SET_NOTIFICATIONS_TYPE, data.registrationType);
                characterApi.addDevice(data.registrationType, data.registrationId);
            };
            let notificationCallback = data => {
                this.$toast.info(data.message, data.title, {
                    position: 'bottomCenter'
                });
            };

            let pushConfig = {
                android: {
                    senderID: '974960813753'
                },
                ios: {
                    sound: true,
                    vibration: true,
                    badge: true
                }
            };

            // PushNotification instance avaible only when device ready
            document.addEventListener(
                'deviceready',
                () => {
                    let push = PushNotification.init(pushConfig);
                    push.on('registration', registrationCallback);
                    push.on('notification', notificationCallback);
                    commit(Mutation.SET_PUSH_MANAGER, push);
                },
                false
            );
        }
    }
});

export default store;
