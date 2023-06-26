import { Link, NavLink, useLocation } from 'react-router-dom'
import style from './Navbar.module.css'
import { getAllProductTag, getAllTag } from '../../services/apiService'
import { useEffect, useState } from 'react'

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
    const pathName: string = location.pathname
    const [subCategory, setSubCategory] = useState<ProductTagState[]>([])
    const [category, setCategory] = useState<string[]>([])

    const FetchAllProductTag = async () => {
        const res = await getAllProductTag()
        const category = await getAllTag()
        const data = handleBuildCategoryData(res.data)

        setCategory(category.data)
        setSubCategory(data)
    }

    const handleBuildCategoryData = (data: IProductTag[]) => {
        const newData = data.map((item) => {
            return {
                navName: item.navName.navName,
                navNameId: item.navName._id,
                subnavNameId: item._id,
                subnavName: item.subnavName,
                list: item.list
            }
        })

        const newObj = newData.reduce((result: any, obj) => {
            const navName = obj.navName
            const navNameId = obj.navNameId
            const subnavNameId = obj.subnavNameId
            const indexNav = result.findIndex((item: any) => item.navName === navName)

            if (indexNav !== -1) {
                result[indexNav].list.push({
                    navName: navName,
                    navNameId: navNameId,
                    subnavNameId: subnavNameId,
                    subnavName: obj.subnavName,
                    list: obj.list
                })
            } else {
                result.push({
                    navName: navName,
                    list: [
                        {
                            navName: navName,
                            navNameId: navNameId,
                            subnavNameId: subnavNameId,
                            subnavName: obj.subnavName,
                            list: obj.list
                        }
                    ]
                })
            }
            return result
        }, [])
        return newObj
    }

    useEffect(() => {
        FetchAllProductTag()
    }, [])

    if (pathName == '/login' || pathName == '/register') {
        return
    }
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
