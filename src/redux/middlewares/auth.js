import { restPost } from '../../services/api.js'

const authMiddleware = {
    MDW_REGISTER: (payload, dispatch) => {
        restPost('/user', payload)
        .then(
            data => dispatch({type: 'REGISTER_OK', payload: {response: data, ...payload}}),
            err => dispatch({ type: 'REGISTER_ERROR', payload: {err} })
            )
        },
        MDW_LOGIN: (payload, dispatch) => {
            restPost('/auth', payload)
            .then(
                data => dispatch({type: 'LOGIN_OK', payload: {response: data, ...payload}}),
                err => dispatch({ type: 'LOGIN_ERROR', payload: {err} })
            )
    }
}

export default authMiddleware
