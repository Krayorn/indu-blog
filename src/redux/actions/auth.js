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
