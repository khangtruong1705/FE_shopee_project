import { configureStore } from '@reduxjs/toolkit';
import getAmountCart from './reducers/getAmountCart'



export const store = configureStore({
    reducer:{
        getAmountCart:getAmountCart
    }

})