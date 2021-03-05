<template>
    <!-- <input
        ref="input"
        @input="onInput"
        @change="onInput"
        :step="step"
        :min="min"
        :max="max"
        :value="value"
        :thumbColor="color"
        :background="rangeInputBackground"
        borderRadius="5px"
        class="styled-input"
        type="range"
    /> -->
    <input
        ref="input"
        @input="onInput"
        @change="onInput"
        class="styled-input"
        type="range"
        :value="value"
        :step="step"
        :min="min"
        :max="max"
        :style="{
            background: rangeInputBackground,
            borderRadius: '5px',
            color: color
        }"
    />
</template>

<script>
export default {
    model: {
        event: 'input',
        prop: 'value'
    },
    props: {
        value: {
            type: [String, Number],
            required: true
        },
        min: {
            type: [String, Number],
            default: 0
        },
        max: {
            type: [String, Number],
            default: 100
        },
        trueMax: {
            type: [String, Number],
            default: 100
        },
        stepsEnabled: {
            type: Boolean,
            default: false
        },
        step: {
            type: [String, Number],
            default: 1
        },
        stepWidth: {
            type: [String, Number],
            default: 1
        },
        stepColor: {
            type: String,
            default: '#fff'
        },
        color: {
            type: String,
            default: '#FFC048'
        },
        trackColor: {
            type: String,
            default: '#E9ECF0'
        }
    },
    data: () => ({
        rangeInputBackground: 'transparent'
    }),
    methods: {
        onInput(e) {
            if (e.target.value > this.trueMax) {
                e.target.value = this.trueMax;
                return;
            }
            this.$emit('input', e.target.value);
        },
        refill() {
            let percent = ((this.value - this.min) / (this.max - this.min)) * 100;
            let stepWidth = this.stepsEnabled ? this.stepWidth : 0;
            this.rangeInputBackground = `-webkit-gradient(linear, left top, right top, color-stop(${percent}%, ${
                this.color
            }), color-stop(${percent}%, transparent)),
            repeating-linear-gradient(
                90deg,
                ${this.trackColor},
                ${this.trackColor} ${this.$refs.input.offsetWidth / ((this.max - this.min) / this.step) - stepWidth}px,
                ${this.stepColor} ${this.$refs.input.offsetWidth / ((this.max - this.min) / this.step) - stepWidth}px,
                ${this.stepColor} ${this.$refs.input.offsetWidth / ((this.max - this.min) / this.step)}px
            )`;
        }
    },
    mounted() {
        this.$watch(
            () => [this.value, this.min, this.max, this.step, this.stepWidth, this.stepColor, this.color, this.backgroundColor],
            this.refill,
            {
                immediate: true // run immediately
            }
        );
    }
};
</script>

<style lang="less" scoped>
.styled-input {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */

    &:focus {
        outline: none;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 1px solid #ffffff;
        height: 20px;
        width: 20px;
        background: currentColor;
        border-radius: 50%;
        cursor: pointer;
        margin-top: -5px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
        box-shadow: 0px 3px 6px #00000029; /* Add cool effects to your sliders! */
    }

    &::-moz-range-thumb {
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #ffffff;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: currentColor;
        cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 10px;
        cursor: pointer;
        margin: 0 -10px;
    }

    &::-moz-range-progress {
        height: 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    &::-moz-range-track {
        width: 100%;
        height: 10px;
        cursor: pointer;
    }
}
</style>
