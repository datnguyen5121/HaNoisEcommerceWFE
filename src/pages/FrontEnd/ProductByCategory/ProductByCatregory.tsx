import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ProductItem from '../../../components/ProductItem'

import { useState } from 'react'

import Tippy from '@tippyjs/react/headless'
import FilterContainer from '../../../components/FilterContainer'

function ProductByCategory() {
    const [showFilter, setShowFilter] = useState(true)
    const [showSort, setShowSort] = useState(false)

    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }

    const handleHideSort = () => {
        setShowSort(false)
    }


    return (
        <>
            <section className='w-11/12 mx-auto'>
                {/* breadcrumb */}

                <p className='text-sm'>Jordan / Shoes</p>
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
                                <div className={` w-[100vw] px-3 bg-white `} tabIndex={-1} {...attrs}>
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
                            <FilterContainer />
                        </div>
                    )}

                    {/* list product */}
                    <div className='col-span-3 bg-white'>
                        <div className='grid lg:grid-cols-3  grid-cols-2 gap-4'>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                            <div className='bg-white'>
                                <ProductItem isSearch={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductByCategory
