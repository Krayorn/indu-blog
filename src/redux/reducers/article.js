const auth = (state = { list: [] }, action) => {

    switch (action.type) {
        case 'WRITE_ARTICLE_OK':
            return Object.assign({}, state, {
                data: action.payload.response
            })

        case 'GET_ALL_ARTICLES_OK':
            return Object.assign({}, state, {
                list: action.payload.response.data
            })

        case 'GET_ONE_ARTICLE_OK':
            return Object.assign({}, state, {
                detail: action.payload.response.data
            })

        default:
            return state
    }
}

export default auth
