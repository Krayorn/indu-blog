import { restPost } from '../../services/api.js'

const authMiddleware = {
    MDW_WRITE_COMMENT: (payload, dispatch) => {
        restPost(`/article/${payload.id}`, payload, { "x-access-token": payload.token })
        .then(
            data => dispatch({type: 'WRITE_COMMENT_OK', payload: {response: data}}),
            err => dispatch({ type: 'WRITE_COMMENT_ERROR', payload: {err} })
        )
    },
}

export default authMiddleware
