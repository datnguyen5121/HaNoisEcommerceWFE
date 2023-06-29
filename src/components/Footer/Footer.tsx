import { faCopyright, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
    const findAStore = ['BECOME A MEMBER', 'Send us Feedback']
    const getHelp = ['Order Status', 'Delivery', 'Returns', 'Payment Options', 'Contact Us']
    const aboutNike = ['News', 'Careers', 'Investors', 'Sustainability']
    const policy = ['Guides', 'Terms of Sale', 'Terms of Use', 'HANOIS Privacy Policy']
    return (
        <div className='bg-black '>
            <div className=' w-11/12 mx-auto'>
                <div className='flex  md:justify-between md:flex-row flex-col gap-5 lg:gap-20 py-10'>
                    <div className='grid md:grid-cols-3 md:gap-20 xl:grid-cols-3 xl:gap-20 gap-4 text-sm'>
                        <div className='font-medium md:border-none md:pt-0 border-gray-700 text-white border-b-[1px] pb-3'>
                            <p>FIND A STORE</p>
                            <ul>
                                {findAStore.map((item) => (
                                    <li key={item} className='hover:text-white cursor-pointer py-2'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='text-gray-500 md:border-none md:pt-0 border-b-[1px] pb-3  border-gray-700'>
                            <p className='font-medium   text-white'>GET HELP</p>
                            <ul>
                                {getHelp.map((item) => (
                                    <li key={item} className='hover:text-white cursor-pointer py-2'>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='text-gray-500 md:border-none md:pt-0 border-b-[1px] pb-3  border-gray-700'>
                            <p className='font-medium   text-white'>ABOUT HANOIS</p>
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
                <div className='text-sm text-gray-500 flex flex-col gap-10 md:flex-row md:justify-between  justify-start md:items-center'>
                    <div className='text-white flex flex-col md:flex-row gap-3'>
                        <span>
                            <FontAwesomeIcon icon={faLocationDot} className='pr-2 pt-[2px]' /> Vietnam
                        </span>
                        <span className='text-gray-500'>
                            <FontAwesomeIcon icon={faCopyright} /> 2023 HANOIS, Inc. All Rights Reserved
                        </span>
                    </div>

                    <ul className='flex flex-col md:flex-row gap-3 pb-5'>
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
