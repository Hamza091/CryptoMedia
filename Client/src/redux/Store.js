import {createStore,combineReducers} from 'redux'
import {LoginReducer} from './reducers/LoginReducer'
import {UpdateRankingReducer} from './reducers/UpdateRankingReducer'

const rootReducer = combineReducers(
    {
        LoginReducer,
        UpdateRankingReducer
        // all the reducers will be written here
    }
)

export const store = createStore(rootReducer)