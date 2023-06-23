import { useState } from 'react'
import img from '../../assets/imgEXP/Untitled.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
function ProductDetail() {
    let [indexImg, setIndexImg] = useState(0)
    let [rectDom, setRectDom] = useState(0)
    let listImgArray = [
        {
            imgUrl: img
        },
        {
            imgUrl: img
        },
        {
            imgUrl: img
        },
        {
            imgUrl: img
        },
        {
            imgUrl: img
        },
        {
            imgUrl: img
        },
        {
            imgUrl: img
        }
    ]

    let listCategoryProduct = [
        {
            imgUrl: img,
            cost: '200000đ',
            gender: 'Nam'
        },
        {
            imgUrl: img,
            cost: '200000đ',
            gender: 'Nam'
        },
        {
            imgUrl: img,
            cost: '200000đ',
            gender: 'Nam'
        },
        {
            imgUrl: img,
            cost: '200000đ',
            gender: 'Nam'
        },
        {
            imgUrl: img,
            cost: '200000đ',
            gender: 'Nam'
        },
        {
            imgUrl: img,
            cost: '200000đ',
            gender: 'Nam'
        }
    ]
    let handleChangeImgProductDetail = (index: number) => {
        setIndexImg(index)
    }
    let handleLeftImgProduct = () => {
        if (indexImg > 0) {
            console.log('dat')

            setIndexImg(indexImg - 1)
        } else {
            setIndexImg(listImgArray.length - 1)
        }
    }
    let handleNextImgProduct = () => {
        console.log(listImgArray.length)

        if (indexImg < listImgArray.length - 1) {
            console.log('dat')
            setIndexImg(indexImg + 1)
        } else {
            setIndexImg(0)
        }
    }
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
            <section className=''>
                <section className='py-[60px] product-container flex-row flex justify-center gap-[100px] mx-[100px]'>
                    <section className='sticky top-0  max-h-[700px] w-[60%] gap-[10px] flex'>
                        <div className='product-list-img gap-[10px] flex flex-col overflow-y-auto no-scrollbar h-[450px] w-[10%] border-[1px] border-black'>
                            {listImgArray &&
                                listImgArray.map((item, index) => {
                                    return (
                                        <button
                                            className={` ${index == indexImg && `active:bg-violet-700`}`}
                                            key={`img-detail${index}`}
                                            onClick={() => handleChangeImgProductDetail(index)}
                                        >
                                            <img
                                                className='hover:bg-gradient-to-t w-[60px] mx-auto rounded-md h-[60px]'
                                                src={item.imgUrl}
                                            ></img>
                                        </button>
                                    )
                                })}
                        </div>
                        <div className='product-img relative w-[100%] max-h-[700px] border-[1px] border-black'>
                            <img
                                className=' max-h-[700px] relative w-[100%] object-cover m-auto rounded-sm'
                                src={listImgArray[indexImg].imgUrl}
                            ></img>
                            <div className='absolute flex flex-row gap-[10px] right-[10px] bottom-[20px]'>
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

                    <div className='product-info w-[40%] border-[1px] border-black'>
                        <div className='mt-[10px] product-title font-semibold  text-2xl'>Jordan 1 Mid</div>
                        <div className='product-price font-semibold mt-[10px] text-base'>1909000đ</div>

                        <div className='mt-[10px] w-[80%] category-product flex flex-wrap gap-[10px]'>
                            <img className='w-[70px] h-[70px]' src={img}></img>
                            <img className='w-[70px] h-[70px]' src={img}></img>
                            <img className='w-[70px] h-[70px]' src={img}></img>
                            <img className='w-[70px] h-[70px]' src={img}></img>
                            <img className='w-[70px] h-[70px]' src={img}></img>
                            <img className='w-[70px] h-[70px]' src={img}></img>
                        </div>
                        <div className='mt-[10px] w-[80%] product-size-container border-[1px] border-black'>
                            <div className='product-size-title flex justify-between flex-row pr-[20px]'>
                                <div className='product-size-title1 text-black font-medium'>Select Size</div>
                                <div className='product-size-title2 text-gray-500 font-medium'>Size Guide</div>
                            </div>
                            <div className='mt-[10px] product-size-select flex flex-wrap justify-left gap-[10px] '>
                                <button className='focus:border-[black] product-size-button border-[1px] w-[70px] h-[50px] rounded-md border-gray hover:border-black'>
                                    EU 27.5
                                </button>
                                <button className='focus:border-[black] product-size-button border-[1px] w-[70px] h-[50px] rounded-md border-gray hover:border-black'>
                                    EU 27.5
                                </button>
                                <button className='focus:border-[black] product-size-button border-[1px] w-[70px] h-[50px] rounded-md border-gray hover:border-black'>
                                    EU 27.5
                                </button>
                                <button className='focus:border-[black] product-size-button border-[1px] w-[70px] h-[50px] rounded-md border-gray hover:border-black'>
                                    EU 27.5
                                </button>
                                <button className='focus:border-[black] product-size-button border-[1px] w-[70px] h-[50px] rounded-md border-gray hover:border-black'>
                                    EU 27.5
                                </button>
                            </div>
                        </div>
                        <div className='mt-[20px] w-[80%] add-product flex flex-col gap-[10px]'>
                            <button className='bg-black text-white px-[24px] py-[18px] rounded-full hover:opacity-70'>
                                Add to Bag
                            </button>
                            <button className='bg-white text-black px-[24px] py-[18px] border-gray-500 border-[1px] rounded-full hover:border-black'>
                                Home
                            </button>
                        </div>
                        <div className='py-[30px] product-detail-description font-medium '>
                            These shorts are the ones that are down for everything you do—from long walks to HIIT to
                            running errands. Their silky-smooth, ultra-soft woven fabric is balanced with sweat-wicking
                            tech so you have ultimate comfort while feeling dry as you work out. The snug inner layer
                            helps prevent chafing so you can push yourself with uncompromising coverage.
                        </div>
                        <div className='border-t-[1px] product-delivery-rule font-medium'>
                            <div className='py-[30px]  flex justify-between cursor-pointer'>
                                <h3 className='font-semibold text-xl '>Free Delivery and Returns </h3>
                                <FontAwesomeIcon icon={faChevronUp} className='pr-[20px]' />
                            </div>

                            <div className='flex gap-[20px] flex-col'>
                                <div>Your order of 5.000.000₫ or more gets free standard delivery.</div>
                                <ul className='list-disc px-[20px]'>
                                    <li>Standard delivered 4-5 Business Days</li>
                                    <li>Express delivered 2-4 Business Days </li>
                                </ul>
                                <div>
                                    Orders are processed and delivered Monday-Friday (excluding public holidays) Nike
                                    Members enjoy free returns.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='pl-[48px] content-2 h-[700px]'>
                    <section className='relative'>
                        <article className='text-lg py-[20px] font-semibold'>You Might Also Like</article>
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
                    <section className=' flex flex-row no-scrollbar gap-[10px] overflow-x-auto ' id='carousel-product'>
                        {listCategoryProduct &&
                            listCategoryProduct.map((item, index) => {
                                return (
                                    <div className={`product${index} flex-col`}>
                                        <div className='w-[400px] h-[400px]'>
                                            <img className='w-[400px] h-[400px]' src={item.imgUrl}></img>
                                        </div>
                                        <article>{item.gender}</article>
                                        <article>{item.cost}</article>
                                    </div>
                                )
                            })}
                    </section>
                </section>
            </section>
        </>
    )
}

export default ProductDetail
