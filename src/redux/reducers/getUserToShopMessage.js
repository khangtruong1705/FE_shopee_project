import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    userToShopMessage:[]
}



const getUserToShopMessage = createSlice({
  name: "getUserToShopMessage",
  initialState,
  reducers: {
    appendUserToShopMessageAction: (state, action) => {
      state.userToShopMessage.push(action.payload);
    },
  },
});

export  const { appendUserToShopMessageAction } = getUserToShopMessage.actions;
export default getUserToShopMessage.reducer