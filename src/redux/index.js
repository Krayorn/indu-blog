import { combineReducers, applyMiddleware } from 'redux'

//middlewares
import authMiddleware from './middlewares/auth'

//reducers
import authReducer from './reducers/auth'

const customMiddlewares = {
    ...authMiddleware
}

export const reducers = combineReducers({
    auth: authReducer
})

const customMiddleWare = store => next => action => {

    next(action)

    if (customMiddlewares[action.type]) {
        customMiddlewares[action.type](action.payload, next)
    }
}

export const middlewares = applyMiddleware(customMiddleWare)
