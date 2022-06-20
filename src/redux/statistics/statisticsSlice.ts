import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { getUsers } from "../../services/operations.service";
import IUser from "../../interfaces/IUser";
import { RootState } from "../store";

export type StatisticsState = {
    fromDate: string,
    toDate: string,
    userGroupIds: string[]
};

const initialFromDate = new Date();
initialFromDate.setDate(initialFromDate.getDate() - 365);
const initialState: StatisticsState = {fromDate: initialFromDate.toDateString(), toDate: new Date().toDateString(), userGroupIds: []};

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: initialState,
    reducers: {
        setDateRange: (state, action) => {
            return {...state, fromDate: action.payload[0], toDate: action.payload[1]}
        },
        setGroupIds: (state, action) => {
            return {...state, userGroupIds: action.payload}
        }
    }
})

export const { setDateRange, setGroupIds } = statisticsSlice.actions;

export const groupIdsRequest = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    const response = await getUsers();
    let userGroupIds: string[] = [];
    response.data.users.forEach((user: IUser) => {
        if (!userGroupIds.includes(user.groupId))
            userGroupIds.push(user.groupId);
    });
    dispatch(setGroupIds(userGroupIds));
}

export default statisticsSlice.reducer