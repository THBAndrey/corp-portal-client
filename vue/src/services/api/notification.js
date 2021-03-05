import Service from '../Service';

export class NotificationApi extends Service {
    constructor() {
        super();
        this.scope = 'notification';
    }

    getCurrent(page) {
        return this.request({
            url: 'current',
            params: {
                page
            }
        });
    }

    getTypes() {
        return this.request({
            url: 'typelist'
        });
    }

    updateCharecter(notifications) {
        return this.request(
            {
                url: 'typelist',
                params: {
                    notifications
                }
            },
            'post'
        );
    }
}
