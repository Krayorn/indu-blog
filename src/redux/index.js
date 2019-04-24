import { combineReducers, applyMiddleware } from 'redux'

//middlewares
import authMiddleware from './middlewares/auth'
import articleMiddleware from './middlewares/article'
import commentMiddleware from './middlewares/comment'

//reducers
import authReducer from './reducers/auth'
import articleReducer from './reducers/article'
import notificationReducer from './reducers/notification'

const customMiddlewares = {
    ...authMiddleware,
    ...articleMiddleware,
    ...commentMiddleware,
}

export const reducers = combineReducers({
    auth: authReducer,
    article: articleReducer,
    notification: notificationReducer,
})

const customMiddleWare = store => next => action => {

    next(action)

    if (customMiddlewares[action.type]) {
        customMiddlewares[action.type](action.payload, next)
    }
}

export const middlewares = applyMiddleware(customMiddleWare)
