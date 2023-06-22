import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import manageProductReducer from './features/manageProductSlice'
import manageAccountReducer from './features/manageAccountSlice'

const store = configureStore({
    reducer: {
        manageProduct: manageProductReducer,
        manageAccount: manageAccountReducer
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
