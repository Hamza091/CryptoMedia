import {Update_Quantity} from '../constants/Constants'

export const UpdateQuantity = (param) =>
{
    return{
        type:Update_Quantity,
        payload:param

    }
}