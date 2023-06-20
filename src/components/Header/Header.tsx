import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faSpinner, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../assets/Logo.svg'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import style from './Header.module.css'
function Header() {
    return (
        <>
            <header className='bg-white border-b z-[99] relative'>
                <div className='container mx-auto'>
                    <div className='flex items-center justify-between'>
                        <Link to={'/'}>
                            <img src={Logo} alt='nike' />
                        </Link>

                        <div className='bg-gray-100 h-[40px] w-[400px] rounded-full flex items-center border border-transparent focus-within:border-gray-300'>
                            <input
                                type='text'
                                className='bg-transparent outline-none px-4 flex-1 py-2'
                                spellCheck={false}
                                placeholder='Search'
                            />
                            <button>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            {/*<FontAwesomeIcon icon={faSpinner} className='w-3 h-3' />*/}

                            <button className='px-3  h-full rounded-br-full rounded-tr-full'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>

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
