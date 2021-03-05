<template>
    <div class="mar-top-5">
        <div class="row">
            <div class="col col-auto">
                <div class="avatar round">
                    <img src="" @error="$e => ($e.target.src = avatarPlaceholder)" />
                </div>
            </div>
            <div class="col" style="padding-left: 10px">
                <div class="radius" style="padding: 5px 10px; background-color: #f2f6fa">
                    <div>
                        <div class="row">
                            <div class="col">
                                <div style="font-weight: 500; white-space: nowrap">
                                    {{ comment.character_name.split(' ').splice(0, 2).join(' ') }}
                                </div>
                            </div>
                            <div class="col">
                                <div class="text-xsmall color-grey" style="line-height: 21px; text-align: right">
                                    {{ comment.date_from | fromnow }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <span class="mar-top-4" style="user-select: text; overflow-wrap: anywhere">{{ comment.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        comment: {
            type: Object
        }
    },
    computed: {
        avatarPlaceholder() {
            let sex = this.comment.character_sex;
            return sex ? (sex == 'm' ? 'img/boy2.png' : 'img/girl2.png') : 'img/human0.png';
        }
    }
};
</script>
