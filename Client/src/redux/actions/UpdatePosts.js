import {Update_Posts} from '../constants/Constants'

export const UpdatePosts = (param) =>
{
    return{
        type:Update_Posts,
        payload:param

    }
}