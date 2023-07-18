import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import style from './Navbar.module.css'
import { getAllProductTag, getAllTag } from '../../services/apiService'
import { useEffect, useState } from 'react'
import useProductTag from '../../customhooks/useProductTag'
interface ProductTagState {
    navName: string
    list: SubNavName[]
}

interface SubNavName {
    list: string[]
    navName: string
    subnavName: string
    subnavNameId: string
    navNameId: string
}

interface IProductTag {
    _id: string
    navName: { _id: string; navName: string }
    list: string[]
    subnavName: string
}

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const pathName: string = location.pathname
    const [subCategory, setSubCategory] = useState<ProductTagState[]>([])
    const [category, setCategory] = useState<string[]>([])

    const FetchAllProductTag = async () => {
        const res = await getAllProductTag()
        const category = await getAllTag()
        const data = useProductTag(res.data)

        setCategory(category.data)
        setSubCategory(data)
    }

    useEffect(() => {
        FetchAllProductTag()
    }, [])

    if (pathName == '/login' || pathName == '/register') {
        return
    }
    const setLocation = (newLocation) => {
        navigate(newLocation)
    }
    const handleLinkClick = (url: string) => {
        window.history.pushState(null, '', url)
        setLocation({ ...location, pathname: url })
    }

    return (
        <>
            <nav className='flex justify-center pb-3 relative z-50 bg-white '>
                {category.map((categoryItem) => (
                    <div key={categoryItem} className=''>
                        <div className={`${style.navbar}`}>
                            <Link
                                to={`/${categoryItem}`}
                                className={`${style.category}absolute z-50 capitalize text-xl py-2 px-3 border-b-2 font-medium border-transparent hover:border-black`}
                                onClick={() => handleLinkClick(`/${categoryItem}`)}
                            >
                                {categoryItem}
                            </Link>

                            <ul
                                className={`${style.subnav} absolute    mt-3 left-0 right-0  hidden  p-6 bg-white text-center  `}
                            >
                                <div className='flex justify-center'>
                                    {subCategory.map((subCategoryItem) => {
                                        if (subCategoryItem.navName === categoryItem) {
                                            return subCategoryItem.list.map((item) => (
                                                <li key={item.subnavName} className='flex flex-col text-start'>
                                                    <Link
                                                        to={`/${categoryItem}/${item.subnavName}`}
                                                        className=' block py-2 px-3  font-medium capitalize text-gray-700 hover:text-black'
                                                    >
                                                        {item.subnavName}
                                                    </Link>
                                                    <ul className='text-base'>
                                                        {item.list.map((subItem) => (
                                                            <li key={subItem}>
                                                                <Link
                                                                    to={`/${categoryItem}/${item.subnavName}/${subItem}`}
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
