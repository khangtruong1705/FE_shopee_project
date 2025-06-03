import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {DOMAIN} from '../../util/config'


const initialState = {
    amountCart:0
}
  


const getAmountCart = createSlice({
    name: 'getAmountCart',
    initialState,
    reducers: {
        getAmountCartAction: (state,action) => {
          state.amountCart = action.payload;
      },
    }
  });

export const {getAmountCartAction} = getAmountCart.actions
export default getAmountCart.reducer
export const getAmountCartApi = async (user_id) => {
    return async (dispatch) => {
        let res = await axios.get(`${DOMAIN}/api/carts/get-amount-item-of-cart-by-user-id/${user_id}`);
        if (res) {
            const action = getAmountCartAction(res.data);
            dispatch(action);
        }else{
            alert('Get comment fail!!')
        }


    }
}