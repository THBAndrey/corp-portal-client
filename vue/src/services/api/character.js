import Service from '../Service';

const NewsType = {
    NEWS: 1,
    ARTICLE: 2
};

export class CharecterApi extends Service {
    constructor() {
        super();
        this.scope = 'character';
    }
    info() {
        return this.request({
            url: 'info'
        });
    }
    login(name, password) {
        let params = {
            email: name,
            password
        };
        return this.request(
            {
                url: 'login',
                params
            },
            'post'
        );
    }
    logout() {
        return this.request(
            {
                url: 'logout'
            },
            'post'
        );
    }
    articleList(page = 1) {
        return this.newsList(page, NewsType.ARTICLE);
    }
    articleInfo(id) {
        return this.newsInfo(id);
    }
    newsList(page = 1, type = NewsType.NEWS) {
        let params = {
            page,
            type
        };
        return this.request({
            url: 'newspostlistcurrent',
            params
        });
    }
    newsInfo(id) {
        let params = {
            id
        };
        return this.request(
            {
                url: 'newspostinfo',
                params
            },
            'post'
        );
    }
    newsVote(id, vote) {
        let params = {
            id,
            vote
        };
        return this.request(
            {
                url: 'newspostvote',
                params
            },
            'post'
        );
    }
    newsCommentsList(newsId) {
        let params = {
            id: newsId
        };
        return this.request(
            {
                url: 'newspostcommentlist',
                params
            },
            'post'
        );
    }
    addNewsComment(newsId, text) {
        let params = {
            news_id: newsId,
            text
        };
        return this.request(
            {
                url: 'newspostcommentupdate',
                params
            },
            'post'
        );
    }
    addFeedback(subject, text) {
        let params = {
            subject,
            text
        };
        return this.request(
            {
                url: 'feedbackadd',
                params
            },
            'post'
        );
    }
    addDevice(type, regId) {
        let params = {
            name: type,
            value: regId
        };
        return this.request(
            {
                url: 'deviceadd',
                params
            },
            'post'
        );
    }
    removeDevice(type, regId) {
        let params = {
            name: type,
            value: regId
        };
        return this.request(
            {
                url: 'deviceremove',
                params
            },
            'post'
        );
    }
}
