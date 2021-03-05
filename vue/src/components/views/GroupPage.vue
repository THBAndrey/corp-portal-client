<template>
    <div class="h-100 w-100">
        <infinite-scroll ref="scrollController" :loadFunction="loadData">
            <template v-slot="{ elements }">
                <div class="group pos-rel d-flex flex-col h-100">
                    <template v-if="info">
                        <div class="row row-collapse pad-l1 group__header group__header--back">
                            <div class="col col-vmid text-truncate"></div>
                        </div>
                        <div class="w-100 group-info">
                            <div class="row">
                                <div class="col col-auto">
                                    <div class="avatar round">
                                        <img :src="info.avatar_name" @error="$e => ($e.target.src = avatarPlaceholder)" />
                                    </div>
                                </div>
                                <div class="col d-flex" style="padding-left: 10px; align-items: center">
                                    <div>
                                        <div class="group-info__name">
                                            {{ info.name }}
                                        </div>
                                        <div>
                                            <div class="group-info__type">
                                                <span> {{ isPublic ? 'Открытая группа' : 'Закрытая группа' }} </span>
                                                <span style="width: 15px; display: inline-block; text-align: center">|</span>
                                                <span> Участники: {{ info.num_members }} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <router-link
                                    :to="{ path: info.id + '/members' }"
                                    tag="div"
                                    class="col col-auto d-flex"
                                    style="align-items: flex-end"
                                >
                                    <AvatarStack :numMembers="Number(info.num_members)" />
                                </router-link>
                            </div>
                            <hr style="margin: 15px 0 10px 0" />
                            <div class="d-flex group-info__block">
                                <span class="mdi mdi-information-outline"></span>
                                <div class="text">
                                    {{ info.description }}
                                </div>
                            </div>
                            <div class="d-flex group-info__block">
                                <span class="mdi mdi-phone-dial"></span>
                                <div class="text">Контакты</div>
                            </div>
                            <div class="d-flex group-info__block">
                                <span class="mdi mdi-file-document-multiple-outline"></span>
                                <div class="text">Файлы</div>
                            </div>

                            <div class="row">
                                <context-menu class="col">
                                    <template>
                                        <button
                                            @click.stop="enter"
                                            v-if="!isMember && !isInvite"
                                            class="btn btn-primary w-100"
                                            style="
                                                background: transparent linear-gradient(152deg, #5f126d 0%, #2c126d 51%, #2a1167 100%) 0% 0%
                                                    no-repeat padding-box;
                                            "
                                        >
                                            <span v-if="isPublic">Вступить в группу</span>
                                            <span v-else>Подать заявку</span>
                                        </button>

                                        <button v-if="isInvite" class="btn btn-outline w-100">Заявка отправлена</button>

                                        <button v-if="isMember && !isInvite" class="btn btn-outline w-100">Участник</button>
                                    </template>
                                    <template v-slot:menu>
                                        <ul>
                                            <li v-if="canLeave" class="text-small">
                                                <span @click="isPopupOpened = true">Покинуть группу</span>
                                            </li>
                                            <li class="text-small">
                                                <span>Скрыть новости группы</span>
                                            </li>
                                        </ul>
                                    </template>
                                </context-menu>

                                <div v-if="isMember" class="col">
                                    <button class="btn btn-outline w-100">Уведомления</button>
                                </div>
                            </div>
                            <!-- <div style="margin-right: -10px; margin-left: -10px">
                                    <div class="row">
                                        <context-menu class="col">
                                            <template>
                                                <div
                                                    @click.stop="enter"
                                                    v-if="!isMember && !isInvite"
                                                    class="d-flex flex-col flex-v-center"
                                                >
                                                    <div class="icon color-grey">
                                                        <i class="mdi mdi-plus-box-outline mdi-24px"></i>
                                                    </div>
                                                    <div v-if="isPublic" class="text-small text-bold color-grey">Вступить</div>
                                                    <div v-else class="text-small text-bold color-grey">Подать заявку</div>
                                                </div>
                                                <div v-if="isInvite" class="d-flex flex-col flex-v-center">
                                                    <div class="icon color-grey">
                                                        <i class="mdi mdi-arrow-right-bold-box-outline mdi-24px"></i>
                                                    </div>
                                                    <div class="text-small text-bold color-grey">Заявка отправлена</div>
                                                </div>
                                                <div v-if="isMember && !isInvite" class="d-flex flex-col flex-v-center">
                                                    <div class="icon color-grey">
                                                        <i class="mdi mdi-check-box-outline mdi-24px"></i>
                                                    </div>
                                                    <div class="text-small text-bold color-grey">Участник</div>
                                                </div>
                                            </template>
                                            <template v-slot:menu>
                                                <ul>
                                                    <li v-if="canLeave" class="text-small">
                                                        <span @click="isPopupOpened = true">Покинуть группу</span>
                                                    </li>
                                                    <li class="text-small">
                                                        <span>Скрыть новости группы</span>
                                                    </li>
                                                </ul>
                                            </template>
                                        </context-menu>

                                        <context-menu v-if="info.permission_list.can_update_user === 1" class="col">
                                            <template>
                                                <div class="d-flex flex-col flex-v-center">
                                                    <div class="icon color-grey">
                                                        <i class="mdi mdi-account-plus-outline mdi-24px"></i>
                                                    </div>
                                                    <div class="text-small text-bold color-grey">Пригласить</div>
                                                </div>
                                            </template>
                                            <template v-slot:menu>
                                                <ul>
                                                    <li class="text-small">
                                                        <span>Пригласить по ссылке</span>
                                                    </li>
                                                    <li class="text-small">
                                                        <span>Пригласить друзей</span>
                                                    </li>
                                                </ul>
                                            </template>
                                        </context-menu>

                                        <context-menu class="col">
                                            <template>
                                                <div class="d-flex flex-col flex-v-center">
                                                    <div class="icon color-grey">
                                                        <i class="mdi mdi-share-outline mdi-24px"></i>
                                                    </div>
                                                    <div class="text-small text-bold color-grey">Поделиться</div>
                                                </div>
                                            </template>
                                        </context-menu>

                                        <context-menu class="col">
                                            <template>
                                                <div class="d-flex flex-col flex-v-center">
                                                    <div class="icon color-grey">
                                                        <i class="mdi mdi-bell-outline mdi-24px"></i>
                                                    </div>
                                                    <div class="text-small text-bold color-grey">Уведомления</div>
                                                </div>
                                            </template>
                                        </context-menu>
                                    </div>
                                </div> -->
                        </div>

                        <!-- <div class="group__info">
                                <router-link
                                    :to="{ path: info.id + '/members' }"
                                    tag="div"
                                    class="row row-collapse pad-l1 group__info-item"
                                >
                                    <div class="col col-vmid text-truncate">Участники</div>
                                    <div class="col col-auto col-vmid">{{ info.num_members }}</div>
                                </router-link>
                                <router-link
                                    :to="{
                                        path: info.id + '/members',
                                        query: { contacts: true }
                                    }"
                                    tag="div"
                                    class="row row-collapse pad-l1 group__info-item"
                                >
                                    <div class="col col-vmid text-truncate">Контакты</div>
                                    <div class="col col-auto col-vmid">0</div>
                                </router-link>
                                <router-link
                                    :disabled="true"
                                    :event="false ? 'click' : ''"
                                    :to="{ path: info.id + '/files' }"
                                    tag="div"
                                    class="row row-collapse pad-l1 group__info-item"
                                >
                                    <div class="col col-vmid text-truncate">Файлы</div>
                                    <div class="col col-auto col-vmid"><span class="mdi mdi-lock"></span></div>
                                </router-link>
                                 <div class="row row-collapse pad-l1 group__info-item">
                                    <div class="col col-vmid text-truncate">Посты</div>
                                    <div class="col col-auto col-vmid">
                                        {{ elements.length }}
                                    </div>
                                </div>
                            </div> -->
                    </template>

                    <template v-for="(newsItem, index) in elements">
                        <news-tile
                            :key="'tile' + newsItem.id"
                            :id="`news-${newsItem.id}`"
                            :news-item="newsItem"
                            class="mar-top-5 mar-left-5 mar-right-5"
                            @click.native="onNewsItemClick($event, newsItem)"
                            @deleted="elements.splice(index, 1)"
                            @like="(oldVote, vote) => onNewsItemLike(newsItem, oldVote, vote)"
                            v-ripple
                        />
                    </template>
                </div>
            </template>
        </infinite-scroll>

        <div v-if="info && info.permission_list.can_create_news" @click="createPost = true" class="new-post-button">
            <div class="btn btn-icon btn-large shadow-float round" style="background: white">
                <div class="icon">
                    <i class="mdi mdi-pencil mdi-24px"></i>
                </div>
            </div>
        </div>
        <post-creater @published="onPublished" v-model="createPost"></post-creater>

        <div v-if="isPopupOpened" class="popup">
            <div class="popup-dialog mar-6">
                <div class="popup-dialog-body">
                    <h4 class="text-bold">Покинуть группу</h4>
                    <div class="text-small">
                        Это частная группа. Если Вы покинете ее, попасть обратно, возможно, будет непросто. Выйти из группы?
                    </div>
                </div>
                <div class="popup-dialog-footer pad-top-none d-flex">
                    <span @click="isPopupOpened = false" class="btn btn-ghost">нет</span>
                    <span @click="leave(), (isPopupOpened = false)" class="btn btn-ghost">да</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import HeaderLayout from '@/components/layouts/HeaderLayout';
// import ContentLayout from '@/components/layouts/ContentLayout';
import NewsTile from '@/components/shared/NewsTile';
import PostCreater from '@/components/shared/PostCreater';
import InfiniteScroll from '@/components/shared/InfiniteScroll';
import ContextMenu from '@/components/shared/ContextMenu';
import AvatarStack from '@/components/shared/AvatarStack';
import { mapState, mapMutations } from 'vuex';
import Mutation from '../../store/mutation';
export default {
    components: {
        // HeaderLayout,
        // ContentLayout,
        NewsTile,
        PostCreater,
        InfiniteScroll,
        ContextMenu,
        AvatarStack
    },
    data() {
        return {
            isPopupOpened: false,
            createPost: false,
            avatarPlaceholder: 'img/avatar-group.png',
            info: null
        };
    },
    methods: {
        async loadData(page) {
            let [groupData, groupNews] = await Promise.all([
                this.$groupApi.getGroupInfo(this.$route.params.id),
                this.$newspostApi.getUserNews(page, this.$route.params.id)
            ]);
            this.info = groupData.info;
            this.setPermissions(groupData.info.permission_list);
            return groupNews;
        },
        async leave() {
            let data = await this.$groupApi.kickUser(this.info.id);
            this.$refs.scrollController.clearAndLoad();
            console.log(data);
        },
        async enter() {
            let data = await this.$groupApi.sendInvite(this.info.id, this.user.id);
            this.$refs.scrollController.clearAndLoad();
            console.log(data);
        },
        onNewsItemClick(e, newsItem) {
            this.$router.push({
                name: 'news-item',
                params: { newsId: newsItem.id }
            });
        },
        async onNewsItemLike(newsItem, oldVote, vote) {
            try {
                await this.$newspostApi.setVote(newsItem.id, vote);
                newsItem.like = vote;
                if (vote > 0) {
                    if (oldVote < 0) newsItem.num_dislikes = Number(newsItem.num_dislikes) - 1;
                    newsItem.num_likes = Number(newsItem.num_likes) + 1;
                }
                if (vote < 0) {
                    if (oldVote > 0) newsItem.num_likes = Number(newsItem.num_likes) - 1;
                    newsItem.num_dislikes = Number(newsItem.num_dislikes) + 1;
                }
                if (vote == 0) {
                    if (oldVote < 0) newsItem.num_dislikes = Number(newsItem.num_dislikes) - 1;
                    if (oldVote > 0) newsItem.num_likes = Number(newsItem.num_likes) - 1;
                }
            } catch (e) {
                console.error(e);
            }
        },
        onPublished(id) {
            this.$newspostApi.getPostInfo(id).then(data => {
                this.$refs.scrollController.data.elements.unshift(data.news_post);
            });
        },
        ...mapMutations({
            setPermissions: Mutation.SET_USER_GROUP_PERMISSIONS
        })
    },
    computed: {
        ...mapState({
            user: 'user'
        }),
        isMember() {
            return Number(this.info?.is_member);
        },
        isPublic() {
            return Number(this.info?.is_public);
        },
        isHidden() {
            return Number(this.info?.is_hidden);
        },
        isInvite() {
            return Number(this.info?.is_invite);
        },
        canLeave() {
            return Number(this.info?.allow_exit);
        },
        canUpdateGroup() {
            return Number(this.info?.permission_list.can_update_group);
        }
    },
    activated() {
        if (this.info && this.$route.params.id !== this.info.id) {
            this.info = null;
            this.$refs.scrollController.clearAndLoad();
        } else {
            if (this.info) this.setPermissions(this.info.permission_list);
        }
    },
    deactivated() {
        this.setPermissions(null);
    }
};
</script>

<style lang="less" scoped>
.group {
    color: #707070;

    &-info {
        padding: 15px 20px;
        background-color: white;

        .avatar {
            width: 40px;
            height: 40px;
        }

        &__name {
            font-size: 20px;
            line-height: 20px;
            color: black;
            font-weight: 500;
        }

        &__type {
            font-size: 10px;
            line-height: 13px;
        }

        &__block {
            margin-bottom: 16px;

            .mdi {
                font-size: 17px;
                margin: -5px 10px 0 0;
            }

            .text {
                white-space: normal;
                color: black;
                line-height: 20px;
            }
        }
    }

    &__background {
        object-fit: cover;
        width: 100%;
        margin-top: -40px;
    }

    &__header {
        color: #ffffff;

        &--back {
            background-image: url('../../../public/img/group-back.png');
            width: 100%;
            min-height: 180px;
            background-position: bottom;
            background-size: cover;
        }
    }

    &__info {
        &-item {
            background-color: #dadada;
            margin-bottom: 4px;
            font-size: 15px;
            line-height: 18px;

            &:last-child {
                background-color: #ffffff;
                margin-bottom: 0;
                font-size: 17px;
                line-height: 20px;
            }
        }

        .invite-dropdown {
            top: 70px;
            right: 4px;
        }

        .leave-dropdown {
            top: 70px;
            left: 4px;
        }
    }

    .popup-dialog-footer {
        justify-content: flex-end;
    }
}

.new-post-button {
    position: fixed;
    right: 15px;
    bottom: 63px;
}
</style>
