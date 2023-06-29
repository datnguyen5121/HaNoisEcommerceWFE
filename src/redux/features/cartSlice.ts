import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { cartItem } from '../../type/cartItem'
interface CartState {
    items: cartItem[]
}
const initialState: CartState = {
    items: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<cartItem>) => {
            const existingItem = state.items.findIndex((item) => item._id === action.payload._id)
            if (existingItem !== -1) {
                state.items[existingItem].quantity += 1
                toast('Product added to cart')
            } else {
                state.items.push(action.payload)
                toast('Product added to cart')
            }
        },
        removeTocart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload)
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const newStateItem = state.items[action.payload]
            newStateItem.quantity += 1
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const newStateItem = state.items[action.payload]
            if (newStateItem.quantity <= 1) {
                state.items = state.items.filter((_, index) => index !== action.payload)
            } else {
                newStateItem.quantity -= 1
            }
        },
        setQuantity: (state, action: PayloadAction<{ index: number; value: number }>) => {
            const { index, value } = action.payload
            // Update the quantity of the item at the specified index with the new value
            state.items[index].quantity = value
        },
        notifyCheckoutSuccess: (state) => {
            toast('Checkout Success')
            state.items = []
        }
    }
})
export const { addToCart, removeTocart, increaseQuantity, decreaseQuantity, setQuantity, notifyCheckoutSuccess } =
    cartSlice.actions
export default cartSlice.reducer
