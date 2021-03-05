import Service from '../Service';

export class ProjectsApi extends Service {
    constructor() {
        super();
        this.scope = 'project';
    }

    getActiveMonths() {
        return this.request({
            url: 'getactivemonth'
        });
    }
    getActiveDays() {
        return this.request({
            url: 'getactiveday'
        });
    }
    getActualProjects() {
        return this.request({
            url: 'listactual'
        });
    }
    getOtherProjects(year, month, day) {
        let params = {
            year,
            month,
            day
        };
        return this.request({
            url: 'listOther',
            params
        });
    }
    getActualProjectsForDate(year, month, day) {
        let params = {
            year,
            month,
            day
        };
        return this.request({
            url: 'listactual',
            params
        });
    }

    addProjectMonth(year, month, projectId) {
        let params = {
            year,
            month,
            project_id: projectId
        };
        return this.request(
            {
                url: 'addprojectmonth',
                params
            },
            'post'
        );
    }

    addProjectDay(year, month, day, projectId) {
        let params = {
            year,
            month,
            day,
            project_id: projectId
        };
        return this.request(
            {
                url: 'addprojectday',
                params
            },
            'post'
        );
    }

    addProjectsDay(year, month, day, projects) {
        let params = {
            year,
            month,
            day,
            projects
        };
        return this.request(
            {
                url: 'addprojectsday',
                params
            },
            'post'
        );
    }
    removeProjectMonth(year, month, projectId) {
        let params = {
            year,
            month,
            project_id: projectId
        };
        return this.request(
            {
                url: 'delprojectmonth',
                params
            },
            'post'
        );
    }
    removeProjectDay(year, month, day, projectId) {
        let params = {
            year,
            month,
            day,
            project_id: projectId
        };
        return this.request(
            {
                url: 'delprojectday',
                params
            },
            'post'
        );
    }

    removeProjectsDay(year, month, day, projects) {
        let params = {
            year,
            month,
            day,
            projects
        };
        return this.request(
            {
                url: 'delprojectsday',
                params
            },
            'post'
        );
    }
    getProjectsMonth(year, month) {
        let params = {
            year,
            month
        };
        return this.request({
            url: 'getprojectmonth',
            params
        });
    }
    getProjectsDay(year, month, day) {
        let params = {
            year,
            month,
            day
        };
        return this.request({
            url: 'getprojectday',
            params
        });
    }
    setTimeWork(year, month, projectId, timeWorkPercent) {
        let params = {
            year,
            month,
            project_id: projectId,
            time_work_procent: timeWorkPercent
        };
        return this.request(
            {
                url: 'settimework',
                params
            },
            'post'
        );
    }
    setTimeWorkWithDay(year, month, day, projectId, timeWorkPercent, comment) {
        let params = {
            year,
            month,
            day,
            project_id: projectId,
            time_work_procent: timeWorkPercent,
            comment
        };
        return this.request(
            {
                url: 'settimeworkwithday',
                params
            },
            'post'
        );
    }

    setTimeWorksWithDay(year, month, day, projects) {
        let params = {
            year,
            month,
            day,
            projects
        };
        return this.request(
            {
                url: 'settimeworkswithday',
                params
            },
            'post'
        );
    }

    addTemplate({ name, projects }) {
        return this.request(
            {
                url: 'updateTemplate',
                params: { name, project: projects }
            },
            'post'
        );
    }
    updateTemplate({ id, name, projects }) {
        return this.request(
            {
                url: 'updateTemplate',
                params: { id, name, project: projects }
            },
            'post'
        );
    }
    deleteTemplate(id) {
        return this.request(
            {
                url: 'deleteTemplate',
                params: { id }
            },
            'post'
        );
    }
    setTemplateDay(id, year, month, day) {
        return this.request(
            {
                url: 'setTemplateDay',
                params: { id, year, month, day }
            },
            'post'
        );
    }
    listTemplate() {
        return this.request({
            url: 'listTemplate'
        });
    }
    infoTemplate(id) {
        return this.request({
            url: 'infoTemplate',
            params: {
                id
            }
        });
    }
}
