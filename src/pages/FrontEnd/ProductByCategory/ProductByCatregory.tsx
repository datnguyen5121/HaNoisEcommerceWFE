import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ProductItem from '../../../components/ProductItem'
import noProductImg from '../../../assets/no-product.png'
import { useState, useEffect } from 'react'
import useProductList from '../../../customhooks/useProductList'
import Tippy from '@tippyjs/react/headless'
//import { getProductByGenderCategory } from '../../../services/productService'
//import { useLocation } from 'react-router-dom'
import { ProductValues } from '../../../type/ProductValues'
import { useLocation } from 'react-router-dom'
import { getProductByGenderCategory } from '../../../services/productService'
import FilterByPrice from '../../../components/FilterItem/FilterByPrice'
import FilterBySize from '../../../components/FilterItem/FilterBySize'

function ProductByCategory() {
    const location = useLocation()
    const [showFilter, setShowFilter] = useState(true)
    const [showSort, setShowSort] = useState(false)
    const [productList, setProductList] = useState<ProductValues[]>([])
    const [filteredProducts, setFilteredProducts] = useState<ProductValues[]>([])
    const [sortBy, setSortBy] = useState('')
    const [gender, category, subCategory] = location.pathname.split('/').filter((item) => item !== '')

    //filter item
    const [selectedPriceRange, setSelectedPriceRange] = useState('')
    const [selectedSize, setSelectedSize] = useState<string[]>([])
    console.log('sort by', sortBy)
    const handleFetchProduct = async () => {
        const res = await getProductByGenderCategory(gender, category, subCategory)
        setProductList(res.data)
        setFilteredProducts(res.data)
    }

    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }

    const handleHideSort = () => {
        setShowSort(false)
    }

    const handleFilter = () => {
        let newFilteredProducts: ProductValues[] = [...productList]
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
        console.log('newFilteredProducts', newFilteredProducts)

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
        let newFilteredProducts: ProductValues[] = [...array]
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
                    <h5 className='text-2xl'>{location.pathname.split('/').join(' ')}</h5>
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
