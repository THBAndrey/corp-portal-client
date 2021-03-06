<template>
    <div class="ui-date-picker d-inline-flex panel scroll-hide">
        <div class="panel-body d-inline-flex flex-col pad-none">
            <div class="row row-collapse row-vgap-none flex-nowrap">
                <div class="col col-auto" v-if="$scopedSlots.left">
                    <!-- 
                    @slot Custom left content
                    -->
                    <slot name="left"></slot>
                </div>
                <div class="col col-auto">
                    <!-- 
                    @slot Custom header content
                    @binding {Function} prevYear    select previous year
                    @binding {Function} prevMonth   select previous month
                    @binding {Function} nextYear    select next year
                    @binding {Function} nextMonth   select next month
                    @binding {Function} setMonth    set month by index (0 = january)
                    @binding {Function} setYear     set year (4-digit)
                    @binding {Function} setToday    set today's date
                    @binding {Number} month         current month index (0 = january)
                    @binding {String} monthName     current month name
                    @binding {Number} year          current year (4-digit)
                    @binding {Array} dayNamesIndexes    day indexes (0 = sunday)
                    @binding {Array} dayNames           day names
                    -->
                    <slot
                        name="header"
                        v-bind="{
                            prevYear,
                            prevMonth,
                            nextYear,
                            nextMonth,
                            setMonth,
                            setYear,
                            setToday,
                            month,
                            monthName: monthNames[month],
                            year,
                            dayNamesIndexes,
                            dayNames
                        }"
                    >
                        <div class="ui-date-picker-header text-small mar-bot-3 bg-primary color-white pad-3">
                            <div class="flex-shrink nobr">
                                <div class="icon cursor-pointer" @click="prevYear">
                                    <i class="mdi mdi-chevron-double-left"></i>
                                </div>
                                <div class="icon cursor-pointer" @click="prevMonth">
                                    <i class="mdi mdi-chevron-left"></i>
                                </div>
                            </div>
                            <div class="flex-grow flex-h-center d-flex">
                                <span>{{ monthNames[month] }}</span>
                                <input class="color-inherit" type="number" v-model.number="year" />
                            </div>
                            <div class="flex-shrink nobr">
                                <div class="icon cursor-pointer" @click="nextMonth">
                                    <i class="mdi mdi-chevron-right"></i>
                                </div>
                                <div class="icon cursor-pointer" @click="nextYear">
                                    <i class="mdi mdi-chevron-double-right"></i>
                                </div>
                            </div>
                        </div>
                    </slot>
                    <div class="ui-date-picker-grid pad-3">
                        <template v-if="!hideDayNames">
                            <div class="ui-date-picker-day-cell text-small" v-for="dayIndex of dayNamesIndexes" :key="`day-${dayIndex}`">
                                <!-- 
                            @slot Custom day content
                            @binding {Number} dayIndex      day index (0 = sunday)
                            @binding {String} dayName       day name
                            @binding {Boolean} isWeekend    whether a weekend day
                            -->
                                <slot
                                    name="cell-day"
                                    v-bind="{
                                        dayIndex,
                                        dayName: dayNames[dayIndex],
                                        isWeekend: isWeekendDay(dayIndex)
                                    }"
                                >
                                    <div class="color-grey-dark">
                                        {{ dayNames[dayIndex] }}
                                    </div>
                                </slot>
                            </div>
                        </template>
                        <div
                            class="ui-date-picker-date-cell text-small"
                            v-for="n in currentMonthDates"
                            :key="`${n.getMonth()}-${n.getDate()}`"
                        >
                            <!-- 
                            @slot Custom date content
                            @binding {Date} date            date
                            @binding {Date} dateStart       range start date
                            @binding {Date} dateEnd         range end date
                            @binding {Number} month         current view month
                            @binding {Number} year          current view year
                            @binding {Boolean} isCurrentMonthDate   is date in current month view
                            @binding {Boolean} isDisabledDate       is date disabled
                            @binding {Boolean} isInRange            is date in range
                            @binding {Boolean} isRangeStart         is date = range start
                            @binding {Boolean} isRangeEnd           is date = range end
                            @binding {Boolean} isSelected           is date selected
                            @binding {Boolean} isToday              is date today
                            @binding {Boolean} isWeekend            is date a weekend day
                            @binding {Function} setDate             set date
                            -->
                            <slot
                                name="cell-date"
                                v-bind="{
                                    date: n,
                                    dateStart,
                                    dateEnd,
                                    month,
                                    year,
                                    isCurrentMonthDate: isCurrentMonthDate(n),
                                    isDisabledDate: isDisabledDate(n),
                                    isInRange: isRangeDate(n),
                                    isRangeStart: isRangeStartDate(n),
                                    isRangeEnd: isRangeEndDate(n),
                                    isSelected: isSelectedDate(n),
                                    isToday: isTodayDate(n),
                                    isWeekend: isWeekendDate(n),
                                    setDate
                                }"
                            >
                                <div
                                    class="btn btn-icon btn-small"
                                    :class="{
                                        'btn-primary': isSelectedDate(n) || isRangeDate(n),
                                        'radius-right-none': isRangeStartDate(n) && !isRangeEndDate(n) && dateEnd,
                                        'radius-left-none': !isRangeStartDate(n) && isRangeEndDate(n),
                                        'radius-none': isRangeDate(n) && !isRangeStartDate(n) && !isRangeEndDate(n),
                                        'disabled radius-none': isDisabledDate(n)
                                    }"
                                    @click="setDate(n)"
                                >
                                    <template v-if="isSelectedDate(n) || isRangeDate(n)">
                                        <div>{{ n.getDate() }}</div>
                                    </template>
                                    <template v-else-if="isTodayDate(n)">
                                        <div class="color-primary">{{ n.getDate() }}</div>
                                    </template>
                                    <template v-else-if="!isCurrentMonthDate(n)">
                                        <div class="text-muted">{{ n.getDate() }}</div>
                                    </template>
                                    <template v-else>
                                        <div class="color-body">{{ n.getDate() }}</div>
                                    </template>
                                </div>
                            </slot>
                        </div>
                    </div>
                </div>
                <div class="col col-auto" v-if="$scopedSlots.right">
                    <!-- 
                    @slot Custom right content
                    -->
                    <slot name="right"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.ui-date-picker {
    color: var(--color-body);
    &-header {
        display: flex;
        align-items: center;
        input {
            width: 3em;
            border: none;
            background: transparent;
            outline: none;
            text-align: center;
            margin: 0;
            padding: 0;
            outline: none;
            -moz-appearance: textfield;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
    }
    &-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: 1fr;
        row-gap: 1px;
    }
    &-day-cell,
    &-date-cell {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .flex-nowrap {
        flex-wrap: nowrap;
    }
    .radius-left-none {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .radius-right-none {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
}
</style>
<script>
import { isDateValid } from 'goodteditor-ui/src/components/ui/utils/Helpers';

export default {
    props: {
        /**
         * @model
         */
        value: {
            type: [Date, Array],
            default: null,
            validation(val) {
                if (Array.isArray(val)) {
                    return val.find(el => !this.isValid(el)) == null;
                } else {
                    return this.isValid(val);
                }
            }
        },
        /**
         * Min date (inclusive)
         */
        min: {
            type: Date,
            default: null
        },
        /**
         * Max date (inclusive)
         */
        max: {
            type: Date,
            default: null
        },
        /**
         * Allowed date filter function(date:Date):Boolean
         */
        allowed: {
            type: Function,
            default: () => true
        },
        /**
         * Range mode
         */
        range: {
            type: Boolean,
            default: false
        },
        /**
         * Day names starting from 'Sunday'
         */
        dayNames: {
            type: Array,
            default() {
                return ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            }
        },
        /**
         * Weekend day indexes (0 = Sunday; 6 = Saturday)
         */
        weekendDays: {
            type: Array,
            default() {
                return [0, 6];
            }
        },
        /**
         * Month names starting from 'January'
         */
        monthNames: {
            type: Array,
            default() {
                return ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            }
        },
        /**
         * Which day is the first day of the week (0 = Sunday; 6 = Saturday)
         */
        dayOfWeek: {
            type: Number,
            default: 1,
            validation(val) {
                return val >= 0 && val < 7;
            }
        },
        hideDayNames: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            date: null,
            dateStart: null,
            dateEnd: null,
            month: null,
            year: null,
            syncMonthYear: true
        };
    },
    computed: {
        dayNamesIndexes() {
            let a = [];
            for (let i = this.dayOfWeek; i < 7 + this.dayOfWeek; ++i) {
                a.push(i >= 7 ? i - 7 : i);
            }
            return a;
        },
        firstDayOfMonth() {
            let n = new Date(this.year, this.month, 1).getDay() - this.dayOfWeek;
            return n < 0 ? 7 + n : n;
        },
        lastDayOfMonth() {
            let n = new Date(this.year, this.month + 1, 0).getDay() - this.dayOfWeek;
            return n < 0 ? 7 + n : n;
        },
        daysInMonth() {
            return new Date(this.year, this.month + 1, 0).getDate();
        },
        currentMonthDates() {
            let dates = [...new Array(this.daysInMonth)].map((v, i) => new Date(this.year, this.month, i + 1));
            return [...this.prevMonthDates, ...dates, ...this.nextMonthDates];
        },
        prevMonthDates() {
            let n = this.firstDayOfMonth;
            let pmd = new Date(this.year, this.month, 0).getDate();
            return [...new Array(n)].map((v, i) => new Date(this.year, this.month - 1, pmd - i)).reverse();
        },
        nextMonthDates() {
            let n = 6 - this.lastDayOfMonth;
            return [...new Array(n)].map((v, i) => new Date(this.year, this.month + 1, i + 1));
        }
    },
    watch: {
        value: {
            handler(val) {
                let d = new Date();
                if (this.range && Array.isArray(val)) {
                    let [start, end] = val;
                    this.dateStart = start || null;
                    this.dateEnd = end || null;
                    d = start || d;
                } else {
                    this.date = val;
                    d = val || d;
                }
                if (this.syncMonthYear) {
                    this.month = d.getMonth();
                    this.year = d.getFullYear();
                }
                this.syncMonthYear = true;
            },
            immediate: true
        },
        range() {
            this.date = null;
            this.dateStart = null;
            this.dateEnd = null;
            this._triggerChange();
        }
    },
    methods: {
        isValid(date) {
            return isDateValid(date);
        },
        prevMonth() {
            let n = this.month - 1;
            this.month = n < 0 ? 11 : n;
            this.year -= n < 0 ? 1 : 0;
        },
        prevYear() {
            this.year = this.year - 1;
        },
        nextMonth() {
            let n = this.month + 1;
            this.month = n > 11 ? 0 : n;
            this.year += n > 11 ? 1 : 0;
        },
        nextYear() {
            this.year = this.year + 1;
        },
        setYear(n) {
            this.year = n;
        },
        setMonth(n) {
            this.month = n;
        },
        setDate(date) {
            let d = this.isValid(date) ? date : new Date(this.year, this.month, date);

            if (this.range) {
                if (!this.dateStart || (this.dateStart && this.dateEnd)) {
                    this.dateStart = d;
                    this.dateEnd = null;
                } else {
                    if (d < this.dateStart) {
                        this.dateEnd = this.dateStart;
                        this.dateStart = d;
                    } else if (d > this.dateStart) {
                        this.dateEnd = d;
                    } else {
                        return;
                    }
                    this._triggerChange();
                }
            } else {
                this.date = d;
                this._triggerChange();
            }
            /**
             * Set date event
             * @property {Date} date
             */
            this.$emit('set-date', d);
        },
        setToday() {
            this.date = new Date();
            this.month = this.date.getMonth();
            this.year = this.date.getFullYear();
            this._triggerChange();
            /**
             * Set date event
             * @property {Date} date
             */
            this.$emit('set-date', this.date);
        },
        isCurrentMonthDate(date) {
            if (this.isValid(date)) {
                return this.month == date.getMonth();
            }
            return true;
        },
        isDisabledDate(date) {
            let d = this.isValid(date) ? date : new Date(this.year, this.month, date);
            let { min, max, allowed } = this;
            return (min && d < min) || (max && d > max) || (allowed && !allowed(d));
        },
        isRangeStartDate(date) {
            let d = this.isValid(date) ? date : new Date(this.year, this.month, date);
            return this.dateStart && +d == +this.dateStart;
        },
        isRangeEndDate(date) {
            let d = this.isValid(date) ? date : new Date(this.year, this.month, date);
            return this.dateEnd && +d == +this.dateEnd;
        },
        isRangeDate(date) {
            let d = this.isValid(date) ? date : new Date(this.year, this.month, date);
            if (this.dateStart && +d == +this.dateStart) {
                return true;
            }
            return this.dateStart && this.dateEnd && d >= this.dateStart && d <= this.dateEnd;
        },
        isSelectedDate(date) {
            let d = this.isValid(date) ? date : new Date(this.year, this.month, date);
            return this.date && +this.date == +d;
        },
        isWeekendDate(date) {
            let d = this.isValid(date) ? date : new Date(this.year, this.month, date);
            return this.weekendDays.includes(d.getDay());
        },
        isTodayDate(date) {
            let d = this.isValid(date) ? date : new Date(this.year, this.month, date);
            let now = new Date();
            return now.getFullYear() === d.getFullYear() && now.getMonth() === d.getMonth() && now.getDate() === d.getDate();
        },
        isWeekendDay(day) {
            return this.weekendDays.includes(day);
        },
        _triggerChange() {
            let val = this.date;
            if (this.range) {
                val = this.dateStart && this.dateEnd ? [this.dateStart, this.dateEnd] : [];
            }
            this.syncMonthYear = false;
            /**
             * Date change event
             * @property {Date} date
             */
            this.$emit('input', val);
            /**
             * Date change event
             * @property {Date} date
             */
            this.$emit('change', val);
        }
    }
};
</script>
