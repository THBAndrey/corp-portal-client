<template>
    <div class="month-projects h-100 pad-4">
        <div class="month-switch mar-bot-3">
            <router-link
                tag="div"
                :to="{
                    name: 'monthprojects',
                    params: {
                        year: $route.params.month != 1 ? $route.params.year : Number($route.params.year) - 1,
                        month: $route.params.month != 1 ? Number($route.params.month) - 1 : 12
                    }
                }"
            >
                <span class="mdi mdi-chevron-left"></span>
            </router-link>
            <div>{{ getMonthName($route.params.month) }} {{ $route.params.year }}</div>
            <router-link
                tag="div"
                :to="{
                    name: 'monthprojects',
                    params: {
                        year: $route.params.month != 12 ? $route.params.year : Number($route.params.year) + 1,
                        month: $route.params.month != 12 ? Number($route.params.month) + 1 : 1
                    }
                }"
            >
                <span class="mdi mdi-chevron-right"></span>
            </router-link>
        </div>
        <div v-if="days" class="w-100 d-flex flex-h-center">
            <DatePicker :value="firstDay" hideDayNames>
                <template #header="{ dayNames, dayNamesIndexes }">
                    <div
                        style="
                            border-bottom: solid 1px #eee;
                            display: grid;
                            grid-template-columns: repeat(7, 1fr);
                            grid-auto-rows: 1fr;
                            row-gap: 1px;
                        "
                        class="pad-3"
                    >
                        <div
                            v-for="(dayNameIndex, i) in dayNamesIndexes"
                            :key="i"
                            style="position: relative; display: flex; align-items: center; justify-content: center"
                        >
                            {{ dayNames[dayNameIndex].toLowerCase() }}
                        </div>
                    </div>
                </template>
                <template #cell-date="{ date, isSelected, isToday, setDate, isCurrentMonthDate, isWeekend }">
                    <div
                        @click="
                            isCurrentMonthDate && isDateExist(date.getDate()) ? ((selectedDay = date.getDate()), (openManager = true)) : ''
                        "
                        class="btn btn-icon mar-2 pad-none round pos-rel"
                        :style="isCurrentMonthDate && isDateExist(date.getDate()) ? 'box-shadow: 0 0 15px #e1e2e780' : ''"
                    >
                        <div v-if="isToday" class="pos-abs bg-primary" style="width: 4px; height: 4px; border-radius: 50%; top: 6px"></div>
                        <Gauge
                            v-if="isCurrentMonthDate && days.find(x => x.day == date.getDate()) && !isWeekend"
                            :metricsSet="getGaugeDataForDay(date.getDate())"
                        />
                        <div v-else :class="isWeekend || !isCurrentMonthDate ? 'text-muted' : ''">{{ date.getDate() }}</div>
                    </div>
                </template>
            </DatePicker>
        </div>
        <load-layout v-else></load-layout>
        <DayTimeManager v-if="date" v-model="openManager" @updated="getDays" :forDate="date" />
    </div>
</template>

<script>
// import ProgressRing from '@/components/shared/ProgressRing';
import DayTimeManager from '../shared/DayTimeManager';
import DatePicker from '../shared/DatePicker';
import Gauge from '../shared/Gauge';

export default {
    components: {
        // ProgressRing,
        DayTimeManager,
        DatePicker,
        Gauge
    },
    data() {
        return {
            days: null,
            openManager: false,
            selectedDay: null
        };
    },
    computed: {
        date() {
            if (this.selectedDay && this.openManager) {
                return {
                    year: this.$route.params.year,
                    month: this.$route.params.month,
                    day: this.selectedDay
                };
            } else {
                return null;
            }
        },
        firstDay() {
            return new Date(this.$route.params.year, this.$route.params.month - 1);
        }
    },
    methods: {
        getGaugeDataForDay(day) {
            let dayValue = this.days.find(x => x.day == day).time;
            return [
                {
                    name: 'metric1',
                    radius: 18,
                    rounded: true,
                    limitColor: '#E4E2E2',
                    showLimit: false,
                    valueColor: dayValue >= 100 ? '#76E09F' : '#ffc048',
                    limitWidth: 3,
                    valueWidth: 4,
                    limit: 100,
                    value: dayValue,
                    showValueSign: false,
                    valueSignFontSize: 14,
                    valueSignFontUnit: 'px',
                    format: 'percent',
                    title: day
                }
            ];
        },
        isDateExist(day) {
            return Boolean(this.days.find(x => x.day == day));
        },
        getMonthName(month) {
            let months = [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь'
            ];
            return months[month - 1];
        },
        async getDays(year = this.$route.params.year, month = this.$route.params.month) {
            let data = await this.$projectsApi.getActiveDays();
            this.days = data.filter(x => x.year == year && x.month == month);
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (to.name == from.name) {
            this.days = null;
            this.getDays(to.params.year, to.params.month);
        }
        next();
    },
    activated() {
        this.days = null;
        this.getDays();
    }
};
</script>

<style lang="less" scoped>
.month-projects {
}

.content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.days-block {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.day-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
}

.project-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 16px;
    background-color: white;
}

#value {
    position: absolute;
    top: 0;
    color: #0075ff;
    font-size: 14px;
}

.month-switch {
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
