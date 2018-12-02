const auth = (state = { }, action) => {

    switch (action.type) {
        case 'WRITE_COMMENT_OK':
            return Object.assign({}, state, {
                sucess: action.payload.response
            })

        default:
            return state
    }
}

export default auth
