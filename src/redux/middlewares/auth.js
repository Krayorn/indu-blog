import { restPost, restGet, restDelete, restPatch } from '../../services/api.js'

const authMiddleware = {
    MDW_REGISTER: (payload, dispatch) => {
        restPost('/user', payload)
        .then(
            data => dispatch({type: 'REGISTER_OK', payload: {response: data}}),
            err => dispatch({ type: 'REGISTER_ERROR', payload: {...err} })
        )
    },
    MDW_LOGIN: (payload, dispatch) => {
        restPost('/auth', payload)
        .then(
            data => dispatch({type: 'LOGIN_OK', payload: {response: data}}),
            err => dispatch({ type: 'LOGIN_ERROR', payload: {response: err} })
        )
    },
    MDW_GET_ALL_USERS: (payload, dispatch) => {
        restGet('/user', {"x-access-token": payload.token })
        .then(
            data => dispatch({type: 'GET_ALL_USERS_OK', payload: {response: data}}),
            err => dispatch({ type: 'GET_ALL_USERS_ERROR', payload: {err} })
        )
    },
    MDW_DELETE_USER: (payload, dispatch) => {
        restDelete(`/user/${payload.id}`, {"x-access-token": payload.token })
        .then(
            data => dispatch({type: 'DELETE_USER_OK', payload: {response: data}}),
            err => dispatch({ type: 'DELETE_USER_ERROR', payload: {err} })
        )
    },
    MDW_UPDATE_ROLE: (payload, dispatch) => {
        restPatch(`/user/${payload.id}`, {role: payload.role}, {"x-access-token": payload.token })
        .then(
            data => dispatch({type: 'UPDATE_ROLE_OK', payload: {response: data}}),
            err => dispatch({ type: 'UPDATE_ROLE_ERROR', payload: {err} })
        )
    },

}

export default authMiddleware
