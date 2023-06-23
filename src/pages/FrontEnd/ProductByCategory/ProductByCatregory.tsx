import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ProductItem from '../../../components/ProductItem'

import { useState } from 'react'
import FilterItem from '../../../components/FilterItem'
import Tippy from '@tippyjs/react'

function ProductByCategory() {
    const [showFilter, setShowFilter] = useState(true)
    const [showSort, setShowSort] = useState(false)

    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }

    const handleHideSort = () => {
        setShowSort(false)
    }
    console.log(showSort)
    console.log('re-render')

    return (
        <>
            <section className='w-11/12 mx-auto'>
                {/* breadcrumb */}
                <p className='text-sm'>Jordan / Shoes</p>
                <div className='sticky top-0 flex justify-between py-3 bg-white z-10'>
                    <h5 className='text-2xl'>Men's Jordan Shoes (46)</h5>
                    <div className='flex gap-5'>
                        <button onClick={handleShowFilter}>
                            {showFilter ? 'Hide Filters' : 'Show Filters'} <FontAwesomeIcon icon={faArrowsRotate} />
                        </button>

                        <Tippy
                            onClickOutside={handleHideSort}
                            interactive={true}
                            visible={showSort }
                            placement='bottom'
                            render={(attrs) => (
                                <div className={`bg-red-500`} tabIndex={-1} {...attrs}>
                                    <button>btn 1</button>
                                    <button>btn 2</button>
                                    <button>btn 3</button>
                                </div>
                            )}
                        >
                            <button onClick={() => setShowSort(!showSort)}>
                                Sort By <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </Tippy>
                    </div>
                </div>
                <div className={`grid ${showFilter ? 'grid-cols-4' : 'grid-cols-3'}  gap-6 pt-2`}>
                    {/* filter */}
                    {showFilter && (
                        <div className='sticky top-[56px] col bg-white h-screen overflow-y-auto '>
                            <FilterItem text={'gender'} type={'checkbox'} filterArray={['men', 'women']} />
                            <FilterItem text={'size'} type={'checkbox'} filterArray={['36', '37', '38', '39', '40']} />
                            <FilterItem text={'size'} type={'checkbox'} filterArray={['36', '37', '38', '39', '40']} />
                            <FilterItem text={'size'} type={'checkbox'} filterArray={['36', '37', '38', '39', '40']} />
                            <FilterItem text={'gender'} type={'checkbox'} filterArray={['men', 'women']} />
                            <FilterItem text={'gender'} type={'checkbox'} filterArray={['men', 'women']} />
                        </div>
                    )}

                    {/* list product */}
                    <div className='col-span-3 bg-white'>
                        <div className='grid grid-cols-3 gap-4'>
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
