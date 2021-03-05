<template>
    <div class="bg-white" style="padding: 15px 20px 20px 35px">
        <div class="row row-collapse flex-v-center">
            <div class="col col-auto">
                <div class="avatar avatar-2 round mar-right-4">
                    <img src="" @error="$e => ($e.target.src = avatarPlaceholder)" />
                </div>
            </div>
            <div class="col">
                <input
                    class="input styled-input w-100"
                    :class="{ invalid: invalid }"
                    :value="value"
                    :placeholder="placeholder"
                    :readonly="loading"
                    ref="textarea"
                    @input="e => this.$emit('input', e.target.value)"
                />
            </div>
            <div v-if="value" class="col col-auto">
                <div class="btn btn-primary h-100 mar-left-3" :class="{ 'btn-loading disabled': loading }" v-ripple @click="onSubmit">
                    Отправить
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: 'Напишите сообщение'
        },
        value: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        },
        validator: {
            type: Function,
            default: val => val.trim().length > 0
        }
    },
    data() {
        return {
            invalid: false
        };
    },
    computed: {
        avatarPlaceholder() {
            return this.$store.state.user.sex == 'm' ? 'img/boy2.png' : 'img/girl2.png';
        }
    },
    methods: {
        onSubmit() {
            if (!this.validator(this.value)) {
                this.invalid = true;
                this.$refs.textarea.focus();
                return;
            }
            this.invalid = false;
            this.$emit('submit', this.value);
        }
    }
};
</script>
<style lang="less" scoped>
.styled-input {
    border: 1px solid #f2f6fa;
    background-color: #f2f6fa;
}
</style>
