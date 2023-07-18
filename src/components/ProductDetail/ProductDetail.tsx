import { useEffect, useState } from 'react'
import styles from './ProductDetail.module.css'
import img from '../../assets/imgEXP/Untitled.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'
import { getProductByGenderCategory, getProductById } from '../../services/productService'
import ProductItem from '../ProductItem'
import { addToCart } from '../../redux/features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import HomeSlide from '../HomeSlide/HomeSlide'
import FilterItem from '../FilterItem'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { toast } from 'react-toastify'

export interface IProductData {
    _id?: string
    category: string[]
    createdAt?: string
    updatedAt?: string
    description: string
    gender: string
    imgUrl: string[] | null
    price: number
    productName: string
    size: string[]
    title: string
    __v?: number
}

function ProductDetail() {
    const navigate = useNavigate()
    const location = useLocation()
    const productId = location.pathname.split('/')[2]
    const pathName: string = location.pathname

    const [indexImg, setIndexImg] = useState(0)
    const [sizeSelect, setSizeSelect] = useState('')
    const [productData, setProductData] = useState<IProductData>()
    const [productByGenderCategory, setProductByGenderCategory] = useState<IProductData[]>([])
    const dispatch = useDispatch()
    const fetchProductById = async () => {
        const res = await getProductById(productId)
        if (res.data) {
            setProductData(res.data)
        }
    }

    const handleAddToCart = () => {
        if (productData && sizeSelect) {
            const cartItem = {
                _id: productData._id || '',
                gender: productData.gender,
                productName: productData.productName,
                title: productData.title,
                description: productData.description,
                category: productData.category,
                size: sizeSelect,
                imgUrl: productData.imgUrl,
                price: productData.price,
                quantity: 1
            }

            dispatch(addToCart(cartItem))
        } else {
            toast.error('You have to choose size for product !')
        }
    }

    const fetchProductByGenderCategory = async () => {
        const gender = productData?.gender
        const category = productData?.productName
        const subCategory = productData?.category[0]

        const res = await getProductByGenderCategory(gender!, category!, subCategory!)

        setProductByGenderCategory(res.data)
    }

    useEffect(() => {
        fetchProductById()
        setIndexImg(0)
    }, [location])

    useEffect(() => {
        if (productData) {
            fetchProductByGenderCategory()
        }
    }, [productData])

    const handleSelectSize = (e: any) => {
        setSizeSelect(e.target.value)
    }
    const handleChangeImgProductDetail = (index: number) => {
        setIndexImg(index)
    }
    const handleLeftImgProduct = () => {
        if (indexImg > 0) {
            setIndexImg(indexImg - 1)
        } else {
            if (productData?.imgUrl) setIndexImg(productData?.imgUrl.length - 1)
        }
    }
    const handleNextImgProduct = () => {
        if (productData?.imgUrl) {
            if (indexImg < productData?.imgUrl.length - 1) {
                setIndexImg(indexImg + 1)
            } else {
                setIndexImg(0)
            }
        }
    }

    const fakeData: IProductData[] = [
        {
            _id: '1',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 0,
            category: [],
            gender: 'Gender loading',
            productName: 'Product name',
            size: []
        },
        {
            _id: '2',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 0,
            category: [],
            gender: 'Gender loading',
            productName: 'Product name',
            size: []
        },
        {
            _id: '3',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 0,
            category: [],
            gender: 'Gender loading',
            productName: 'Product name',
            size: []
        },
        {
            _id: '4',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 0,
            category: [],
            gender: 'Gender loading',
            productName: 'Product name',
            size: []
        },
        {
            _id: '5',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 0,
            category: [],
            gender: 'Gender loading',
            productName: 'Product name',
            size: []
        },
        {
            _id: '6',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 0,
            category: [],
            gender: 'Gender loading',
            productName: 'Product name',
            size: []
        }
    ]
    return (
        <>
            <section className='product-img'>
                <section className='lg:py-[60px] product-container lg:flex-row flex-col flex justify-center gap-[100px] lg:mx-[100px]'>
                    <section className='lg:sticky top-0  max-h-[100vh] lg:w-[60%] w-[100%] gap-[10px] flex lg:flex-row flex-col'>
                        <div
                            className={`${styles['no-scrollbar']} product-list-img gap-[10px] flex lg:flex-col col:mx-[20px] max-w-screen flex-row lg:overflow-y-auto  overflow-x-scroll lg:h-[450px] w-[100%]  lg:w-[10%] `}
                        >
                            {productData?.imgUrl &&
                                productData?.imgUrl.length > 0 &&
                                productData?.imgUrl.map((item, index) => {
                                    return (
                                        <button
                                            className={` ${
                                                index == indexImg && `active:bg-vioconst-700`
                                            }  lg:w-[100%] `}
                                            key={`img-detail${index}`}
                                            onClick={() => handleChangeImgProductDetail(index)}
                                        >
                                            <img
                                                className='hover:bg-gradient-to-t lg:w-[100%] w-[150px] max-w-none lg:mx-auto rounded-md h-[100%]'
                                                src={item}
                                            ></img>
                                        </button>
                                    )
                                })}
                        </div>
                        <div className='product-img relative w-[100%] max-h-[700px] '>
                            <img
                                className=' max-h-[700px] relative w-[100%] object-cover m-auto rounded-sm'
                                src={productData?.imgUrl ? productData?.imgUrl[indexImg] : ''}
                            ></img>
                            <div className='absolute flex flex-row gap-[10px] right-[10px] bottom-[20px] xl:bottom-[-80px]'>
                                <button
                                    className='w-[45px] h-[45px] bg-[white] shadow-sm active:bg-gray-400 border-gray-100 font-bold border-[1px] rounded-full'
                                    onClick={() => handleLeftImgProduct()}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <button
                                    className='w-[45px] h-[45px] bg-[white] shadow-sm active:bg-gray-400 border-gray-100 font-bold border-[1px] rounded-full'
                                    onClick={() => handleNextImgProduct()}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                        </div>
                    </section>

                    <div className='product-info lg:w-[40%] lg-px-[0] px-[50px] justify-center flex flex-col lg:items-start items-center '>
                        <div className='mt-[10px] product-title font-semibold  text-2xl'>{productData?.title}</div>
                        <div className='product-price font-semibold mt-[10px] text-base'>
                            {Intl.NumberFormat('en-US').format(productData?.price ?? 0)}

                            <sup>₫</sup>
                        </div>

                        <div className='mt-[10px] lg:w-[80%] w-[100%] category-product flex  flex-wrap gap-[10px]'>
                            {productData?.imgUrl &&
                                productData.imgUrl.length > 0 &&
                                productData.imgUrl.map((item: string) => (
                                    <img key={item} className='w-[70px] h-[70px]' src={item} />
                                ))}
                        </div>
                        <div className='mt-[10px] lg:w-[80%] w-[100%] product-size-container '>
                            <div className='product-size-title flex justify-between flex-row pr-[20px]'>
                                <div className='product-size-title1 text-black font-medium'>Select Size</div>
                                <div className='product-size-title2 text-gray-500 font-medium'>Size Guide</div>
                            </div>
                            <div className='mt-[10px] product-size-select flex flex-wrap justify-left gap-[10px] '>
                                {productData?.size &&
                                    productData?.size.length > 0 &&
                                    productData?.size.map((item) => (
                                        <button
                                            key={item}
                                            className='focus:border-[black] product-size-button border-[1px] w-[70px] h-[50px] rounded-md border-gray hover:border-black'
                                            onClick={handleSelectSize}
                                            value={item}
                                        >
                                            {item}
                                        </button>
                                    ))}
                            </div>
                        </div>
                        <div className='mt-[20px] lg:w-[80%] w-[100%] add-product flex flex-col gap-[10px]'>
                            <Button
                                text='Add to Bag'
                                textClass='bg-black text-white px-[24px] py-[18px]'
                                onClick={() => handleAddToCart()}
                            />
                            <Button
                                text='Home'
                                textClass='bg-white text-black px-[24px] py-[18px]  border-gray-500 border-[1px]'
                                onClick={() => navigate('/')}
                            />
                        </div>
                        <div className='w-100% first-letter:py-[30px] py-[30px] product-detail-description font-medium '>
                            {productData?.description}
                        </div>
                        <div className='border-t-[1px] w-[100%] product-delivery-rule font-medium'>
                            <FilterItem text='Free Delivery and Returns'>
                                <div className='flex gap-[20px] flex-col'>
                                    <div>Your order of 5.000.000₫ or more gets free standard delivery.</div>
                                    <ul className='list-disc px-[20px]'>
                                        <li>Standard delivered 4-5 Business Days</li>
                                        <li>Express delivered 2-4 Business Days </li>
                                    </ul>
                                    <div>
                                        Orders are processed and delivered Monday-Friday (excluding public holidays)
                                        Nike Members enjoy free returns.
                                    </div>
                                </div>
                            </FilterItem>
                        </div>
                    </div>
                </section>

                <HomeSlide
                    heading='You Might Also Like'
                    data={productByGenderCategory.length > 0 ? productByGenderCategory : fakeData}
                />
            </section>
        </>
    )
}

export default ProductDetail
