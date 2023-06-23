import { Link } from 'react-router-dom'
import productImage from '../../assets/productItem.webp'
interface IProps {
    isSearch: boolean
}
function ProductItem(props: IProps) {
    const { isSearch } = props
    return (
        <>
            {isSearch ? (
                <Link to={'/product/2'}>
                    <div className='flex gap-4'>
                        <img src={productImage} alt='image' className='max-w-[120px]' />
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
            ) : (
                <Link to={'/product/2'}>
                    <div>
                        <img src={productImage} alt='image' />
                        <div className='py-3'>
                            <p className='capitalize'>Air Jordan 1 Mid</p>
                            <p className='text-gray-500'>Women's shoes</p>
                            <p className='text-gray-500'>4 colours</p>
                            <p className='mt-2'>
                                4,000,000<sup>₫</sup>
                            </p>
                        </div>
                    </div>
                </Link>
            )}
        </>
    )
}

export default ProductItem
