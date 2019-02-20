const article = (state = { list: [], errors: [] }, action) => {

    switch (action.type) {
        case 'WRITE_ARTICLE_OK':
            return Object.assign({}, state, {
                detail: action.payload.response.data.article,
                errors: []
            })

        case 'WRITE_ARTICLE_ERROR':
            return Object.assign({}, state, {
                errors: action.payload.response.errors
            })

        case 'GET_ALL_ARTICLES_OK':
            return Object.assign({}, state, {
                list: action.payload.response.data
            })

        case 'GET_ONE_ARTICLE_OK':
            return Object.assign({}, state, {
                detail: action.payload.response.data
            })

        case 'WRITE_COMMENT_OK':
            return Object.assign({}, state, {
                sucess: action.payload.response,
                detail: action.payload.response.data.article
            })

        case 'DELETE_COMMENT_OK':
            return Object.assign({}, state, {
                sucess: action.payload.response,
                detail: action.payload.response.data
            })

        case 'DELETE_ARTICLE_OK':
            return Object.assign({}, state, {
                list: state.list.filter(article => article._id !== action.payload.response.data.id),
            })

        default:
            return state
    }
}

export default article
