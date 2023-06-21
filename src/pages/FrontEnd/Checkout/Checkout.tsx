import { faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PayPal from './PayPal'
function Checkout() {
    let [payment, setPayment] = useState('')
    let handleChangePayment = (e: any) => {
        setPayment(e.target.value)
    }
    return (
        <>
            <section className=''>
                <section className='py-[60px] product-container flex-row flex justify-center gap-[100px] mx-[100px]'>
                    <section className='sticky top-0  max-h-auto grid w-[60%] gap-[10px] flex p-[20px] rounded-lg border-gray-900 border-[1px]'>
                        <h2 className='text-4xl font-semibold text-center'>Customer Info</h2>
                        <section className='checkout-info grid w-[100%] gap-[15px]'>
                            <section className='city-checkout grid grid-cols-1'>
                                <span className='text-2xl font-medium mb-[10px]'>Full Name</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px] text-xl rounded-md p-[15px]'
                                    placeholder='Nguyễn Đăng Thành Đạt'
                                ></input>
                            </section>

                            <section className='city-checkout grid grid-cols-1'>
                                <span className='text-2xl font-medium mb-[10px]'>City</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px] text-xl rounded-md p-[15px]'
                                    placeholder='Hà Nội'
                                ></input>
                            </section>

                            <section className='province-checkout grid grid-cols-1'>
                                <span className='text-2xl font-medium mb-[10px]'>Province</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px] text-xl rounded-md p-[15px]'
                                    placeholder='Đông Anh'
                                ></input>
                            </section>

                            <section className='address-checkout grid grid-cols-1'>
                                <span className='text-2xl font-medium mb-[10px]'>Address Detail</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px] text-xl rounded-md p-[15px]'
                                    placeholder='Đông Anh Hà Nội'
                                ></input>
                            </section>
                            <section className='number-checkout grid grid-cols-1'>
                                <span className='text-2xl font-medium mb-[10px]'>Phone number</span>
                                <input
                                    type='text'
                                    className='  border-gray-500 border-[1px] text-xl rounded-md p-[15px]'
                                    placeholder='0213081283'
                                ></input>
                            </section>
                            <section className=''>
                                <select
                                    className='px-[50px] py-[20px] outline-gray-500 border-black border-[1px] rounded-md'
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
                                    <PayPal />
                                </section>
                            )}

                            <section className='grid-cols-12 text-right'>
                                <button className='bg-black text-white hover:opacity-70 px-[40px] py-[20px] rounded-md text-xl'>
                                    Purchase
                                </button>
                            </section>
                        </section>
                    </section>

                    <div className='product-info w-[40%] border-[1px] rounded-lg border-black'></div>
                </section>
            </section>
        </>
    )
}

export default Checkout
