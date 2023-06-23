import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Logo from '../../assets/Logo.svg'
import style from './Header.module.css'
import Search from '../Search'

function Header() {
    return (
        <>
            <header className='bg-white border-b z-[99] relative'>
                <div className='w-11/12 mx-auto'>
                    <div className='flex items-center justify-between'>
                        <Link to={'/'}>
                            <img src={Logo} alt='nike' />
                        </Link>

                        <Search />

                        <div className='flex gap-x-5'>
                            <div className='relative'>
                                <Link to={'/cart'}>
                                    <FontAwesomeIcon icon={faCartShopping} className='text-xl cursor-pointer' />
                                    <div className='absolute top-[-50%] right-[-50%] text-red-500 text-sm font-medium bg-gray-100 w-5 h-5 flex items-center justify-center rounded-full'>
                                        3
                                    </div>
                                </Link>
                            </div>
                            <div className={`relative ${style.group}`}>
                                <FontAwesomeIcon icon={faUser} className='text-xl cursor-pointer' />
                                <ul
                                    className={`absolute z-[999] border  right-0 top-7 min-w-[150px]  bg-white hidden shadow-md ${style.user}`}
                                >
                                    <li className='px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                                        <Link className='block' to='/register'>
                                            Đăng ký
                                        </Link>
                                    </li>
                                    <li className='px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                                        <Link className='block' to='/login'>
                                            Đăng nhập
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Navbar />
        </>
    )
}

export default Header
