<template>
    <div :class="open ? '' : 'hidden'" class="pos-fixed h-100 w-100 post-creater">
        <div class="header">
            <div class="row row-collapse w-100">
                <div class="col col-vmid">
                    <h3 class="last">Создать новость</h3>
                </div>
                <div class="col col-auto">
                    <div class="btn btn-icon round mar-right-l1" style="margin: -6px 0 -6px -12px" v-ripple @click="$emit('change', false)">
                        <div class="icon">
                            <i class="mdi mdi-close mdi-18px"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content pad-5" style="overflow: scroll; height: calc(100vh - 48px)">
            <div class="d-flex flex-col flex-h-center">
                <div class="form-control mar-bot-5">
                    <input class="input" type="text" v-model="subject" />
                    <div class="form-label form-label-small form-label-sticky">Заголовок</div>
                </div>
                <div class="form-control mar-bot-6">
                    <textarea v-model="textPreview" class="textarea"></textarea>
                    <div class="form-label form-label-small form-label-sticky">Текст превью</div>
                </div>
                <div class="form-control mar-bot-6">
                    <textarea v-model="text" class="textarea"></textarea>
                    <div class="form-label form-label-small form-label-sticky">Текст поста</div>
                </div>
                <div class="form-control mar-bot-5">
                    <input class="input" type="text" v-model="picture" />
                    <div class="form-label form-label-small form-label-sticky">Картинка поста</div>
                </div>
                <div class="form-control mar-bot-5">
                    <input class="input" type="text" v-model="picturePreview" />
                    <div class="form-label form-label-small form-label-sticky">Картинка превью</div>
                </div>
                <div class="form-control mar-bot-5">
                    <input class="input" type="text" v-model="link" />
                    <div class="form-label form-label-small form-label-sticky">Ссылка</div>
                </div>
                <div class="form-control mar-bot-5">
                    <label class="checkbox mar-right-3"><input type="checkbox" v-model="isLikeable" /><i></i> </label>
                    <span @click="isLikeable = !isLikeable">Можно лайкать</span>
                </div>
                <div class="form-control mar-bot-5">
                    <label class="checkbox mar-right-3"><input type="checkbox" v-model="isCommentable" /><i></i> </label>
                    <span @click="isCommentable = !isCommentable">Можно комментировать</span>
                </div>
                <button @click="publish" class="btn btn-primary">Опубликовать</button>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc'); // dependent on utc plugin
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

export default {
    props: {
        open: Boolean
    },
    model: {
        prop: 'open',
        event: 'change'
    },
    data() {
        return {
            subject: '',
            textPreview: '',
            text: '',
            picture: '',
            picturePreview: '',
            link: '',
            isCommentable: true,
            isLikeable: true
        };
    },
    methods: {
        publish() {
            this.$newspostApi
                .addOrUpdatePost({
                    subject: this.subject,
                    groupId: this.$route.params.id,
                    link: this.link,
                    imageUrlSubject: this.picturePreview,
                    imageUrlText: this.picture,
                    isCommentable: this.isCommentable,
                    isLikeable: this.isLikeable,
                    textPreview: this.textPreview,
                    text: this.text,
                    newsPostTypeId: 4,
                    datePublish: dayjs().tz('Europe/Moscow').format('DD.MM.YYYY HH:mm')
                })
                .then(data => {
                    this.$emit('change', false);
                    this.$emit('published', data.news_post_id);
                });
        }
    }
};
</script>

<style lang="less" scoped>
.post-creater {
    top: 0%;
    z-index: 1;
    background: white;
    transition: 0.5s;

    &.hidden {
        top: 100%;
    }
}
</style>
