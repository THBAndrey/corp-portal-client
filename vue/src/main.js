import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/';
import '@/css/style.less';
import '@mdi/font/css/materialdesignicons.min.css';
import Ripple from 'vue-ripple-directive';
import Longpress from '@jcharante/vue-long-press-directive';
import VueScrollTo from 'vue-scrollto';
require('intersection-observer');
import { VLazyImagePlugin } from 'v-lazy-image';
import dayjs from 'dayjs';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjsUTC from 'dayjs/plugin/utc';
import dayjsTimezone from 'dayjs/plugin/timezone';
import dayjsRU from 'dayjs/locale/ru';
import VueScroller from 'vue-scroller';
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { characterApi, projectsApi, groupApi, newspostApi, notificationApi } from '@/services/index';
Vue.prototype.$characterApi = characterApi;
Vue.prototype.$projectsApi = projectsApi;
Vue.prototype.$groupApi = groupApi;
Vue.prototype.$newspostApi = newspostApi;
Vue.prototype.$notificationApi = notificationApi;

import LoadLayout from '@/components/layouts/LoadLayout';
Vue.component('LoadLayout', LoadLayout);
dayjs.locale(dayjsRU);
dayjs.extend(dayjsRelativeTime);
dayjs.extend(dayjsLocalizedFormat);
dayjs.extend(dayjsUTC);
dayjs.extend(dayjsTimezone);
Ripple.duration = 200;
Vue.use(VLazyImagePlugin);
Vue.use(VueScrollTo, {
    duration: 500,
    easing: 'ease'
});
Vue.use(Longpress, { duration: 500 });
Vue.use(VueIziToast, {
    position: 'topCenter'
});
Vue.use(VueScroller);
Vue.directive('ripple', Ripple);
Vue.filter('datestamp', (val, frmt) => dayjs(val).format(frmt || 'lll'));
Vue.filter('fromnow', val => dayjs.tz(val, 'Europe/Moscow').fromNow());
Vue.filter('number', val => Number(val));
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
