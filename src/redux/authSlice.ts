import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: { currentUser: null, isFetching: false, error: false },
        logout: { isProcessing: false, error: false }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload.DT
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },

        logoutStart: (state) => {
            state.logout.isProcessing = true
        },
        logoutSuccess: (state) => {
            state.logout.isProcessing = false
            state.login.currentUser = null
            state.logout.error = false
        },
        logoutFailed: (state) => {
            state.logout.isProcessing = false
            state.logout.error = true
        },
        updateUser: (state, action) => {
            state.login.currentUser = action.payload
        }
    }
})

export const { loginStart, loginFailed, updateUser, loginSuccess, logoutStart, logoutFailed, logoutSuccess } =
    authSlice.actions

export default authSlice.reducer
