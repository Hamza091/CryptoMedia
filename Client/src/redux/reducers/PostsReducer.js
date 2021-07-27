
import { Update_Posts } from "../constants/Constants";
import {Set_Posts} from "../constants/Constants"

const initialState = []

export const PostsReducer = (state = initialState , action) =>
{
    switch(action.type)
    {
        case Set_Posts:
            return state=action.payload
        case Update_Posts:
            return [action.payload,...state]
        default:
            return state
    }
}

