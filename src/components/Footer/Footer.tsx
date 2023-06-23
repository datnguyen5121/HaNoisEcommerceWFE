import { faCopyright, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
    const findAStore = ['BECOME A MEMBER', 'Send us Feedback']
    const getHelp = ['Order Status', 'Delivery', 'Returns', 'Payment Options', 'Contact Us']
    const aboutNike = ['News', 'Careers', 'Investors', 'Sustainability']
    const policy = ['Guides', 'Terms of Sale', 'Terms of Use', 'Nike Privacy Policy']
    return (
        <div className='bg-black '>
            <div className=' w-11/12 mx-auto'>
                <div className='flex  justify-between py-10'>
                    <div className='grid grid-cols-3 gap-20 text-sm'>
                        <div className='font-medium text-white'>
                            <p>FIND A STORE</p>
                            <ul>
                                {findAStore.map((item) => (
                                    <li key={item} className='hover:text-white cursor-pointer py-2'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='text-gray-500 '>
                            <p className='font-medium text-white'>GET HELP</p>
                            <ul>
                                {getHelp.map((item) => (
                                    <li key={item} className='hover:text-white cursor-pointer py-2'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='text-gray-500 '>
                            <p className='font-medium text-white'>ABOUT NIKE</p>
                            <ul>
                                {aboutNike.map((item) => (
                                    <li key={item} className='hover:text-white cursor-pointer py-2'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='flex text-white gap-3'>
                        <i className='fa-brands fa-twitter w-7 h-7 text-center text-lg leading-7 rounded-full bg-gray-600 text-black'></i>
                        <i className='fa-brands fa-facebook-f  w-7 h-7 text-center text-lg leading-7 rounded-full bg-gray-600 text-black'></i>
                        <i className='fa-brands fa-youtube  w-7 h-7 text-center text-lg leading-7 rounded-full bg-gray-600 text-black'></i>
                        <i className='fa-brands fa-instagram  w-7 h-7 text-center text-lg leading-7 rounded-full bg-gray-600 text-black'></i>
                    </div>
                </div>
                <div className='text-sm text-gray-500 flex justify-between'>
                    <div className='text-white'>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span className='px-5'>Vietnam</span>
                        <span className='text-gray-500'>
                            <FontAwesomeIcon icon={faCopyright} /> 2023 Nike, Inc. All Rights Reserved
                        </span>
                    </div>

                    <ul className='flex gap-7 pb-5'>
                        {policy.map((item) => (
                            <li key={item} className='hover:text-white cursor-pointer py-2'>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
