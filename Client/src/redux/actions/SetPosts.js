import {Set_Posts} from '../constants/Constants'

export const SetPosts = (param) =>
{
    return{
        type:Set_Posts,
        payload:param

    }
}