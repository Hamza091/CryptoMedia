import {Update_Amount} from '../constants/Constants'

export const UpdateAmount = (param) =>
{
    console.log(param)
    return{
        type:Update_Amount,
        payload:param

    }
}