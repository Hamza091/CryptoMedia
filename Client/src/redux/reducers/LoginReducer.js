
import { Update_LoginData } from "../constants/Constants";
import { Update_Quantity } from "../constants/Constants";
import { Update_Amount } from "../constants/Constants";

const initialState = []

export const LoginReducer = (state = initialState , action) =>
{
    switch(action.type)
    {
        case Update_LoginData:
            return state=action.payload
        case Update_Quantity:
            return update(state,action.payload)
        case Update_Amount:
            return updateamount(state,action.payload)
        default:
            return state
    }
}

const updateamount = (state, data)=>{
    const newstate=state
    newstate.data.amount=data.newAmount
    return newstate
}

const update = (state,data)=>{
    const coin = state.data.coins
    for(let i=0; i<coin.length; i++)
    {
        if(coin[i].name===data.coin)
        {
            coin[i].quantity=data.coinNumbers
        }   
    }
    state.data.coins=coin
    return state
}