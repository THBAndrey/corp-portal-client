<template>
    <scroller :on-refresh="refresh" :on-infinite="loadMore" refreshText="Refresh" noDataText="No more news">
        <div class="grid">
            <news-tile
                :id="`news-${newsItem.id}`"
                :news-item="newsItem"
                :key="newsItem.id"
                @click.native="onNewsItemClick($event, newsItem)"
                @like="vote => onNewsItemLike(newsItem, vote)"
                v-ripple
                v-for="newsItem in news.records"
            />
        </div>
    </scroller>
    <!-- <div class="d-flex flex-col flex-grow scroll-hide">
            <div class="grid">
                <news-tile
                    :id="`news-${newsItem.id}`"
                    :news-item="newsItem"
                    :key="newsItem.id"
                    @click.native="onNewsItemClick($event, newsItem)"
                    @like="(vote) => onNewsItemLike(newsItem, vote)"
                    v-ripple
                    v-for="newsItem in news.records"
                />
            </div>
            <div class="pad-top-l1 pad-bot-l1 text-center" v-if="news.pages > 1">
                <ul class="pagination">
                    <li
                        v-for="page in news.pages"
                        :key="page"
                        :class="{ 'active': (news.page == page)}"
                    >
                        <a href="#" @click.prevent="() => loadNews(page)">{{page}}</a>
                    </li>
                </ul>
            </div>
        </div> -->
</template>
<style lang="less" scoped>
.grid {
    display: grid;
    //grid-gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
<script>
/* eslint-disable no-console */
import Action from '@/store/action';
// import Mutation from '@/store/mutation';
import NewsTile from '@/components/shared/NewsTile';
// import Preloader from '@/components/shared/Preloader';

export default {
    components: {
        NewsTile
        // Preloader
    },
    data() {
        return {
            loading: false,
            user: this.$store.state.user
        };
    },
    computed: {
        news() {
            return this.$store.state.news;
        },
        contentScrollTop() {
            let pos = this.$store.state.routeScrollPos[this.$route.name];
            return pos ? pos.y : 0;
        }
    },
    created() {
        if (!this.news.records) this.loadNews();
    },
    mounted() {
        // this.$nextTick(() => {
        //     this.$refs.content.$el.scrollTop = this.contentScrollTop;
        // });
    },
    // beforeRouteLeave(to, from, next) {
    //     let el = this.$refs.content.$el;
    //     this.$store.commit(Mutation.SET_ROUTE_SCROLL_POS, {
    //         name: this.$route.name,
    //         x: el.scrollLeft,
    //         y: el.scrollTop
    //     });
    //     next();
    // },
    methods: {
        refresh(done) {
            this.$store.dispatch(Action.GET_NEWS, 1).finally(() => done());
        },
        loadMore(done) {
            this.$store.dispatch(Action.GET_NEWS, 1).finally(() => done(true));
        },
        loadNews(page = 1) {
            return this.$store.dispatch(Action.GET_NEWS, page);
        },
        onNewsItemClick(e, newsItem) {
            this.$scrollTo(e.currentTarget, 250, {
                container: this.$refs.content.$el,
                onDone: () => {
                    this.$router.push({
                        name: 'news-item',
                        params: { newsId: newsItem.id }
                    });
                }
            });
        },
        onNewsItemLike(newsItem, vote) {
            this.$store.dispatch(Action.VOTE_NEWS, { id: newsItem.id, vote });
        }
    }
};
</script>
