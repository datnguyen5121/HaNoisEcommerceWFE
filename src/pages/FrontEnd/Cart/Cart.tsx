import styles from './Cart.module.css'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../redux/store'
import {
    removeTocart,
    increaseQuantity,
    decreaseQuantity,
    notifyCheckoutSuccess
} from '../../../redux/features/cartSlice'
function Cart() {
    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useAppDispatch()
    let totalPrice = 0
    cart.items.length > 0
        ? (totalPrice = cart.items.reduce((total, item) => {
              return total + item.price * item.quantity
          }, 0))
        : 0
    return (
        <div className='flex justify-center my-[1.2rem]'>
            <div className='mx-[1.6rem]'>
                <h2 className={`${styles.h2Heading} mb-[1.4rem]`}>Bag</h2>
                {cart.items.map((item, index) => (
                    <div className={`flex mb-[1.8rem]`} key={index}>
                        <div className='w-[200px]'>
                            <img className='w-full object-cover' src={item.imageUrl} alt='' />
                        </div>
                        <div className='mx-[1.4rem] flex w-full justify-between'>
                            <div>
                                <h3 className={`mb-[0.4rem] ${styles.h3Heading}`}>{item.title}</h3>
                                <p className='mb-[0.4rem]'>{item.category}</p>
                                <p className='mb-[0.4rem]'>{item.color}</p>
                                <div className='flex'>
                                    <label htmlFor='' className='me-[5px]'>
                                        Size
                                    </label>
                                    <select className='px-[1rem]' name='size' id=''>
                                        <option value='37'>37</option>
                                        <option value='37.5'>37.5</option>
                                        <option value='38'>38</option>
                                        <option value='38.5'>38.5</option>
                                        <option value='39'>39</option>
                                        <option value='39.5'>39.5</option>
                                        <option value='40'>40</option>
                                        <option value='40.5'>40.5</option>
                                        <option value='41'>41</option>
                                        <option value='41.5'>41.5</option>
                                        <option value='42'>42</option>
                                        <option value='42.5'>42.5</option>
                                        <option value='43'>43</option>
                                        <option value='43.5s'>43.5</option>
                                    </select>
                                    <label htmlFor='quantity' className='px-[1rem]'>
                                        Quantity
                                    </label>
                                    <p>{item.quantity}</p>
                                </div>
                            </div>
                            <div>
                                <p>${item.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-[26rem]'>
                <h2 className={`${styles.h2Heading} mb-[1.4rem]`}>Summary</h2>
                <div className='flex mb-[1.2rem] justify-between'>
                    <p>SubTotal</p>
                    <p>${totalPrice}</p>
                </div>
                <div className='flex mb-[1.2rem] justify-between'>
                    <p>Estimated Delivery & Handling</p>
                    <p>Free</p>
                </div>
                <div className='flex mb-[1.2rem] justify-between'>
                    <p>Total</p>
                    <p>${totalPrice}</p>
                </div>
                <div className='flex items-center justify-center w-full text-center h-[2.8rem] bg-black text-white rounded-[2rem] cursor-pointer hover:bg-gray-600'>
                    Checkout
                </div>
            </div>
        </div>
    )
}

export default Cart
