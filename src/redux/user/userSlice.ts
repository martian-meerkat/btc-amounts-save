import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IUser from '../../interfaces/IUser';
import { RootState } from '../store';

export type UserState = {
    userData: IUser,
    token: string
};

const initialState: UserState = {userData: null, token: null};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setuser: (_state, action: PayloadAction<UserState>) => {
            return action.payload;
        }
    }
})

export const { setuser } = userSlice.actions

export const selectUserData = (state: RootState) => state.user.userData

export default userSlice.reducer