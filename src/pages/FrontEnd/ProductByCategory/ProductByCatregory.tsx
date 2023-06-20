import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ProductItem from '../../../components/ProductItem'
import { Link } from 'react-router-dom'
import style from './ProductByCategory.module.css'
import { useState } from 'react'
import FilterItem from '../../../components/FilterItem'

function ProductByCategory() {
    const [showFilter, setShowFilter] = useState(true)

    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }
    return (
        <>
            <section className=' container'>
                {/* breadcrumb */}
                <p className='text-sm'>Jordan / Shoes</p>
                <div className='sticky top-0 flex justify-between py-3 bg-white z-10'>
                    <h5 className='text-2xl'>Men's Jordan Shoes (46)</h5>
                    <div className='flex gap-5'>
                        <button onClick={handleShowFilter}>
                            {showFilter ? 'Hide Filters' : 'Show Filters'} <FontAwesomeIcon icon={faArrowsRotate} />
                        </button>
                        <button>
                            Sort By <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </div>
                </div>
                <div className={`grid ${showFilter ? 'grid-cols-4' : 'grid-cols-3'}  gap-6 pt-2`}>
                    {/* filter */}
                    {showFilter && (
                        <div
                            className='sticky top-[56px] col bg-white h-screen overflow-y-auto '
                            id={`${style.filter}`}
                        >
                            <FilterItem text={'gender'} type={'checkbox'} filterArray={['men', 'women']} />
                        </div>
                    )}

                    {/* list product */}
                    <div className='col-span-3 bg-white'>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                            <div className='bg-white'>
                                <Link to={'/'}>
                                    <ProductItem />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductByCategory
