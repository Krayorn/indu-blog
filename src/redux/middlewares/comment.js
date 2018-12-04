import { restPost, restDelete } from '../../services/api.js'

const commentMiddleware = {
    MDW_WRITE_COMMENT: (payload, dispatch) => {
        restPost(`/article/${payload.id}`, payload, { "x-access-token": payload.token })
        .then(
            data => dispatch({type: 'WRITE_COMMENT_OK', payload: {response: data}}),
            err => dispatch({ type: 'WRITE_COMMENT_ERROR', payload: {err} })
        )
    },
    MDW_DELETE_COMMENT: (payload, dispatch) => {
        restDelete(`/comment/${payload.id}`, { "x-access-token": payload.token })
        .then(
            data => dispatch({type: 'DELETE_COMMENT_OK', payload: {response: data}}),
            err => dispatch({ type: 'DELETE_COMMENT_ERROR', payload: {err} })
        )
    },
}

export default commentMiddleware
