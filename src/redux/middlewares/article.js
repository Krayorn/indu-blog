import { restPost, restGet } from '../../services/api.js'

const authMiddleware = {
    MDW_WRITE_ARTICLE: (payload, dispatch) => {
        restPost('/article', payload, { "x-access-token": payload.token })
        .then(
            data => dispatch({type: 'WRITE_ARTICLE_OK', payload: {response: data}}),
            err => dispatch({ type: 'WRITE_ARTICLE_ERROR', payload: {err} })
        )
    },
    MDW_GET_ALL_ARTICLES: (payload, dispatch) => {
        restGet('/article')
        .then(
            data => dispatch({type: 'GET_ALL_ARTICLES_OK', payload: {response: data}}),
            err => dispatch({ type: 'GET_ALL_ARTICLES_ERROR', payload: {err} })
        )
    },
    MDW_GET_ONE_ARTICLE: (payload, dispatch) => {
        restGet(`/article/${payload.id}`)
        .then(
            data => dispatch({type: 'GET_ONE_ARTICLE_OK', payload: {response: data}}),
            err => dispatch({ type: 'GET_ONE_ARTICLE_ERROR', payload: {err} })
        )
    },
}

export default authMiddleware
