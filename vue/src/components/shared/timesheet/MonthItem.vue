<template>
    <div class="month-item">
        <div>{{ monthName }}</div>
        <div class="d-flex">
            <Gauge :metricsSet="gaugeData" />
        </div>
    </div>
</template>

<script>
import Gauge from '../Gauge';

export default {
    components: {
        Gauge
    },
    props: {
        percent: Number,
        month: Number,
        year: Number
    },
    computed: {
        monthName() {
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
            return months[this.month - 1];
        },
        gaugeData() {
            return [
                {
                    name: 'metric1',
                    radius: 17,
                    rounded: true,
                    limitColor: '#E4E2E2',
                    showLimit: true,
                    valueColor: this.percent >= 100 ? '#76E09F' : '#ffc048',
                    limitWidth: 2,
                    valueWidth: 3,
                    limit: 100,
                    value: this.percent,
                    showValueSign: true,
                    valueSignFontSize: 11,
                    valueSignFontUnit: 'px',
                    format: 'percent'
                }
            ];
        }
    }
};
</script>

<style scoped>
.month-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    padding: 3px 10px;
    background-color: white;
    font-size: 18px;
}
</style>
