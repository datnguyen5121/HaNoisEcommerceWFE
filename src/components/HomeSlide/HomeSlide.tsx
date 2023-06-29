import { FC } from 'react'
import styles from './HomeSlide.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
interface Props {
    heading: string
    data: Array<{
        _id: string
        imgUrl: string[]
        title: string
        description: string
        price: string
    }>
    index: number
}

const HomeSlide: FC<Props> = ({ data, heading, index }) => {
    function scrollLeft() {
        const container = document.getElementById(`homeSlideContainer${index}`)
        if (container) {
            container.style.scrollBehavior = 'smooth'
            container.scrollLeft -= 300
        }
    }

    function scrollRight() {
        const container = document.getElementById(`homeSlideContainer${index}`)
        if (container) {
            container.style.scrollBehavior = 'smooth'
            container.scrollLeft += 300
        }
    }

    return (
        <div className={styles.homeSlide}>
            <div className={`${styles.slideHeading} w-11/12 mx-auto`}>
                <h2 className={styles.heading}>{heading}</h2>
                <div className={styles.btnGrp}>
                    <p className='text-lg font-medium'>Shop</p>
                    <button onClick={scrollLeft}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button onClick={scrollRight}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>

            <div
                className={`${styles['no-scrollbar']} ${styles.slide} w-11/12 mx-auto `}
                id={`homeSlideContainer${index}`}
            >
                <div className={styles.slideItems}>
                    {data.map((item, index) => (
                        <Link to={`/product/${item._id}`} key={index}>
                            <div className={styles.slideItem}>
                                <img src={item.imgUrl[0]} alt='' />
                                <div className={styles.slideItemText}>
                                    <div className={styles.textLeft}>
                                        <h5>{item.title}</h5>
                                        <p>{item.price} đ</p>
                                    </div>
                                    <h5></h5>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeSlide
