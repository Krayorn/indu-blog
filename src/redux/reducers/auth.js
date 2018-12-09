const auth = (state = { user: false, list: [] }, action) => {

    switch (action.type) {
        case 'REGISTER_OK':
            return Object.assign({}, state, {
                data: action.payload.response
            })

        case 'LOGIN_OK':
            return Object.assign({}, state, {
                user: action.payload.response
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

        default:
            return state
    }
}

export default auth
