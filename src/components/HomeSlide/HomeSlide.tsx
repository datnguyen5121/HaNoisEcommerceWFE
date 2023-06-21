import { FC } from 'react'
import styles from './HomeSlide.module.css'

interface Props {
    heading: string
    data: Array<{
        image: string
        title: string
        description: string
        price: string
    }>
}

const HomeSlide: FC<Props> = ({ data, heading }) => {
    function scrollLeft() {
        const container = document.getElementById('homeSlideContainer')
        container.style.scrollBehavior = 'smooth'

        if (container) {
            container.scrollLeft -= 300
        }
    }

    function scrollRight() {
        const container = document.getElementById('homeSlideContainer')
        container.style.scrollBehavior = 'smooth'

        if (container) {
            container.scrollLeft += 300
        }
    }
    return (
        <div className={styles.homeSlide}>
            <div className={`${styles.slideHeading} w-11/12 mx-auto`}>
                <h2 className={styles.heading}>{heading}</h2>
                <div className={styles.btnGrp}>
                    <p>Shop</p>
                    <button onClick={scrollLeft}>&lt;</button>
                    <button onClick={scrollRight}>&gt;</button>
                </div>
            </div>

            <div className={`${styles.slide} w-11/12 mx-auto`} id='homeSlideContainer'>
                <div className={styles.slideItems}>
                    {data.map((item, index) => (
                        <div key={index} className={styles.slideItem}>
                            <img src={item.image} alt='' />
                            <div className={styles.slideItemText}>
                                <div className={styles.textLeft}>
                                    <h5>{item.title}</h5>
                                    <p>{item.description}</p>
                                </div>
                                <h5>{item.price}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeSlide