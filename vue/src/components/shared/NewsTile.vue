<template>
    <div class="news-tile">
        <div class="pad-l1">
            <div class="mar-bot-3">
                <div class="row row-collapse">
                    <div class="col col-auto col-vmid">
                        <img
                            class="avatar round mar-right-4"
                            style="height: 40px; width: 40px"
                            :src="newsItem.group_id"
                            @error="$e => ($e.target.src = avatarPlaceholder)"
                        />
                    </div>
                    <div class="col d-flex flex-col" style="justify-content: center">
                        <div>
                            <div class="group-name">
                                {{ newsItem.group_name }}
                            </div>
                            <div class="text-muted date">
                                {{ newsItem.date_publish | fromnow }}
                            </div>
                        </div>
                    </div>

                    <context-menu v-if="canEdit" class="col col-auto" :right="true" @click.native.stop.prevent>
                        <template>
                            <div @mousedown.stop v-ripple class="btn btn-icon round" style="margin: 0 -10px 0 0">
                                <div class="icon">
                                    <i class="mdi mdi-dots-vertical mdi-24px"></i>
                                </div>
                            </div>
                        </template>
                        <template v-slot:menu>
                            <ul @mousedown.stop>
                                <li class="text-small">
                                    <div class="d-flex" style="align-items: center">
                                        <div class="mdi mdi-pencil-outline mar-right-3" style="font-size: 18px"></div>
                                        <div>Редактировать</div>
                                    </div>
                                </li>
                                <li @click="deletePost" class="text-small">
                                    <div class="d-flex" style="align-items: center">
                                        <div class="mdi mdi-delete-outline mar-right-3" style="font-size: 18px"></div>
                                        <div>Удалить запись</div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </context-menu>
                </div>
            </div>
            <div class="subject">{{ newsItem.subject | truncateWords }}</div>
            <p v-if="newsItem.text_preview">
                {{ newsItem.text_preview }}
            </p>
            <div v-if="newsItem.image_url_subject" class="pos-rel w-100 radius scroll-hide p" style="padding-top: 62.5%">
                <v-lazy-image
                    class="pos-abs pos-top w-100 h-100"
                    :src-placeholder="imgPlaceholder"
                    :src="imageUrl"
                    :style="{ 'object-fit': 'cover' }"
                    @error.native="
                        $e => {
                            return ($e.target.src = imgPlaceholder);
                        }
                    "
                />
            </div>

            <div class="mar-top-l1">
                <div class="row row-collapse">
                    <div class="col col-auto col-vmid">
                        <news-like-panel
                            v-if="parseInt(newsItem.is_likeable)"
                            :num-likes="newsItem.num_likes | number"
                            :num-dislikes="newsItem.num_dislikes | number"
                            :like="newsItem.like | number"
                            :enabled="newsItem.is_likeable == 1"
                            @like="onLike"
                            @click.native.stop.prevent
                        />
                    </div>
                    <div class="col col-auto col-vmid">
                        <div v-if="parseInt(newsItem.is_commentable)" class="round d-flex flex-v-center flex-h-center">
                            <div class="vote-button mar-right-3">
                                <i class="mdi mdi-comment-multiple mdi-18px" style="line-height: 14px; color: rgba(44, 18, 109, 0.4)"></i>
                            </div>
                            <span style="font-size: 12px">{{ newsItem.num_comments }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.news-tile {
    border-radius: 4px;

    img {
        transition: opacity 0.5s ease;
    }

    .group-name {
        font-size: 14px;
        line-height: 19px;
        font-weight: 500;
    }

    .date {
        font-size: 10px;
        line-height: 17px;
        color: #5c5769;
    }

    .subject {
        font-size: 18px;
    }

    background-color: #fff;
}

.vote-button {
    height: 35px;
    width: 35px;
    background-color: rgb(241, 245, 249);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
}
</style>
<script>
import ContextMenu from '@/components/shared/ContextMenu';
import NewsLikePanel from '@/components/shared/NewsLikePanel';
export default {
    components: {
        NewsLikePanel,
        ContextMenu
    },
    props: {
        newsItem: Object,
        canEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            avatarPlaceholder: 'img/avatar-group.png',
            imgPlaceholder: 'img/img-placeholder.jpg'
        };
    },
    computed: {
        imageUrl() {
            return this.newsItem.image_url_subject;
        }
    },
    filters: {
        truncateWords(val, numWords = 10) {
            let a = val.split(' ');
            if (a.length <= numWords) {
                return val;
            }
            return a.slice(0, numWords).join(' ') + '...';
        }
    },
    methods: {
        onLike(oldVote, vote) {
            this.$emit('like', oldVote, vote);
        },
        deletePost() {
            this.$newspostApi.deletePost(this.newsItem.id).then(() => {
                this.$emit('deleted');
            });
        }
    }
};
</script>
