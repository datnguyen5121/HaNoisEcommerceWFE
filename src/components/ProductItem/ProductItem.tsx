import { Link } from 'react-router-dom'
import productImage from '../../assets/productItem.webp'
import { IProductData } from '../ProductDetail/ProductDetail'
import { memo } from 'react'
interface IProps {
    isSearch?: boolean
    isCheckout?: boolean
    data: IProductData
}
function ProductItem(props: IProps) {
    const { isSearch, isCheckout, data } = props

    if (isSearch) {
        return (
            <Link to={`/product/${data._id}`}>
                <div className='flex gap-4 dat'>
                    <img
                        src={data.imgUrl && data.imgUrl.length > 0 && data.imgUrl[0]}
                        alt='image'
                        className='max-w-[200px] sm:w-1/2 md:w-1/3'
                    />
                    <div className='py-3 flex-1'>
                        <p className='capitalize line-clamp-1'>{data.title}</p>
                        <p className='text-gray-500'>{data.gender}</p>
                        <p className='text-gray-500'>{data.size.length} size</p>
                        <p className='mt-2 text-semibold'>
                            {data.price}
                            <sup>₫</sup>
                        </p>
                    </div>
                </div>
            </Link>
        )
    } else {
        //default
        return (
            <Link to={`/product/${data._id}`}>
                <div>
                    <img
                        src={data.imgUrl && data.imgUrl.length > 0 && data.imgUrl[0]}
                        alt='image'
                        className='md:max-w-[300px]  sm:max-w-[200px]'
                    />
                    <div className='py-3'>
                        <p className='capitalize'>{data.title}</p>
                        <p className='text-gray-500'>{data.gender}</p>
                        <p className='mt-2'>
                            {Intl.NumberFormat('en-US').format(data.price)}
                            <sup>₫</sup>
                        </p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default memo(ProductItem)
