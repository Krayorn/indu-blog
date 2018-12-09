export function registerUser(payload) {
    return {
        type: 'MDW_REGISTER',
        payload,
    }
}

export function loginUser(payload) {
    return {
        type: 'MDW_LOGIN',
        payload,
    }
}

export function logoutUser() {
    return {
        type: 'LOGOUT',
    }
}

export function getAllUsers(payload) {
    return {
        type: 'MDW_GET_ALL_USERS',
        payload,
    }
}

export function deleteUser(payload) {
    return {
        type: 'MDW_DELETE_USER',
        payload,
    }
}

export function updateRole(payload) {
    return {
        type: 'MDW_UPDATE_ROLE',
        payload,
    }
}
