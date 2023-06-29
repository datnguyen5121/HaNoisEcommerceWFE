import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useState } from 'react'
import { ProductValues } from '../../type/ProductValues'
import { IProductData } from '../ProductDetail/ProductDetail'
interface IProps {
    selectedPriceRange: string
    setSelectedPriceRange: (value: string) => void
    productList: IProductData[]
    filteredProducts: IProductData[]
    setFilteredProducts: (value: IProductData[]) => void
}

function FilterByPrice(props: IProps) {
    const { productList, setFilteredProducts, filteredProducts, selectedPriceRange, setSelectedPriceRange } = props

    const [show, setShow] = useState(false)
    const [iconRotation, setIconRotation] = useState(false)
    const filterArray = ['Under 1,000,000₫', '1,000,000₫ - 2,000,000₫', '2,000,000₫ - 5,000,000₫', 'Over 5,000,000₫']

    const handleShow = () => {
        setShow(!show)
        setIconRotation(!iconRotation)
    }

    const handlePriceFilter = (priceRange: string) => {
        setSelectedPriceRange(priceRange)
    }

    return (
        <div className='text-lg border-t relative mr-2'>
            <div className='flex items-center justify-between'>
                <button onClick={handleShow} className='w-full py-3  capitalize text-start mb-2 '>
                    Price
                </button>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className='transition'
                    rotation={iconRotation ? 180 : undefined}
                />
            </div>
            {show && (
                <div className='pb-3'>
                    {filterArray.map((item) => {
                        return (
                            <div key={item}>
                                <label htmlFor={item} className='block cursor-pointer'>
                                    <input
                                        type='radio'
                                        value={item}
                                        id={item}
                                        name='price'
                                        checked={selectedPriceRange === item}
                                        onChange={(e) => handlePriceFilter(e.target.value)}
                                        className='w-4 h-4 '
                                    />{' '}
                                    <span className='capitalize'>{item}</span>
                                </label>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default memo(FilterByPrice)
