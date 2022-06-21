import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice';
import operationsReducer from './operations/operationsSlice'
import statisticsReducer from './statistics/statisticsSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'

const persistUserConfig = {
    key: 'user-data-store',
    storage: storageSession
}

const persistOperationsConfig = {
    key: 'operations-data-store',
    storage: storageSession
}

const persistedUserReducer = persistReducer(persistUserConfig, userReducer)
const persistedOperationsReducer = persistReducer(persistOperationsConfig, operationsReducer)

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        operations: persistedOperationsReducer,
        statistics: statisticsReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }) 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default (() => {
    if (module.hot) {
        module.hot.accept(
            './operations/operationsSlice', 
            () => {
                const nextRootReducer = require('./operations/operationsSlice').default
                store.replaceReducer(
                    persistReducer(persistOperationsConfig, nextRootReducer)
                )
            }
        );
        module.hot.accept(
            './user/userSlice', 
            () => {
                const nextRootReducer = require('./user/userSlice').default
                store.replaceReducer(
                    persistReducer(persistUserConfig, nextRootReducer)
                )
            }
        )
    }
    let persistor = persistStore(store);
    return { store, persistor }
})()