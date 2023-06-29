import { faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import ProductItem from '../../../components/ProductItem'
function Checkout() {
    const [payment, setPayment] = useState('')
    const handleChangePayment = (e: any) => {
        setPayment(e.target.value)
    }
    return (
        <>
            <section className='w-9/12 mx-auto'>
                <section className='py-[60px] product-container flex-col flex md:flex-row justify-center gap-10 '>
                    <section className='sticky top-0  max-h-auto grid md:w-[50%]  gap-[10px]  p-[20px] rounded-lg shadow-md'>
                        <h2 className='text-2xl text-center'>Customer Info</h2>
                        <section className='checkout-info grid w-[100%] gap-[15px]'>
                            <section className='city-checkout grid grid-cols-1 text-lg'>
                                <span className='text-md  mb-[10px]'>Full Name</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px]  rounded-md px-3 py-2'
                                    placeholder='Nguyễn Đăng Thành Đạt'
                                ></input>
                            </section>

                            <section className='city-checkout grid grid-cols-1 text-lg'>
                                <span className='text-md  mb-[10px]'>City</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px]  rounded-md px-3 py-2'
                                    placeholder='Hà Nội'
                                ></input>
                            </section>

                            <section className='province-checkout grid grid-cols-1 text-lg'>
                                <span className='text-md  mb-[10px]'>Province</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px]  rounded-md px-3 py-2'
                                    placeholder='Đông Anh'
                                ></input>
                            </section>

                            <section className='address-checkout grid grid-cols-1 text-lg'>
                                <span className='text-md  mb-[10px]'>Address Detail</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px]  rounded-md px-3 py-2'
                                    placeholder='Đông Anh Hà Nội'
                                ></input>
                            </section>
                            <section className='number-checkout grid grid-cols-1 text-lg'>
                                <span className='text-md  mb-[10px]'>Phone number</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px]  rounded-md px-3 py-2'
                                    placeholder='0213081283'
                                ></input>
                            </section>
                            <section className='w-full'>
                                <select
                                    className='px-3 py-2 w-full outline-gray-500 border-black border-[1px] rounded-md'
                                    onChange={handleChangePayment}
                                >
                                    <option className=' w-[20px] h-[50px] text-lg border-black ' value=''>
                                        Payment
                                    </option>
                                    <option className=' w-[20px] h-[50px] text-lg border-black ' value='PayInCash'>
                                        Pay in cash
                                    </option>
                                    <option className=' w-[20px] h-[50px] text-lg border-black ' value='CreditCard'>
                                        Credit card
                                    </option>
                                </select>
                            </section>
                            {payment == 'PayInCash' && <div></div>}
                            {payment == 'CreditCard' && (
                                <section className='max-w-xl'>
                                    <div>Paypal</div>
                                </section>
                            )}

                            <section className='grid-cols-12'>
                                <button className='bg-black text-white hover:opacity-70 px-3 py-2 rounded-md '>
                                    Purchase
                                </button>
                            </section>
                        </section>
                    </section>

                    <div className='product-info  md:w-[50%] border-[1px] rounded-lg shadow-md  p-[20px] '>
                        <div className='order-summary'>
                            <p className='text-2xl'>Order summary</p>
                            <div className='sub-total flex justify-between my-3 text-lg text-gray-500'>
                                <p>Subtotal</p>
                                <span>
                                    63,300,000 <sup>đ</sup>
                                </span>
                            </div>
                            <div className='delivery flex justify-between my-3 text-lg text-gray-500'>
                                <p>Delivery/Shipping</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className='total flex justify-between text-lg my-3'>
                                <p>Total</p>
                                <span>
                                    63,300,000 <sup>đ</sup>
                                </span>
                            </div>
                            <hr />
                            <div className='product-list pt-3'>
                                {/* <ProductItem isCheckout />
                                <ProductItem isCheckout />
                                <ProductItem isCheckout />
                                <ProductItem isCheckout /> */}
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Checkout
