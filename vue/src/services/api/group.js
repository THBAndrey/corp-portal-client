import Service from '../Service';

export class GroupApi extends Service {
    constructor() {
        super();
        this.scope = 'group';
    }

    getGroupInfo(id) {
        return this.request({
            url: 'info',
            params: {
                id
            }
        });
    }

    getUserGroups(page) {
        return this.request({
            url: 'current',
            params: {
                page
            }
        });
    }

    getGroupMembers(groupId, page) {
        return this.request({
            url: 'members',
            params: {
                group_id: groupId,
                page
            }
        });
    }

    getGroupApplications(groupId, page) {
        return this.request({
            url: 'members',
            params: {
                group_id: groupId,
                only_invite: 1,
                page
            }
        });
    }

    getAllGroups(page) {
        return this.request({
            url: 'list',
            params: {
                page
            }
        });
    }

    createOrUpdateGroup({ name, description, avatarId, isPublic, isHidden, allowExit }, id = undefined) {
        return this.request(
            {
                url: 'update',
                params: {
                    id,
                    name,
                    description,
                    avatar_id: avatarId,
                    is_public: isPublic,
                    is_hidden: isHidden,
                    allow_exit: allowExit
                }
            },
            'post'
        );
    }

    closeGroup(id) {
        return this.request(
            {
                url: 'close',
                params: {
                    id
                }
            },
            'post'
        );
    }

    getGroupRoleList(groupId) {
        return this.request({
            url: 'rolelist',
            params: {
                group_id: groupId
            }
        });
    }

    getPermissionList() {
        return this.request({
            url: 'permissionList'
        });
    }

    createOrUpdateRole({ groupId, name, permissions }, id = undefined) {
        return this.request(
            {
                url: 'roleUpdate',
                params: {
                    id,
                    group_id: groupId,
                    name,
                    permissions
                }
            },
            'post'
        );
    }

    deleteRole(id) {
        return this.request(
            {
                url: 'roleDelete',
                params: {
                    id
                }
            },
            'post'
        );
    }

    setUserRole(userId, groupId, roles) {
        return this.request(
            {
                url: 'characterRoleUpdate',
                params: {
                    id: userId,
                    group_id: groupId,
                    roles
                }
            },
            'post'
        );
    }

    sendInvite(groupId, userId) {
        return this.request(
            {
                url: 'invite',
                params: {
                    character_id: userId,
                    group_id: groupId
                }
            },
            'post'
        );
    }

    kickUser(groupId, userId) {
        return this.request(
            {
                url: 'dissmiss',
                params: {
                    character_id: userId,
                    group_id: groupId
                }
            },
            'post'
        );
    }
}
