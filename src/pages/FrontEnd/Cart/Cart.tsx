import styles from './Cart.module.css'
function Cart() {
    return (
        <div className='flex justify-center my-[1.2rem]'>
            <div className='mx-[1.6rem]'>
                <h2 className={`${styles.h2Heading} mb-[1.4rem]`}>Bag</h2>
                <div className={`flex mb-[1.8rem]`}>
                    <div className='w-[200px]'>
                        <img
                            className='w-full object-cover'
                            src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f53c9996-2b71-4af5-9817-01c010dc79f6/air-force-1-07-lx-shoes-QKdcNj.png'
                            alt=''
                        />
                    </div>
                    <div className='mx-[1.4rem] flex w-full justify-between'>
                        <div>
                            <h3 className={`mb-[0.4rem] ${styles.h3Heading}`}>Nike Air Force 1 '07 LX</h3>
                            <p className='mb-[0.4rem]'>Men's Shoes</p>
                            <p className='mb-[0.4rem]'>White/Beach/White/Smoke Grey</p>
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
                                <p>1</p>
                            </div>
                        </div>
                        <div>
                            <p>$150</p>
                        </div>
                    </div>
                </div>
                <div className={`flex mb-[1.8rem]`}>
                    <div className='w-[200px]'>
                        <img
                            className='w-full object-cover'
                            src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/861b306f-bc46-402a-8b4a-0c1aaa97356c/blazer-low-77-jumbo-shoes-kl0MCq.png'
                            alt=''
                        />
                    </div>
                    <div className='mx-[1.4rem] flex w-full justify-between'>
                        <div>
                            <h3 className={`mb-[0.4rem] ${styles.h3Heading}`}>Nike Blazer Low '77 Jumbo</h3>
                            <p className='mb-[0.4rem]'>Men's Shoes</p>
                            <p className='mb-[0.4rem]'>White/Photon Dust/Light Smoke Grey/University Red</p>
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
                                <p>1</p>
                            </div>
                        </div>
                        <div>
                            <p>$150</p>
                        </div>
                    </div>
                </div>
                <div className={`flex mb-[1.8rem]`}>
                    <div className='w-[200px]'>
                        <img
                            className='w-full object-cover'
                            src='https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f9e940d3-2192-434e-a017-072303ce2f14/air-max-90-shoes-N7Tbw0.png'
                            alt=''
                        />
                    </div>
                    <div className='mx-[1.4rem] flex w-full justify-between'>
                        <div>
                            <h3 className={`mb-[0.4rem] ${styles.h3Heading}`}>Nike Air Max 90</h3>
                            <p className='mb-[0.4rem]'>Men's Shoes</p>
                            <p className='mb-[0.4rem]'>Photon Dust/Metallic Silver/Black/University Red</p>
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
                                <p>1</p>
                            </div>
                        </div>
                        <div>
                            <p>$150</p>
                        </div>
                    </div>
                </div>
                <div className={`flex mb-[1.8rem]`}>
                    <div className='w-[200px]'>
                        <img
                            className='w-full object-cover'
                            src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/eac5f1f7-36c3-4ce7-8bf2-57f44c2dd576/air-flight-lite-mid-shoes-wNrQDg.png'
                            alt=''
                        />
                    </div>
                    <div className='mx-[1.4rem] flex w-full justify-between'>
                        <div>
                            <h3 className={`mb-[0.4rem] ${styles.h3Heading}`}>Nike Air Flight Lite Mid</h3>
                            <p className='mb-[0.4rem]'>Men's Shoes</p>
                            <p className='mb-[0.4rem]'>Black/Varsity Red/White</p>
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
                                <p>1</p>
                            </div>
                        </div>
                        <div>
                            <p>$150</p>
                        </div>
                    </div>
                </div>
                <div className={`flex mb-[1.8rem]`}>
                    <div className='w-[200px]'>
                        <img
                            className='w-full object-cover'
                            src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0d265602-b5fa-46c1-8eb6-b3e56c7f52b9/air-jordan-1-mid-shoes-SQf7DM.png'
                            alt=''
                        />
                    </div>
                    <div className='mx-[1.4rem] flex w-full justify-between'>
                        <div>
                            <h3 className={`mb-[0.4rem] ${styles.h3Heading}`}>Air Jordan 1 Mid</h3>
                            <p className='mb-[0.4rem]'>Men's Shoes</p>
                            <p className='mb-[0.4rem]'>University Blue/White/Black</p>
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
                                <p>1</p>
                            </div>
                        </div>
                        <div>
                            <p>$150</p>
                        </div>
                    </div>
                </div>
                <div className={`flex mb-[1.8rem]`}>
                    <div className='w-[200px]'>
                        <img
                            className='w-full object-cover'
                            src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f21ce99a-a0f1-410f-a2ff-c93b27f457b2/react-phantom-run-flyknit-2-road-running-shoes-LcSGB7.png'
                            alt=''
                        />
                    </div>
                    <div className='mx-[1.4rem] flex w-full justify-between'>
                        <div>
                            <h3 className={`mb-[0.4rem] ${styles.h3Heading}`}>Nike React Phantom Run Flyknit 2</h3>
                            <p className='mb-[0.4rem]'>Men's Road Running Shoes</p>
                            <p className='mb-[0.4rem]'>Black/White</p>
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
                                <p>1</p>
                            </div>
                        </div>
                        <div>
                            <p>$150</p>
                        </div>
                    </div>
                </div>
                <div className={`flex mb-[1.8rem]`}>
                    <div className='w-[200px]'>
                        <img
                            className='w-full object-cover'
                            src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bdbfc393-1239-4fdc-a143-b0759c789c6a/jordan-stadium-90-shoes-Jn6ZH4.png'
                            alt=''
                        />
                    </div>
                    <div className='mx-[1.4rem] flex w-full justify-between'>
                        <div>
                            <h3 className={`mb-[0.4rem] ${styles.h3Heading}`}>Jordan Stadium 90</h3>
                            <p className='mb-[0.4rem]'>Men's Shoes</p>
                            <p className='mb-[0.4rem]'>Brown/Black/University Red/Sand Drift</p>
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
                                <p>1</p>
                            </div>
                        </div>
                        <div>
                            <p>$150</p>
                        </div>
                    </div>
                </div>
                <div className={`flex mb-[1.8rem]`}>
                    <div className='w-[200px]'>
                        <img
                            className='w-full object-cover'
                            src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f6bb75e3-f86b-4031-9265-4343b1e14bd7/jumpman-two-trey-shoes-rhmBzG.png'
                            alt=''
                        />
                    </div>
                    <div className='mx-[1.4rem] flex w-full justify-between'>
                        <div>
                            <h3 className={`mb-[0.4rem] ${styles.h3Heading}`}>Jumpman Two Trey</h3>
                            <p className='mb-[0.4rem]'>Men's Shoes</p>
                            <p className='mb-[0.4rem]'>Black/Dark Concord/White/True Red</p>
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
                                <p>1</p>
                            </div>
                        </div>
                        <div>
                            <p>$150</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[26rem]'>
                <h2 className={`${styles.h2Heading} mb-[1.4rem]`}>Summary</h2>
                <div className='flex mb-[1.2rem] justify-between'>
                    <p>SubTotal</p>
                    <p>$500</p>
                </div>
                <div className='flex mb-[1.2rem] justify-between'>
                    <p>Estimated Delivery & Handling</p>
                    <p>Free</p>
                </div>
                <div className='flex mb-[1.2rem] justify-between'>
                    <p>Total</p>
                    <p>$500</p>
                </div>
                <div className='flex items-center justify-center w-full text-center h-[2.8rem] bg-black text-white rounded-[2rem] cursor-pointer'>
                    Checkout
                </div>
            </div>
        </div>
    )
}

export default Cart
