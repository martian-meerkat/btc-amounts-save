import { createSlice } from "@reduxjs/toolkit";

export type StatisticsState = {
    loadingData: boolean,
    hasData: boolean,
    fromDate: string,
    toDate: string,
};

const initialFromDate = new Date();
initialFromDate.setDate(initialFromDate.getDate() - 365);
const initialState: StatisticsState = {loadingData: false, hasData: false, fromDate: initialFromDate.toDateString(), toDate: new Date().toDateString()};

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: initialState,
    reducers: {
        // status for fetching operations data
        loadingData: (state) => {
            return {...state, loadingData: true, hasData: false}
        },
        // data fetching is finished
        dataLoaded: (state) => {
            return {...state, loadingData: false, hasData: true}
        },
        setDateRange: (state, action) => {
            return {...state, fromDate: action.payload[0], toDate: action.payload[1]}
        }
    }
})

export const { loadingData, dataLoaded, setDateRange } = statisticsSlice.actions;

export default statisticsSlice.reducer