<template>
    <div class="pos-rel d-flex flex-col h-100">
        <scroller
            :on-refresh="refresh"
            :on-infinite="
                done => {
                    done(true);
                }
            "
            refreshText="Обновить"
            noDataText=""
            ref="scroller"
        >
            <div class="news-item-content">
                <news-detailed id="news-detailed" :news-item="newsItem" v-if="newsItem" @like="onNewsLike" />
                <div class="pad-left-l1 pad-right-l1">
                    <hr />
                </div>
                <div v-if="parseInt(newsItem.is_commentable) || parseInt(newsItem.num_comments) > 0" class="pad-left-l1 pad-right-l1">
                    <comment-item v-for="comment in comments" :id="`comment-${comment.id}`" :key="comment.id" :comment="comment" />
                </div>
            </div>
        </scroller>
        <!-- <div class="pos-abs pos-bot-right mar-l1" v-if="newsItem && parseInt(newsItem.is_commentable) && !showCommentEditor">
            <div class="btn btn-primary btn-icon btn-large shadow-float round" @click="showCommentEditor = true">
                <div class="icon">
                    <i class="mdi mdi-comment-plus mdi-24px"></i>
                </div>
            </div>
        </div>
        <transition name="showEditor">
            <div class="shim pos-fixed" v-if="showCommentEditor">
                <div class="shim-overlay bg-black" @click="showCommentEditor = false"></div>
                <div class="shim-content pos-abs pos-bot w-100">
                    
                </div>
            </div>
        </transition> -->
        <div v-if="newsItem && parseInt(newsItem.is_commentable)" class="pos-abs w-100" style="bottom: 0px">
            <comment-editor :loading="loadingCommentSubmit" v-model="newComment" @submit="onCommentSubmit" />
        </div>
    </div>
</template>
<style lang="less">
.showEditor-enter-active,
.showEditor-leave-active {
    transition: all 0.2s ease;
    .shim-content {
        transition: all 0.2s ease;
    }
}
.showEditor-enter,
.showEditor-leave-to {
    opacity: 0;
    .shim-content {
        transform: translateY(100%);
    }
}
.showEditor-enter-to {
    opacity: 1;
    .shim-content {
        transform: translateY(0);
    }
}
.news-item-content {
    background-color: white;
    margin: 20px;
}
</style>
<script>
import NewsDetailed from '@/components/shared/NewsDetailed';
import CommentItem from '@/components/shared/CommentItrem';
import CommentEditor from '@/components/shared/CommentEditor';
import { EventBus, EventBusEvent } from '@/utils/EventBus';

export default {
    components: {
        NewsDetailed,
        CommentItem,
        CommentEditor
    },
    props: {
        newsId: {}
    },
    data() {
        return {
            loadingComments: false,
            loadingCommentSubmit: false,
            newComment: '',
            showCommentEditor: false,
            newsItem: null
        };
    },
    computed: {
        comments() {
            return this.newsItem.comments;
        }
    },
    activated() {
        this.newsItem = null;
        this.loadInfo();
    },
    methods: {
        refresh(done) {
            this.loadInfo().finally(() => {
                done();
            });
        },
        async loadInfo() {
            let data = await this.$newspostApi.getPostInfo(this.newsId);
            this.newsItem = data.news_post;
        },
        async onCommentSubmit() {
            this.loadingCommentSubmit = true;
            try {
                let comment = await this.$newspostApi.addOrUpdatePost({
                    parentId: this.newsItem.id,
                    text: this.newComment
                });
                this.newComment = '';
                this.$nextTick(() => {
                    this.$scrollTo(`#comment-${comment.id}`, 500, {
                        container: '#news-detailed'
                    });
                });
                EventBus.$emit(EventBusEvent.SHOW_TOAST, 'Ваш комментарий добавлен');
                let data = await this.$newspostApi.getPostInfo(this.newsId);
                this.newsItem.comments = data.news_post.comments;
            } catch (e) {
                console.error(e);
            }
            this.loadingCommentSubmit = false;
            this.showCommentEditor = false;
        },
        async onNewsLike(oldVote, vote) {
            try {
                await this.$newspostApi.setVote(this.newsItem.id, vote);
                this.newsItem.like = vote;
                if (vote > 0) {
                    if (oldVote < 0) this.newsItem.num_dislikes = Number(this.newsItem.num_dislikes) - 1;
                    this.newsItem.num_likes = Number(this.newsItem.num_likes) + 1;
                }
                if (vote < 0) {
                    if (oldVote > 0) this.newsItem.num_likes = Number(this.newsItem.num_likes) - 1;
                    this.newsItem.num_dislikes = Number(this.newsItem.num_dislikes) + 1;
                }
                if (vote == 0) {
                    if (oldVote < 0) this.newsItem.num_dislikes = Number(this.newsItem.num_dislikes) - 1;
                    if (oldVote > 0) this.newsItem.num_likes = Number(this.newsItem.num_likes) - 1;
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
};
</script>
