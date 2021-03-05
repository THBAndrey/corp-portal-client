const NewsType = {
    NEWS: 1,
    ARTICLE: 2
};

// getFileInfo(id) {
//     return this.request({
//         url: 'fileInfo',
//         params: {
//             id
//         }
//     });
// }

// getFileCurrent(groupId, page) {
//     return this.request({
//         url: 'fileCurrent',
//         params: {
//             group_id: groupId,
//             page
//         }
//     });
// }

// getFileList(page) {
//     return this.request({
//         url: 'fileListPagination',
//         params: {
//             page
//         }
//     });
// }

// fileUpdate(groupId) {
//     return this.request({
//             url: 'fileUpdate',
//             params: {
//                 group_id: groupId
//             }
//         },
//         'post'
//     );
// }
export { CharecterApi } from './api/character';
export { ProjectsApi } from './api/projects';
export { NotificationApi } from './api/notification';
export { GroupApi } from './api/group';
export { NewspostApi } from './api/newspost';

export { NewsType };
