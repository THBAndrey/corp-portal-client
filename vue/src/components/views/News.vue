<template>
    <div class="h-100 w-100">
        <button class="btn fresh-button" :style="scrollPosition > 0 ? 'transform: translate(-50%, 10px);' : ''" @click="scrollFresh">
            Свежие записи
        </button>
        <scroller
            style="background-color: #f1f5f9"
            :on-refresh="refresh"
            :on-infinite="loadNews"
            refreshText="Обновить"
            noDataText="Конец списка"
            ref="scroller"
        >
            <template v-for="newsItem in news.elements">
                <div class="pad-l1" style="margin-bottom: -16px" :key="'tile' + newsItem.id">
                    <news-tile
                        :id="`news-${newsItem.id}`"
                        :news-item="newsItem"
                        @click.native="onNewsItemClick($event, newsItem)"
                        @like="(oldVote, vote) => onNewsItemLike(newsItem, oldVote, vote)"
                        v-ripple
                    />
                </div>
            </template>
        </scroller>
    </div>
</template>

<script>
import NewsTile from '@/components/shared/NewsTile';
// import InfiniteScroll from '@/components/shared/InfiniteScroll';

export default {
    components: {
        NewsTile
        // InfiniteScroll
    },
    data() {
        return {
            lastPage: 0,
            pages: 1,
            scrollPosition: 0,
            scrollObserver: null,
            news: {
                page: 0,
                pages: 1,
                elements: []
            }
        };
    },
    methods: {
        async getNews(page) {
            this.news = await this.$newspostApi.getUserNews(page);
        },
        async loadMoreNews(page) {
            let news = await this.$newspostApi.getUserNews(page);
            this.news = {
                page: news.page,
                pages: news.pages,
                elements: [...this.news.elements, ...news.elements]
            };
        },
        scrollFresh() {
            this.$refs.scroller.scrollTo(this.$refs.scroller.getPosition().left, this.$refs.scroller.getPosition().top, false);

            setTimeout(() => {
                this.$refs.scroller.scrollTo(this.$refs.scroller.getPosition().left, 0, true);
                setTimeout(() => {
                    this.$refs.scroller.triggerPullToRefresh();
                }, 250);
            }, 10);
        },
        refresh(done) {
            this.getNews(1).finally(() => {
                this.lastPage = 1;
                done();
            });
        },
        loadNews(done) {
            if (this.lastPage == this.news.pages) {
                done(true);
            } else {
                this.loadMoreNews(this.lastPage + 1).finally(() => {
                    this.lastPage = this.news.page;
                    done();
                });
            }
        },
        onNewsItemClick(e, newsItem) {
            this.$router.push({
                name: 'news-item',
                params: { newsId: newsItem.id }
            });
        },
        onNewsItemLike(newsItem, oldVote, vote) {
            try {
                this.$newspostApi.setVote(newsItem.id, vote);
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
        }
    },
    mounted() {
        this.lastPage = this.news.page;
        this.scrollObserver = new MutationObserver(mutations => {
            mutations.forEach(() => {
                this.scrollPosition = this.$refs.scroller.getPosition().top;
            });
        });

        let observerConfig = {
            attributes: true,
            childList: false,
            characterData: false,
            attributeOldValue: true
        };

        this.scrollObserver.observe(this.$refs.scroller.content, observerConfig);
    },
    beforeDestroy() {
        this.scrollObserver.disconnect();
    }
};
</script>

<style lang="less" scoped>
.fresh-button {
    position: absolute;
    left: 50%;
    transition: transform 0.1s;
    transform: translate(-50%, -40px);
    z-index: 1;
    padding: 4px 16px;
    border-radius: 15px;
    background-color: rgb(240, 240, 240);
    outline: none;
    box-shadow: none !important;
    font-size: 14px;
    font-weight: 600;
}
</style>
