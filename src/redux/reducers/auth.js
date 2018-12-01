const auth = (state = {}, action) => {

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

        default:
            return state
    }
}

export default auth
