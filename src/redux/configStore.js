import { configureStore } from '@reduxjs/toolkit';
import getAmountCart from './reducers/getAmountCart';
import getAvatarUrl from './reducers/getAvatarUrl';
import getUserToShopMessage from './reducers/getUserToShopMessage'


export const store = configureStore({

    reducer:{
        getAmountCart:getAmountCart,
        getAvatarUrl:getAvatarUrl,
        getUserToShopMessage:getUserToShopMessage,
    }

})