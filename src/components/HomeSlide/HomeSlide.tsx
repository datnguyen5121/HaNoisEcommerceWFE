import { FC } from 'react'
// import styles from './HomeSlide.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ProductItem from '../ProductItem'
import styles from '../ProductDetail/ProductDetail.module.css'

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
export interface IProp {
    data: IProductData[]
    heading: string
}
const HomeSlide: FC<IProp> = ({ data, heading }) => {
    function scrollLeft() {
        const container = document.getElementById('carousel-product')!
        container.style.scrollBehavior = 'smooth'
        if (container) {
            container.scrollLeft -= 300
        }
    }

    function scrollRight() {
        const container = document.getElementById('carousel-product')!
        container.style.scrollBehavior = 'smooth'
        if (container) {
            container.scrollLeft += 300
        }
    }

    return (
        <>
            <section className='w-11/12 mx-auto content-2 pt-5 my-[100px]'>
                <section className='relative'>
                    <article className='text-lg py-[20px] font-semibold'>{heading}</article>
                    <div className='absolute flex flex-row gap-[10px] right-[10px] bottom-[20px]'>
                        <button
                            className='w-[45px] h-[45px] bg-[white] shadow-sm active:bg-gray-400 border-gray-100 font-bold border-[1px] rounded-full'
                            onClick={() => scrollLeft()}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button
                            className='w-[45px] h-[45px] bg-[white] shadow-sm active:bg-gray-400 border-gray-100 font-bold border-[1px] rounded-full'
                            onClick={() => scrollRight()}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </section>
                <section
                    className={` flex flex-row ${styles['no-scrollbar']}  gap-[10px] overflow-x-auto `}
                    id='carousel-product'
                >
                    {data &&
                        data.length > 0 &&
                        data.map((product) => (
                            <div className=' ' key={product._id}>
                                <ProductItem isSearch={false} data={product} />
                            </div>
                        ))}
                </section>
            </section>
        </>
    )
}

export default HomeSlide
