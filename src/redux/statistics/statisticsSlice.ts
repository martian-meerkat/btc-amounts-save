import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const { setDateRange } = statisticsSlice.actions;

export default statisticsSlice.reducer