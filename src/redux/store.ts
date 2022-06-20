import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import operationsReducer from './operations/operationsSlice'
import statisticsReducer from './statistics/statisticsSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        operations: operationsReducer,
        statistics: statisticsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store