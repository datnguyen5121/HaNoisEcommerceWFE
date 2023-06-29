import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowDownWideShort,
    faArrowUpShortWide,
    faArrowsRotate,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import ProductItem from '../../../components/ProductItem'
import noProductImg from '../../../assets/no-product.png'
import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react/headless'

import { ProductValues } from '../../../type/ProductValues'
import { useLocation } from 'react-router-dom'
import { getProductByGenderCategory } from '../../../services/productService'
import FilterByPrice from '../../../components/FilterItem/FilterByPrice'
import FilterBySize from '../../../components/FilterItem/FilterBySize'
import FilterItem from '../../../components/FilterItem'
import { IProductData } from '../../../components/ProductDetail/ProductDetail'

function ProductByCategory() {
    const location = useLocation()
    const [showFilter, setShowFilter] = useState(true)
    const [showSort, setShowSort] = useState(false)
    const [productList, setProductList] = useState<IProductData[]>([])
    const [filteredProducts, setFilteredProducts] = useState<IProductData[]>([])
    const [sortBy, setSortBy] = useState('')
    const [gender, category, subCategory] = location.pathname.split('/').filter((item) => item !== '')
    const [showFilterOnMobile, setShowFilterOnMobile] = useState(false)
    //filter item
    const [selectedPriceRange, setSelectedPriceRange] = useState('')
    const [selectedSize, setSelectedSize] = useState<string[]>([])
    const handleFetchProduct = async () => {
        const res = await getProductByGenderCategory(gender, category, subCategory)
        setProductList(res.data)
        setFilteredProducts(res.data)
    }

    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }

    const handleShowFilterOnMobile = () => {
        setShowFilterOnMobile(!showFilterOnMobile)
    }

    const handleFilter = () => {
        let newFilteredProducts: IProductData[] = [...productList]
        if (selectedSize.length > 0) {
            newFilteredProducts = handleSizeFilter(newFilteredProducts)
        }

        if (sortBy === 'price-low-high') {
            newFilteredProducts.sort(function (a, b) {
                return a.price - b.price
            })
        } else if (sortBy === 'price-high-low') {
            newFilteredProducts.sort(function (a, b) {
                return b.price - a.price
            })
        }

        if (selectedPriceRange === 'Under 1,000,000₫') {
            newFilteredProducts = newFilteredProducts.filter((product) => product.price > 0 && product.price < 1000000)
        } else if (selectedPriceRange === '1,000,000₫ - 2,000,000₫') {
            newFilteredProducts = newFilteredProducts.filter(
                (product) => product.price >= 1000000 && product.price <= 2000000
            )
        } else if (selectedPriceRange === '2,000,000₫ - 5,000,000₫') {
            newFilteredProducts = newFilteredProducts.filter(
                (product) => product.price >= 2000000 && product.price <= 5000000
            )
        } else if (selectedPriceRange === 'Over 5,000,000₫') {
            newFilteredProducts = newFilteredProducts.filter((product) => product.price > 5000000)
        }

        setFilteredProducts(newFilteredProducts)
    }

    useEffect(() => {
        handleFilter()
    }, [selectedSize, selectedPriceRange, productList, sortBy])

    const handleSizeFilter = (array: any) => {
        let newFilteredProducts: IProductData[] = [...array]
        if (selectedSize.length > 0) {
            newFilteredProducts = newFilteredProducts.filter((product) =>
                product.size.some((value) => selectedSize.includes(value))
            )
        }

        return newFilteredProducts
    }

    useEffect(() => {
        handleFetchProduct()
    }, [location])

    return (
        <>
            <section className='w-11/12 mx-auto'>
                <div className='sticky top-0 flex justify-between py-3 w-full bg-white z-10'>
                    <h5 className='text-lg  sm:text-2xl'>{location.pathname.split('/').join(' ')}</h5>
                    <div className='flex gap-5 overflow-hidden '>
                        <button className='hidden md:block' onClick={handleShowFilter}>
                            {showFilter ? 'Hide Filters' : 'Show Filters'} <FontAwesomeIcon icon={faArrowsRotate} />
                        </button>

                        <Tippy
                            onClickOutside={handleShowFilterOnMobile}
                            interactive={true}
                            visible={showFilterOnMobile}
                            placement='bottom'
                            render={(attrs) => (
                                <div
                                    className={`w-[70vw] px-3 bg-white shadow-md border-t border-gray-100 overflow-hidden`}
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <FilterItem text='filter'>
                                        <FilterByPrice
                                            selectedPriceRange={selectedPriceRange}
                                            setSelectedPriceRange={setSelectedPriceRange}
                                            filteredProducts={filteredProducts}
                                            productList={productList}
                                            setFilteredProducts={setFilteredProducts}
                                        />
                                        <FilterBySize
                                            selectedSize={selectedSize}
                                            setSelectedSize={setSelectedSize}
                                            filteredProducts={filteredProducts}
                                            productList={productList}
                                            setFilteredProducts={setFilteredProducts}
                                        />
                                    </FilterItem>
                                    <FilterItem text='Sort By'>
                                        <button
                                            onClick={() => setSortBy('price-high-low')}
                                            className='block w-full text-start hover:bg-gray-100 py-1'
                                        >
                                            <FontAwesomeIcon icon={faArrowDownWideShort} /> Price: High-Low
                                        </button>
                                        <button
                                            onClick={() => setSortBy('price-low-high')}
                                            className='block w-full text-start hover:bg-gray-100 py-1'
                                        >
                                            <FontAwesomeIcon icon={faArrowUpShortWide} /> Price: Low-High
                                        </button>
                                    </FilterItem>
                                </div>
                            )}
                        >
                            <button
                                onClick={handleShowFilterOnMobile}
                                className='md:hidden border px-3 py-1 rounded-full border-[#cacacb] hover:border-black'
                            >
                                Filter <FontAwesomeIcon icon={faArrowsRotate} />
                            </button>
                        </Tippy>
                        <Tippy
                            onClickOutside={() => {
                                setShowSort(!showSort)
                            }}
                            interactive={true}
                            visible={showSort}
                            placement='bottom'
                            render={(attrs) => (
                                <div
                                    className={`bg-white p-3 rounded-2xl flex flex-col text-start`}
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <button onClick={() => setSortBy('price-high-low')} className='px-2 py-1'>
                                        Price: High-Low
                                    </button>
                                    <button onClick={() => setSortBy('price-low-high')} className='px-2 py-1'>
                                        Price: Low-High
                                    </button>
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
                            <FilterByPrice
                                selectedPriceRange={selectedPriceRange}
                                setSelectedPriceRange={setSelectedPriceRange}
                                filteredProducts={filteredProducts}
                                productList={productList}
                                setFilteredProducts={setFilteredProducts}
                            />
                            <FilterBySize
                                selectedSize={selectedSize}
                                setSelectedSize={setSelectedSize}
                                filteredProducts={filteredProducts}
                                productList={productList}
                                setFilteredProducts={setFilteredProducts}
                            />
                        </div>
                    )}

                    {/* list product */}
                    <div className='col-span-3 bg-white'>
                        <div className='grid lg:grid-cols-3  grid-cols-2 gap-4'>
                            {filteredProducts.length > 0 &&
                                filteredProducts.map((productItem) => (
                                    <div className='bg-white' key={productItem._id}>
                                        <ProductItem isSearch={false} data={productItem} />
                                    </div>
                                ))}
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className='w-full flex justify-center'>
                                <img src={noProductImg} alt='no product' />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductByCategory
