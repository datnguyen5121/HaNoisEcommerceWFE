import { Product } from './../../type/Product'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
interface ProductSliceState {
    products: Product[]
    loading: boolean
    selectedIndex: number
}

const initialState: ProductSliceState = {
    products: [],
    loading: false,
    selectedIndex: 0
}

const manageProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedIndex: (state, action: PayloadAction<number>) => {
            state.selectedIndex = action.payload
        },
        removeToManageProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((product) => product._id !== action.payload)
        }
        // editToManageProduct: (state, action: PayloadAction<string>) => {}
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.loading = false
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.loading = false
        })
    }
})

export const getProducts = createAsyncThunk<Product[], void>('product/getProducts', async () => {
    const response = await axios.get('http://localhost:8080/api/get-all-product')
    console.log(response.data.data)
    return response.data.data
})
export const { setSelectedIndex, removeToManageProduct } = manageProductSlice.actions
export default manageProductSlice.reducer
