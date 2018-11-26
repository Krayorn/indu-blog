import { restPost } from '~/services/api.js'

const authMiddleware = {
    MDW_REGISTER: (payload, dispatch) => {
        restPost('/user')
        .then(
            data => dispatch({type: 'REGISTER_OK', payload: {response: data, ...payload}}),
            err => dispatch({ type: 'REGISTER_ERROR', payload: {err} })
        )
    },
}

export default authMiddleware
