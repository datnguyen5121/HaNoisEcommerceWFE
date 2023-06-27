import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logoutStart, logoutFailed, logoutSuccess } from './authSlice'
import { NavigateFunction } from 'react-router-dom'
import { AnyAction, Dispatch } from 'redux'

export const loginUser = async (
    user: { email: string; password: string },
    dispatch: Dispatch<AnyAction>,
    navigate: NavigateFunction,
    setError: (error: boolean) => void
) => {
    dispatch(loginStart())
    try {
        const res = await axios.post('/handle-login', user)
        dispatch(loginSuccess(res.data))
        navigate('/')
    } catch (err) {
        dispatch(loginFailed())
        setError(true)
    }
}

export const logoutUser = async (dispatch: Dispatch<AnyAction>) => {
    dispatch(logoutStart())
    try {
        await dispatch(logoutSuccess())
    } catch (err) {
        dispatch(logoutFailed())
    }
}

export const registerUser = async (
    user: {
        firstName: string
        lastName: string
        email: string
        password: string
        address: string
        gender: string
        phone: string
    },
    navigate: NavigateFunction
) => {
    try {
        await axios.post('/handle-register', user)
        navigate('/login')
    } catch (err) {
        alert(err)
    }
}
