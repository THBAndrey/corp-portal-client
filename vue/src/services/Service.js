import Http from '@/utils/Http';
// import isDev from "@/utils/isDev";

export default class Service {
    constructor() {
        this.scope = '';
        this.http = new Http({
            baseURL: 'https://corport-demo.goodt.me/api',
            withCredentials: true
        });
    }
    request({ url, params, options }, method = 'get') {
        let responseHandler = response => response.data;
        url = this.scope ? `${this.scope}/${url}` : url;
        return this.http.request({
            url,
            params,
            method,
            options,
            responseHandler
        });
    }
}
