import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import operationsReducer from './operations/operationsSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        operations: operationsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store