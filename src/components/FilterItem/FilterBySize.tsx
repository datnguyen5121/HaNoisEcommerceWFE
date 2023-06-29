import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { ProductValues } from '../../type/ProductValues'
import { IProductData } from '../ProductDetail/ProductDetail'

interface IProps {
    productList: IProductData[]
    filteredProducts: IProductData[]
    setFilteredProducts: (value: IProductData[]) => void
    selectedSize: string[]
    setSelectedSize: (value: string[]) => void
}

function FilterBySize(props: IProps) {
    const { selectedSize, setSelectedSize } = props

    const [show, setShow] = useState(false)
    const [iconRotation, setIconRotation] = useState(false)
    const filterArray = ['36', '37', '38', '39', '40', '41', '42']
    const handleShow = () => {
        setShow(!show)
        setIconRotation(!iconRotation)
    }

    const handleChange = (size: string) => {
        let updatedSize = [...selectedSize]
        if (updatedSize.includes(size)) {
            updatedSize = updatedSize.filter((selectedSize) => selectedSize !== size)
        } else {
            updatedSize.push(size)
        }
        setSelectedSize(updatedSize)
    }

    return (
        <div className='text-lg border-t relative mr-2'>
            <div className='flex items-center justify-between'>
                <button onClick={handleShow} className='w-full py-3  capitalize text-start mb-2 '>
                    Size
                </button>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className='transition'
                    rotation={iconRotation ? 180 : undefined}
                />
            </div>
            {show && (
                <div className='grid grid-cols-2 gap-4 pb-3'>
                    {filterArray.map((item) => {
                        return (
                            <div key={item}>
                                <label htmlFor={item} className='block cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        value={item}
                                        id={item}
                                        checked={selectedSize.includes(item)}
                                        onChange={() => {
                                            handleChange(item)
                                        }}
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

export default FilterBySize
