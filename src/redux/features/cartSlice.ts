import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import products from '../../pages/FrontEnd/Cart/products.json'
import { cartItem } from '../../type/cartItem'
interface CartState {
    items: cartItem[]
}
const initialState: CartState = {
    items: products
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeTocart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.productId !== action.payload)
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
        notifyCheckoutSuccess: (state) => {
            toast('Checkout Success')
            state.items = []
        }
    }
})
export const { removeTocart, increaseQuantity, decreaseQuantity, notifyCheckoutSuccess } = cartSlice.actions
export default cartSlice.reducer
