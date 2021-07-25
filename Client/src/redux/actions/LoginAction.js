import {Update_LoginData} from '../constants/Constants'

export const LoginAction = (param) =>
{
    return{
        type:Update_LoginData,
        payload:param

    }
}