import {Update_Ranking} from '../constants/Constants'

export const UpdateRanking = (param) =>
{
    return{
        type:Update_Ranking,
        payload:param

    }
}