<template>
    <div>
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
            <h3 style="user-select: text">{{ newsItem.subject }}</h3>
            <div class="p" style="white-space: pre-line; user-select: text" v-html="newsItem.text"></div>
            <v-lazy-image
                v-if="imageUrl"
                class="w-100 radius p"
                :src-placeholder="imgPlaceholder"
                :src="imageUrl"
                :style="{ 'object-fit': 'cover' }"
                @error.native="$e => ($e.target.src = imgPlaceholder)"
            />
            <!-- <div class="p">
                <div>Офис: {{ newsItem.clanName || 'не указано' }}</div>
                <div>Приоритет: {{ newsItem.priorName || 'не указано' }}</div>
                <div>Тип: {{ newsItem.typeName || 'не указано' }}</div>
            </div> -->
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
                            <i class="mdi color-primary mdi-comment-multiple mdi-18px" style="line-height: 14px"></i>
                        </div>
                        <span style="font-size: 12px">{{ newsItem.comments.length }}</span>
                    </div>
                </div>
            </div>
            <div v-if="newsItem.link" style="overflow-x: hidden">
                <a :href="newsItem.link" target="_blank" style="word-break: break-all">{{ newsItem.link }}</a>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
img {
    transition: opacity 0.5s ease;
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
import NewsLikePanel from '@/components/shared/NewsLikePanel';
import ContextMenu from '@/components/shared/ContextMenu';

export default {
    components: {
        NewsLikePanel,
        ContextMenu
    },
    props: {
        newsItem: Object
    },
    data() {
        return {
            avatarPlaceholder: 'img/avatar-group.png',
            imgPlaceholder: 'img/img-placeholder.jpg'
        };
    },
    computed: {
        imageUrl() {
            return this.newsItem.image_url_text;
        }
    },
    methods: {
        onLike(oldVote, vote) {
            this.$emit('like', oldVote, vote);
        }
    }
};
</script>
