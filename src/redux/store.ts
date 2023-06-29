import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import cartSlice from './features/cartSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { useDispatch } from 'react-redux'
import manageProductSlice from './features/manageProductSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({
    auth: authSlice,
    cart: cartSlice,
    products: manageProductSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

//Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: () => AppDispatch = useDispatch
export const persistor = persistStore(store)
