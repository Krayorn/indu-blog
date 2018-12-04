import { restPost, restGet, restDelete, restPut } from '../../services/api.js'

const articleMiddleware = {
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
    MDW_DELETE_ARTICLE: (payload, dispatch) => {
        restDelete(`/article/${payload.id}`, { "x-access-token": payload.token })
        .then(
            data => dispatch({type: 'DELETE_ARTICLE_OK', payload: {response: data}}),
            err => dispatch({ type: 'DELETE_ARTICLE_ERROR', payload: {err} })
        )
    },
    MDW_EDIT_ARTICLE: (payload, dispatch) => {
        restPut(`/article/${payload.id}`, payload, { "x-access-token": payload.token })
        .then(
            data => dispatch({type: 'EDIT_ARTICLE_OK', payload: {response: data}}),
            err => dispatch({ type: 'EDIT_ARTICLE_ERROR', payload: {err} })
        )
    },
}

export default articleMiddleware
