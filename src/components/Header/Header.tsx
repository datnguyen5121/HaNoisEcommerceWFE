import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Logo from '../../assets/Logo.svg'
import style from './Header.module.css'
import Search from '../Search'

import { useSelector } from 'react-redux'
import { logoutUser } from '../../redux/authRequest'
import { useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import FilterItem from '../FilterItem'
import { useState, useEffect } from 'react'

function Header() {
    const user = useSelector((state: RootState) => state?.auth?.login?.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [showMenuOnMobile, setShowMenuOnMobile] = useState(false)
    const renderUserMenu = () => {
        if (user === null) {
            return (
                <ul
                    className={`absolute z-[999] border  right-0 top-7 min-w-[150px]  bg-white hidden shadow-md ${style.user}`}
                >
                    <li className='px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                        <Link className='block' to='/register'>
                            Register
                        </Link>
                    </li>
                    <li className='px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                        <Link className='block' to='/login'>
                            Login
                        </Link>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul
                    className={`absolute z-[999] border  right-0 top-7 min-w-[150px]  bg-white hidden shadow-md ${style.user}`}
                >
                    <li className='px-3 py-2  hover:bg-gray-200 cursor-pointer'>
                        <Link to={'/account'} className='block w-full text-start'>
                            My Account
                        </Link>
                    </li>
                    <li className='px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                        <Link className='block' to='/account'>
                            Account Info
                        </Link>
                    </li>
                    {user.infoUser.roleId == 'ADMIN' && (
                        <li className='px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                            <Link className='block' to='/admin/product'>
                                Admin Page
                            </Link>
                        </li>
                    )}
                    <li className='px-3 py-2 hover:bg-gray-200 cursor-pointer'>
                        <div className='block' onClick={() => logoutUser(dispatch)}>
                            Logout
                        </div>
                    </li>
                </ul>
            )
        }
    }

    const handleShowMenuOnMobile = () => {
        setShowMenuOnMobile(!showMenuOnMobile)
    }
    useEffect(() => {
        setShowMenuOnMobile(false)
    }, [location])
    return (
        <>
            <header className='bg-white border-b z-[99] relative'>
                <div className='w-11/12 mx-auto'>
                    <div className='flex items-center justify-between'>
                        <Link to={'/'}>
                            <img src={Logo} alt='nike' />
                        </Link>

                        <Search />

                        <div className='sm:flex gap-x-5 hidden'>
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
                                {renderUserMenu()}
                            </div>
                        </div>
                        <div className='block sm:hidden'>
                            <FontAwesomeIcon
                                icon={faBars}
                                className='text-lg cursor-pointer'
                                onClick={handleShowMenuOnMobile}
                            />
                            {showMenuOnMobile && (
                                <>
                                    <div
                                        className={`${style.menuOnMobile} bg-white z-10 fixed right-0 top-0 bottom-0 w-[80vw] px-5 py-9`}
                                    >
                                        <div className='flex gap-x-5 '>
                                            <div className={`relative  w-full`}>
                                                {user ? (
                                                    <FilterItem
                                                        text={
                                                            <FontAwesomeIcon
                                                                icon={faUser}
                                                                className='text-xl cursor-pointer'
                                                            />
                                                        }
                                                    >
                                                        <div>
                                                            <Link
                                                                to={'/account'}
                                                                className='block p-2 hover:bg-gray-200  '
                                                            >
                                                                My Account
                                                            </Link>
                                                            <button
                                                                className='block w-full text-start p-2 hover:bg-gray-200  '
                                                                onClick={() => {
                                                                    logoutUser(dispatch)
                                                                    navigate('/')
                                                                }}
                                                            >
                                                                Logout
                                                            </button>
                                                        </div>
                                                    </FilterItem>
                                                ) : (
                                                    <FilterItem
                                                        text={
                                                            <FontAwesomeIcon
                                                                icon={faUser}
                                                                className='text-xl cursor-pointer'
                                                            />
                                                        }
                                                    >
                                                        <div>
                                                            <Link
                                                                to={'/register'}
                                                                className='block p-2 hover:bg-gray-200  '
                                                            >
                                                                Register
                                                            </Link>
                                                            <Link
                                                                to={'/login'}
                                                                className='block p-2 hover:bg-gray-200  '
                                                            >
                                                                Login
                                                            </Link>
                                                        </div>
                                                    </FilterItem>
                                                )}

                                                <Link to={'/cart'} className='text-xl cursor-pointer flex items-center'>
                                                    <FontAwesomeIcon icon={faCartShopping} />{' '}
                                                    <span className='ml-3 block'>cart (3)</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div
                                            onClick={handleShowMenuOnMobile}
                                            className='close absolute right-0 top-0 bg-white text-3xl cursor-pointer  px-3'
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>
                                    </div>
                                    <div className={`${style.overlay}`} onClick={handleShowMenuOnMobile}></div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <Navbar />
        </>
    )
}

export default Header
