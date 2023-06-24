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
            {cart.items.length > 0 ? (
                <>
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
                                            <div className='bg-gray-200 rounded-[6px] flex items-center'>
                                                <button
                                                    className={`cursor-pointer text-[16px] text-orange-500 px-[1rem] flex items-center`}
                                                    onClick={() => dispatch(decreaseQuantity(index))}
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        height='1em'
                                                        fill='currentColor'
                                                        fontSize='currentFontsize'
                                                        viewBox='0 0 448 512'
                                                    >
                                                        <path d='M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z' />
                                                    </svg>
                                                </button>
                                                <p> {item.quantity}</p>
                                                <button
                                                    className={`cursor-pointer text-[16px] text-orange-500 px-[1rem] flex items-center`}
                                                    onClick={() => dispatch(increaseQuantity(index))}
                                                >
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        height='1em'
                                                        fill='currentColor'
                                                        fontSize='currentFontsize'
                                                        viewBox='0 0 448 512'
                                                    >
                                                        <path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='mt-[0.6rem]'>
                                            <button
                                                className={`text-red-500`}
                                                onClick={() => dispatch(removeTocart(item.productId))}
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    height='1em'
                                                    viewBox='0 0 448 512'
                                                    fill='currentColor'
                                                >
                                                    <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
                                                </svg>
                                            </button>
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
                        <div
                            onClick={() => dispatch(notifyCheckoutSuccess())}
                            className='flex items-center justify-center w-full text-center h-[2.8rem] bg-black text-white rounded-[2rem] cursor-pointer hover:bg-gray-600'
                        >
                            Checkout
                        </div>
                    </div>
                </>
            ) : (
                <div className='h-[16rem]'>Your Cart is empty</div>
            )}
        </div>
    )
}

export default Cart
