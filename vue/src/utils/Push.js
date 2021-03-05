let basePushConf = {
    android: {
        senderID: '974960813753'
    },
    ios: {
        sound: true,
        vibration: true,
        badge: true
    }
};

function basePushRegEvent(data) {
    console.log('registration event: ' + data.registrationId);

    var oldRegId = localStorage.getItem('registrationId');
    if (oldRegId !== data.registrationId) {
        // Save new registration ID
        localStorage.setItem('registrationId', data.registrationId);
        // Post registrationId to your app server as the value has changed
    }
}

function baseErrorEvent(e) {
    console.error(e);
}

function baseNotificationEvent(data) {
    console.log(data);
}

export default class Push {
    constructor({ config, errorCallback, registrationCallback, notificationCallback }) {
        this.push = PushNotification.init(config || basePushConf);

        this.push.on('registration', data => {
            basePushRegEvent(data);
            registrationCallback(data);
        });

        this.push.on('error', error => {
            baseErrorEvent(error);
            errorCallback(error);
        });

        this.push.on('notification', data => {
            baseNotificationEvent(data);
            notificationCallback(data);
        });
    }
}
