import Service from '../Service';

export class NewspostApi extends Service {
    constructor() {
        super();
        this.scope = 'newspost';
    }

    getPostInfo(id) {
        return this.request({
            url: 'info',
            params: {
                id
            }
        });
    }

    getUserNews(page, groupId) {
        return this.request({
            url: 'current',
            params: {
                page,
                group_id: groupId
            }
        });
    }

    setPostAsRead(id) {
        return this.request(
            {
                url: 'read',
                params: {
                    id
                }
            },
            'post'
        );
    }

    setVote(postId, vote) {
        return this.request(
            {
                url: 'vote',
                params: {
                    id: postId,
                    vote
                }
            },
            'post'
        );
    }

    addOrUpdatePost(
        {
            parentId,
            dateFrom,
            datePublish,
            subject,
            imageUrlSubject,
            imageUrlText,
            groupId,
            link,
            isCommentable,
            isLikeable,
            priorityId,
            textPreview,
            text,
            newsPostTypeId
        },
        id
    ) {
        return this.request(
            {
                url: 'update',
                params: {
                    id,
                    parent_id: parentId,
                    date_from: dateFrom,
                    date_publish: datePublish,
                    subject,
                    image_url_subject: imageUrlSubject,
                    image_url_text: imageUrlText,
                    group_id: groupId,
                    link,
                    is_commentable: isCommentable,
                    is_likeable: isLikeable,
                    priority_id: priorityId,
                    text_preview: textPreview,
                    text,
                    news_post_type_id: newsPostTypeId
                }
            },
            'post'
        );
    }

    deletePost(id) {
        return this.request(
            {
                url: 'delete',
                params: {
                    id
                }
            },
            'post'
        );
    }

    questionInfo(newsPostId) {
        return this.request({
            url: 'questionInfo',
            params: {
                news_post_id: newsPostId
            }
        });
    }

    questionList(page) {
        return this.request({
            url: 'questionListPagination',
            params: {
                page
            }
        });
    }

    questionDelete(id) {
        return this.request(
            {
                url: 'questionDelete',
                params: {
                    id
                }
            },
            'post'
        );
    }

    questionVote(answerId) {
        return this.request(
            {
                url: 'questionVote',
                params: {
                    question_answer_id: answerId
                }
            },
            'post'
        );
    }
}
