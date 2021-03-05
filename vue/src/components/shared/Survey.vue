<template>
    <div class="survey pad-l1">
        <div class="row row-collapse">
            <div class="col col-auto col-vmid">
                <div class="avatar round mar-right-4">
                    <img :src="survey.authorAvatar" @error="$e => ($e.target.src = avatarPlaceholder)" />
                </div>
            </div>
            <div class="col col-auto col-vmid text-truncate">
                <div class="survey__title">
                    {{ survey.author }}
                </div>
                <div>2 дня назад</div>
            </div>
        </div>
        <div class="survey__subtitle mar-top-5 mar-bot-3">{{ survey.title }}</div>
        <div class="survey__description mar-bot-4">
            {{ survey.description }}
        </div>
        <div class="mar-bot-4">
            <div v-for="(item, index) in survey.checkboxes" :key="index" class="pad-2">
                <input
                    class="styled-checkbox"
                    :id="'styled-checkbox-' + index"
                    :value="item.value"
                    :checked="item.selected"
                    type="checkbox"
                />
                <label :for="'styled-checkbox-' + index">{{ item.name }}</label>
                <span class="pull-right">25%</span>
            </div>
        </div>
        <div class="d-flex flex-h-center">
            <button class="btn vote-button">Проголосовать</button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.survey {
    color: #848484;

    .avatar {
        width: 40px;
        height: 40px;
    }

    &__title {
        font-size: 20px;
        line-height: 23px;
    }

    &__subtitle {
        font-size: 18px;
        line-height: 21px;
    }

    &__description {
        line-height: 19px;
    }

    .styled-checkbox {
        position: absolute; // take it out of document flow
        opacity: 0; // hide it

        & + label {
            position: relative;
            cursor: pointer;
            padding: 0;
        }

        // Box.
        & + label:before {
            content: '';
            margin-right: 10px;
            display: inline-block;
            vertical-align: text-top;
            width: 19px;
            height: 19px;
            background: #d8d8d8;
            border: 1px solid #979797;
            border-radius: 4px;
        }

        // Box focus
        &:focus + label:before {
            box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
        }

        // Box checked
        &:checked + label:before {
            background: #7ebdff;
            border: 1px solid #7ebdff;
        }

        // Disabled state label.
        &:disabled + label {
            color: #b8b8b8;
            cursor: auto;
        }

        // Disabled box.
        &:disabled + label:before {
            box-shadow: none;
            background: #ddd;
        }
    }

    .vote-button {
        min-height: 34px;
        background: #7ebdff;
        border-radius: 6px;
        color: #ffffff;
        font-size: 16px;
    }
}
</style>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            avatarPlaceholder: 'img/avatar.png',
            survey: {
                author: 'CORP Portal',
                authorAvatar: '',
                title: 'Описание',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                checkboxes: [
                    {
                        name: 'Вариант 1',
                        value: '1',
                        selected: false
                    },
                    {
                        name: 'Вариант 2',
                        value: '2',
                        selected: true
                    },
                    {
                        name: 'Вариант 3',
                        value: '3',
                        selected: false
                    },
                    {
                        name: 'Вариант 4',
                        value: '4',
                        selected: false
                    }
                ]
            }
        };
    },
    computed: {},
    filters: {},
    methods: {}
};
</script>
