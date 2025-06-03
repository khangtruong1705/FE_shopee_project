import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {DOMAIN} from '../../util/config'


const initialState = {
    avatarUrl:''
}
  


const getAvatarUrl = createSlice({
    name: 'getAvatarUrl',
    initialState,
    reducers: {
        getAvatarUrlAction: (state,action) => {
          state.avatarUrl = action.payload;
      },
    }
  });

export const {getAvatarUrlAction} = getAvatarUrl.actions
export default getAvatarUrl.reducer
export const getAvatarUrlApi = async (user_id) => {
    return async (dispatch) => {
        let res = await axios.get(`${DOMAIN}/api/users/get-user-by-user-id/${user_id}`);
        if (res) {
            const action = getAvatarUrlAction(res.data.avatar_url);
            dispatch(action);
        }else{
            alert('Get comment fail!!')
        }
    }
}
