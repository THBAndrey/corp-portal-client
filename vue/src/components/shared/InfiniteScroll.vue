<template>
    <scroller :on-refresh="refresh" :on-infinite="loadData" refreshText="Обновить" noDataText="Конец списка" ref="scroller">
        <slot v-bind:elements="data.elements"></slot>
    </scroller>
</template>

<script>
export default {
    props: {
        loadFunction: {
            required: true,
            type: Function
        }
    },
    data() {
        return {
            data: {
                page: 0,
                pages: 1,
                elements: []
            },
            lastPage: 0
        };
    },
    methods: {
        async loadSomething(page, clear) {
            let data = await this.loadFunction(page);
            if (clear) {
                this.data.elements = [];
            }
            this.data = {
                page: data.page,
                pages: data.pages,
                elements: [...this.data.elements, ...data.elements]
            };
        },
        refresh(done) {
            this.loadSomething(1, true).finally(() => {
                this.lastPage = 1;
                done();
            });
        },
        clearAndLoad() {
            this.data = {
                page: 0,
                pages: 1,
                elements: []
            };
            this.loadSomething(1, true).finally(() => {
                this.lastPage = 1;
            });
        },
        loadData(done) {
            if (this.lastPage == this.data.pages) {
                done(true);
            } else {
                this.loadSomething(this.lastPage + 1, false).finally(() => {
                    this.lastPage = this.data.page;
                    done();
                });
            }
        }
    }
};
</script>

<style></style>
