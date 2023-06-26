import { FC } from 'react'
import styles from './HomeBox.module.css'

interface Props {
    image: string
    topText: string
    title: string
    text: string
    btn1: string
    btn2: string
}

const HomeBox: FC<Props> = ({ image, topText, title, text, btn1, btn2 }) => {
    console.log('homebox')

    return (
        <div className={`${styles.homeBox} w-full text-center`}>
            <img src={image} alt='noImg' className='w-11/12 mx-auto mb-10' />
            {topText !== '' && <p>{topText}</p>}
            <h1 className={styles.title}>{title}</h1>
            <p className='mt-5'>{text}</p>
            <div className={`${styles.btnBox}`}>
                <button className={styles.btn}>{btn1}</button>
                {btn2 !== '' && <button className={styles.btn}>{btn2}</button>}
            </div>
        </div>
    )
}

export default HomeBox
