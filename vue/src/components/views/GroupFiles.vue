<template>
    <div class="d-flex flex-col flex-grow scroll-hide">
        <header-layout>
            <div class="row row-collapse w-100">
                <div class="col col-auto">
                    <div class="btn btn-icon round mar-right-l1" style="margin: -6px 0 -6px -12px" v-ripple @click="$router.go(-1)">
                        <div class="icon">
                            <i class="mdi mdi-arrow-left mdi-18px"></i>
                        </div>
                    </div>
                </div>
                <div class="col col-vmid">
                    <h3 class="last text-bold">Файлы</h3>
                </div>
            </div>
        </header-layout>
        <content-layout>
            <div class="pad-4 h-100">
                <table class="files">
                    <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Имя</th>
                            <th>Дата изменения</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="icon color-primary">
                                    <i class="mdi mdi-file-word mdi-18px"></i>
                                </div>
                            </td>
                            <td>this-is-a-long-file-name.docx</td>
                            <td>Вчера</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="icon color-primary">
                                    <i class="mdi mdi-file-word mdi-18px"></i>
                                </div>
                            </td>
                            <td>this-is-a-long-file-name.docx</td>
                            <td>18.08.20</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="icon color-green">
                                    <i class="mdi mdi-file-excel mdi-18px"></i>
                                </div>
                            </td>
                            <td>file-name.xlxs</td>
                            <td>18.08.20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </content-layout>
    </div>
</template>

<script>
import HeaderLayout from '@/components/layouts/HeaderLayout';
import ContentLayout from '@/components/layouts/ContentLayout';

export default {
    components: {
        HeaderLayout,
        ContentLayout
    },
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
table {
    border: 1px solid #dcdcdc;
    text-align: left;
    border-collapse: collapse;
}

thead {
    background-color: whitesmoke;
}

th,
td {
    padding: 0.75rem;
    border-bottom: 1px solid #dcdcdc;
}

.files {
    width: auto;
}
</style>
