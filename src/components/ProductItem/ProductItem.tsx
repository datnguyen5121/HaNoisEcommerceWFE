import { Link } from 'react-router-dom'
import productImage from '../../assets/productItem.webp'
import { IProductData } from '../ProductDetail/ProductDetail'
interface IProps {
    isSearch?: boolean
    isCheckout?: boolean
    data: IProductData
}
function ProductItem(props: IProps) {
    const { isSearch, isCheckout, data } = props

    console.log(data)

    if (isSearch) {
        return (
            <Link to={`/product/${data._id}`}>
                <div className='flex gap-4'>
                    <img
                        src={data.imgUrl && data.imgUrl.length > 0 && data.imgUrl[0]}
                        alt='image'
                        className='max-w-[120px]'
                    />
                    <div className='py-3 flex-1'>
                        <p className='capitalize line-clamp-1'>Air Jordan 1 Mid</p>
                        <p className='text-gray-500'>Women's shoes</p>
                        <p className='text-gray-500'>4 colours</p>
                        <p className='mt-2'>
                            4,000,000<sup>₫</sup>
                        </p>
                    </div>
                </div>
            </Link>
        )
    } else if (isCheckout) {
        return (
            <Link to={`/product/${data._id}`}>
                <div className='flex items-center gap-4 my-1'>
                    <img src={productImage} alt='image' className='max-w-[120px] max-h-[120px]' />
                    <div className='py-3 flex-1'>
                        <p className='capitalize line-clamp-1'>Air Jordan 1 Mid</p>
                        <p className='text-gray-500'>Men shoes</p>
                        <p className='text-gray-500'>Quantity: 4</p>
                        <p className='text-gray-500'>Size: 39</p>
                        <p className=''>
                            4,000,000<sup>₫</sup>
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
                        className='max-w-full'
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

export default ProductItem
