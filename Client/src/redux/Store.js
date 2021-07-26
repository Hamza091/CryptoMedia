import {createStore,combineReducers} from 'redux'
import {LoginReducer} from './reducers/LoginReducer'
import {UpdateRankingReducer} from './reducers/UpdateRankingReducer'
import {PostsReducer} from './reducers/PostsReducer'

const rootReducer = combineReducers(
    {
        LoginReducer,
        UpdateRankingReducer,
        PostsReducer
    }
)

export const store = createStore(rootReducer)