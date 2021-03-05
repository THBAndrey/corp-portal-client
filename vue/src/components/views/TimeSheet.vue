<template>
    <div class="timesheet h-100 pad-5">
        <div class="year-switch mar-bot-3">
            <div @click="currentYear--"><span class="mdi mdi-chevron-left"></span></div>
            <div>{{ currentYear }}</div>
            <div @click="currentYear++"><span class="mdi mdi-chevron-right"></span></div>
        </div>
        <template v-for="(item, index) in months">
            <router-link tag="div" :key="'item' + index" :to="{ name: 'monthprojects', params: { year: item.year, month: item.month } }">
                <month-item v-ripple :percent="item.time" :month="item.month" :year="item.year" class="mar-bot-2" />
            </router-link>
        </template>
    </div>
</template>

<script>
import MonthItem from '../shared/timesheet/MonthItem';

import dayjs from 'dayjs';

export default {
    components: {
        MonthItem
    },
    data() {
        return {
            allMonths: [],
            currentYear: null
        };
    },
    computed: {
        months() {
            return this.allMonths.filter(x => x.year == this.currentYear).reverse();
        }
    },
    methods: {
        async getMonths() {
            this.allMonths = await this.$projectsApi.getActiveMonths();
        }
    },
    activated() {
        this.getMonths();
    },
    created() {
        let date = dayjs();
        this.currentYear = date.year();
    }
};
</script>

<style lang="less" scoped>
.year-switch {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;

    .mdi {
        font-size: 25px;
    }
}
</style>
