
import { Update_Ranking } from "../constants/Constants";

const initialState = []

export const UpdateRankingReducer = (state = initialState , action) =>
{
    switch(action.type)
    {
        case Update_Ranking:
            return state=action.payload
        default:
            return state
    }
}

