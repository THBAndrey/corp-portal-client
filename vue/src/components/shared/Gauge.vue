<template>
    <div ref="container" class="gauge-container">
        <div class="goal-gauge">
            <svg ref="svg">
                <template v-for="(metric, index) in metricsSet">
                    <circle
                        v-if="metric.showLimit"
                        :key="'limit' + index"
                        class="limit-circle"
                        cx="50%"
                        cy="50%"
                        :r="metric.radius"
                        transform-origin="center"
                        @mousemove="mouseMoveHandler"
                        @mouseover="mouseOverHandler(metric, 'limit')"
                        @mouseout="mouseOutHandler"
                        :style="{
                            cursor: 'pointer',
                            'stroke-width': metric.limitWidth,
                            stroke: metric.limitColor
                        }"
                    ></circle>
                    <circle
                        :key="'value' + index"
                        class="value-circle"
                        cx="50%"
                        cy="50%"
                        :r="metric.radius"
                        transform-origin="center"
                        @mousemove="mouseMoveHandler"
                        @mouseover="mouseOverHandler(metric, 'value')"
                        @mouseout="mouseOutHandler"
                        :style="{
                            cursor: 'pointer',
                            'stroke-width': metric.valueWidth,
                            stroke: metric.valueColor,
                            'stroke-linecap': metric.rounded ? 'round' : 'butt',
                            ...getDash(metric.radius, metric.value, metric.limit, metric.format)
                        }"
                    ></circle>
                </template>
            </svg>
            <div ref="tooltip" class="tooltip">
                <template v-if="tooltipMetric && tooltipType">
                    Метрика
                    <br />
                    <span style="white-space: nowrap">
                        <span
                            style="
                                display: inline-block;
                                margin-right: 5px;
                                border-radius: 10px;
                                width: 10px;
                                height: 10px;
                                background-color: hsl(0, 0%, 20%);
                            "
                            :style="{
                                backgroundColor: tooltipType == 'value' ? tooltipMetric.valueColor : tooltipMetric.limitColor
                            }"
                        >
                        </span>
                        <template v-if="tooltipType == 'value'">
                            {{ tooltipMetric.valueName }}:
                            {{ getValueByFormat(tooltipMetric.value, tooltipMetric.limit, tooltipMetric.format)
                            }}{{ tooltipMetric.format == 'percent' ? '%' : '' }}
                        </template>
                        <template v-else> {{ tooltipMetric.limitName }}: {{ tooltipMetric.limit }} </template>
                    </span>
                </template>
            </div>
            <template v-for="(metric, index) in metricsSet">
                <div
                    :key="'title' + index"
                    class="goal-icon"
                    style="z-index: 1000"
                    v-show="metric.title"
                    :style="{ transform: `translate(${metric.valuePosX}px,${metric.valuePosY}px)` }"
                >
                    <span
                        :style="{
                            color: metric.valueSignColor,
                            fontFamily: metric.valueSignFont,
                            fontSize: metric.valueSignFontSize + metric.valueSignFontUnit
                        }"
                        >{{ metric.title }}</span
                    >
                </div>
                <div
                    :key="'valueDesc' + index"
                    class="goal-icon"
                    style="z-index: 1000"
                    v-show="metric.showValueSign"
                    :style="{ transform: `translate(${metric.valuePosX}px,${metric.valuePosY}px)` }"
                >
                    <span
                        :style="{
                            color: metric.valueSignColor,
                            fontFamily: metric.valueSignFont,
                            fontSize: metric.valueSignFontSize + metric.valueSignFontUnit
                        }"
                        >{{ getValueByFormat(metric.value, metric.limit, metric.format) }}{{ metric.format == 'percent' ? '%' : '' }}</span
                    >
                </div>
                <div
                    :key="'limitDesc' + index"
                    class="goal-icon"
                    style="z-index: 1000"
                    v-show="metric.showLimitSign"
                    :style="{ transform: `translate(${metric.limitPosX}px,${metric.limitPosY}px)` }"
                >
                    <span
                        :style="{
                            color: metric.limitSignColor,
                            fontFamily: metric.limitSignFont,
                            fontSize: metric.limitSignFontSize + metric.limitSignFontUnit
                        }"
                        >{{ metric.limit }}</span
                    >
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        metricsSet: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tooltipMetric: null,
            tooltipType: null
        };
    },
    methods: {
        getValueByFormat(value, limit, format) {
            switch (format) {
                case 'limit':
                    return value;
                case 'delta':
                    if (limit - value < 0) {
                        return 0;
                    } else {
                        return limit - value;
                    }
                case 'percent':
                    return parseInt(((value / limit) * 100).toFixed(0));
            }
        },
        getDash(radius, value, maximum, format) {
            const dashArray = radius * Math.PI * 2;
            let percent;
            if (format == 'delta') {
                let delta = maximum - value;
                if (delta < 0) {
                    percent = 0;
                } else if (delta > maximum) {
                    percent = 1;
                } else {
                    percent = delta / maximum;
                }
            } else {
                if (value > maximum) {
                    percent = 1;
                } else {
                    percent = value / maximum;
                }
            }

            const offset = dashArray - dashArray * percent;

            return {
                'stroke-dasharray': dashArray,
                'stroke-dashoffset': offset
            };
        },
        mouseOverHandler(item, type) {
            this.tooltipType = type;
            this.tooltipMetric = item;
            this.$refs.tooltip.style.opacity = 1;
        },
        mouseOutHandler() {
            this.$refs.tooltip.style.opacity = 0;
        },
        mouseMoveHandler(event) {
            let coords = this.getCoords(this.$refs.container);
            let pad = 10;
            this.$refs.tooltip.style.left = event.pageX - coords.left + pad + 'px';
            this.$refs.tooltip.style.top = event.pageY - coords.top + pad + 'px';
        },
        getCoords(elem) {
            let box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        },
        setSvgSize() {
            let svg = this.$refs.svg;
            let lastCircleDiameter =
                (this.metricsSet[this.metricsSet.length - 1].radius +
                    Math.max(
                        this.metricsSet[this.metricsSet.length - 1].valueWidth,
                        this.metricsSet[this.metricsSet.length - 1].limitWidth
                    )) *
                2;
            svg.setAttribute('width', lastCircleDiameter + 'px');
            svg.setAttribute('height', lastCircleDiameter + 'px');
        }
    },
    mounted() {
        this.setSvgSize();
    },
    watch: {
        metricsSet: {
            deep: true,
            handler() {
                this.setSvgSize();
            }
        }
    }
};
</script>

<style scoped>
svg {
    position: relative;
    /* width: 100%;
    height: 100%; */
}
svg circle {
    fill: none;
    stroke: #191919;
    transition: 0.2s;
}

.goal-gauge {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.goal-icon {
    width: 100%;
    pointer-events: none;
}

.goal-gauge .goal-icon {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.gauge-container {
    height: 100%;
    /* width: 100%; */
    position: relative;
    display: flex;
}

.tooltip {
    position: absolute;
    background: rgba(50, 50, 50, 0.7);
    padding: 5px;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s;
    color: rgb(255, 255, 255);
}
</style>
