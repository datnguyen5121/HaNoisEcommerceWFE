import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ProductItem from '../../../components/ProductItem'

import { useState, useEffect } from 'react'

import Tippy from '@tippyjs/react/headless'
import FilterContainer from '../../../components/FilterContainer'
import { getProductByGenderCategory } from '../../../services/productService'
import { useLocation } from 'react-router-dom'
import { ProductValues } from '../../../type/ProductValues'

function ProductByCategory() {
    const [showFilter, setShowFilter] = useState(true)
    const [showSort, setShowSort] = useState(false)
    const location = useLocation()
    const pathName = location.pathname
    const [gender, category, subCategory] = pathName.split('/').filter((item) => item !== '')
    const [productList, setProductList] = useState<ProductValues[]>([])
    const [filter, setFilter] = useState<string[]>([])

    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }

    console.log(productList)

    const handleHideSort = () => {
        setShowSort(false)
    }
    const handleFetchProduct = async () => {
        console.log('chay lai')

        const res = await getProductByGenderCategory(gender, category, subCategory)
        setProductList(res.data)
    }

    const handleProductFilterChange = () => {
        if (filter.length > 0) {
            const newProduct = productList.filter((productItem) =>
                filter.some(
                    (filterItem) => productItem.gender.includes(filterItem) || productItem.size.includes(filterItem)
                )
            )
            setProductList(newProduct)
        }
    }

    useEffect(() => {
        if (filter.length > 0) {
            handleProductFilterChange()
        } else {
            handleFetchProduct()
        }
    }, [pathName, filter])

    return (
        <>
            <section className='w-11/12 mx-auto'>
                {/* breadcrumb */}

                <div className='sticky top-0 flex justify-between py-3 w-full bg-white z-10'>
                    <h5 className='text-2xl'>Men's Jordan Shoes (46)</h5>
                    <div className='flex gap-5 overflow-hidden '>
                        <button className='hidden md:block' onClick={handleShowFilter}>
                            {showFilter ? 'Hide Filters' : 'Show Filters'} <FontAwesomeIcon icon={faArrowsRotate} />
                        </button>

                        {/*<Tippy
                            //onClickOutside={handleHideSort}
                            interactive={true}
                            visible={true}
                            placement='bottom'
                            render={(attrs) => (
                                <div className={`w-[100vw] px-3 bg-white overflow-hidden`} tabIndex={-1} {...attrs}>
                                    <FilterContainer />
                                </div>
                            )}
                        >
                            <button className='md:hidden border px-3 py-1 rounded-full border-[#cacacb] hover:border-black'>
                                Filter <FontAwesomeIcon icon={faArrowsRotate} />
                            </button>
                        </Tippy>*/}
                        <Tippy
                            onClickOutside={handleHideSort}
                            interactive={true}
                            visible={showSort}
                            placement='bottom'
                            render={(attrs) => (
                                <div
                                    className={`bg-white p-3 rounded-2xl flex flex-col text-start`}
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <button className='px-2 py-1'>Featured</button>
                                    <button className='px-2 py-1'>Newest</button>
                                    <button className='px-2 py-1'>Price: High-Low</button>
                                    <button className='px-2 py-1'>Price: Low-High</button>
                                </div>
                            )}
                        >
                            <button
                                className='hidden md:block'
                                onClick={() => {
                                    setShowSort(!showSort)
                                }}
                            >
                                Sort By <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </Tippy>
                    </div>
                </div>

                <div className={`grid ${showFilter ? 'md:grid-cols-4' : 'md:grid-cols-3 grid-cols-2'}  gap-6 pt-2`}>
                    {/* filter */}
                    {showFilter && (
                        <div className='hidden md:block  sticky top-[56px] col-span-1 bg-white h-screen overflow-y-auto '>
                            <FilterContainer filter={filter} setFilter={setFilter} />
                        </div>
                    )}

                    {/* list product */}
                    <div className='col-span-3 bg-white'>
                        <div className='grid lg:grid-cols-3  grid-cols-2 gap-4'>
                            {(productList.length > 0 &&
                                productList.map((productItem) => (
                                    <div className='bg-white' key={productItem._id}>
                                        <ProductItem isSearch={false} data={productItem} />
                                    </div>
                                ))) || <div className=''>chua co san pham</div>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductByCategory
