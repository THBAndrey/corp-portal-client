import Vue from 'vue';

let EventBusEvent = {
    SHOW_TOAST: 'showToast'
};
let EventBus = new Vue();

export { EventBus, EventBusEvent };
