import { configureStore } from '@reduxjs/toolkit';
// import getAmountCart from './reducers/getAmountCart';
import getAmountCart from './reducers/getAmountCart';
import getAvatarUrl from './reducers/getAvatarUrl';



export const store = configureStore({

    reducer:{
        getAmountCart:getAmountCart,
        getAvatarUrl:getAvatarUrl
    }

})