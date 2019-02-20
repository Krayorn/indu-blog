const auth = (state = { user: false, list: [], errors: [] }, action) => {

    switch (action.type) {
        case 'REGISTER_OK':
            return Object.assign({}, state, {
                user: action.payload.response.data,
                errors: []
            })

        case 'REGISTER_ERROR':
            return Object.assign({}, state, {
                errors: (action.payload.response || action.payload.errors ).map(err => err.param ? err.msg : err)
            })

        case 'LOGIN_OK':
            return Object.assign({}, state, {
                user: action.payload.response,
                erorrs: [],
            })

        case 'LOGIN_ERROR':
            return Object.assign({}, state, {
                errors: action.payload.response.errors
            })

        case 'LOGOUT':
            return Object.assign({}, state, {
                user: false
            })

        case 'GET_ALL_USERS_OK':
            return Object.assign({}, state, {
                list: action.payload.response.data
            })

        case 'DELETE_USER_OK':
            return Object.assign({}, state, {
                list: state.list.filter(user => user._id !== action.payload.response.data.id)
            })

        case 'UPDATE_ROLE_OK':
            return Object.assign({}, state, {
                list: state.list.map(user => user._id !== action.payload.response.data._id ? user : {...user, role: action.payload.response.data.role })
            })

        case 'WRITE_COMMENT_OK':
        case 'WRITE_ARTICLE_OK':
            return Object.assign({}, state, {
                user: {
                    ...state.user,
                    gamer: action.payload.response.data.gamerInfo,
                },
                errors: []
            })

        default:
            return state
    }
}

export default auth
