import productImage from '../../assets/productItem.webp'
function ProductItem() {
    return (
        <>
            <img src={productImage} alt='image' />
            <div className='py-3'>
                <p className='capitalize'>Air Jordan 1 Mid</p>
                <p className='text-gray-500'>Women's shoes</p>
                <p className='text-gray-500'>4 colours</p>
                <p className='mt-2'>
                    4,000,000<sup>₫</sup>
                </p>
            </div>
        </>
    )
}

export default ProductItem
