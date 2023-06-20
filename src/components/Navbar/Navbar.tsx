import { Link, NavLink } from 'react-router-dom'
import style from './Navbar.module.css'
function Navbar() {
    const category = ['men', 'women', 'sale']
    const subCategory = [
        {
            navName: 'men',
            list: [
                {
                    subnavName: 'shoes',
                    list: ['jordan', 'running', 'basketball']
                },
                {
                    subnavName: 'clothing',
                    list: ['jordan', 'shorts', 'T-Shirts']
                },
                {
                    subnavName: 'shop by sport',
                    list: ['running', 'football', 'basketball', 'yoga', 'tennis', 'golf']
                },
                {
                    subnavName: 'shop by brand',
                    list: ['nike SB', 'ACG', 'NBA']
                }
            ]
        },
        {
            navName: 'women',
            list: [
                {
                    subnavName: 'shoes',
                    list: ['jordan', 'running', 'basketball']
                },
                {
                    subnavName: 'clothing',
                    list: ['jordan', 'shorts', 'T-Shirts']
                }
            ]
        },
        {
            navName: 'sale',
            list: [
                {
                    subnavName: 'men sale',
                    list: ['shoes', 'clothing']
                },
                {
                    subnavName: 'women sale',
                    list: ['shoes', 'clothing']
                }
            ]
        }
    ]

    return (
        <>
            <nav className='flex justify-center pb-3 relative z-50 bg-white '>
                {category.map((categoryItem) => (
                    <div key={categoryItem} className=''>
                        <div className={`${style.navbar}`}>
                            <NavLink
                                to={`/${categoryItem}`}
                                className={`${style.category}absolute z-50 capitalize text-xl py-2 px-3 border-b-2 font-medium border-transparent hover:border-black`}
                            >
                                {categoryItem}
                            </NavLink>

                            <ul
                                className={`${style.subnav} absolute   mt-3 left-0 right-0  hidden  p-6 bg-white text-center  `}
                            >
                                <div className='flex justify-center'>
                                    {subCategory.map((subCategoryItem) => {
                                        if (subCategoryItem.navName === categoryItem) {
                                            return subCategoryItem.list.map((item) => (
                                                <li key={item.subnavName} className='flex flex-col text-start'>
                                                    <Link
                                                        to={`/${categoryItem}/${item.subnavName.split(' ').join('')}`}
                                                        className=' block py-2 px-3  font-medium capitalize text-gray-700 hover:text-black'
                                                    >
                                                        {item.subnavName}
                                                    </Link>
                                                    <ul className='text-base'>
                                                        {item.list.map((subItem) => (
                                                            <li key={subItem}>
                                                                <Link
                                                                    to={`/${categoryItem}/${subItem}`}
                                                                    className='block py-2 px-3 capitalize text-gray-500 hover:text-black'
                                                                >
                                                                    {subItem}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))
                                        }
                                        return null
                                    })}
                                </div>
                            </ul>
                        </div>
                    </div>
                ))}
            </nav>
            <div className={`${style.overlay}`}></div>
        </>
    )
}

export default Navbar
