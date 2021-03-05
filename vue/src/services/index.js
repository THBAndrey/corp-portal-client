import { CharecterApi, ProjectsApi, GroupApi, NewspostApi, NotificationApi, NewsType } from './Api';

let characterApi = new CharecterApi();
let projectsApi = new ProjectsApi();
let groupApi = new GroupApi();
let newspostApi = new NewspostApi();
let notificationApi = new NotificationApi();
export { characterApi, projectsApi, groupApi, newspostApi, notificationApi, NewsType };
