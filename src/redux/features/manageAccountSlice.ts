import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Account } from '../../type/Account'
interface AccountSliceState {
    accounts: Account[]
    loading: boolean
    selectedIndex: number
}

const initialState: AccountSliceState = {
    accounts: [],
    loading: false,
    selectedIndex: 0
}

const manageAccountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setSelectedIndex: (state, action: PayloadAction<number>) => {
            state.selectedIndex = action.payload
        },
        removeToManageAccount: (state, action: PayloadAction<string>) => {
            state.accounts = state.accounts.filter((account) => account._id !== action.payload)
        }
        // editToManageProduct: (state, action: PayloadAction<string>) => {}
    },
    extraReducers: (builder) => {
        builder.addCase(getAccounts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAccounts.fulfilled, (state, action) => {
            state.accounts = action.payload
            state.loading = false
        })
        builder.addCase(getAccounts.rejected, (state) => {
            state.loading = false
        })
    }
})

export const getAccounts = createAsyncThunk<Account[], void>('account/getAccounts', async () => {
    const response = await axios.get('http://localhost:8080/api/get-all-user')
    console.log(response.data.data)
    return response.data.data
})
export const { setSelectedIndex, removeToManageAccount } = manageAccountSlice.actions
export default manageAccountSlice.reducer
