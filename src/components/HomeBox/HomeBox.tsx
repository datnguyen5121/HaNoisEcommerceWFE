import { FC } from 'react'
import styles from './HomeBox.module.css'
import { Link } from 'react-router-dom'

interface Props {
    image: string
    topText: string
    title: string
    text: string
    btn1: string
    btn2: string
}

const HomeBox: FC<Props> = ({ image, topText, title, text, btn1, btn2 }) => {
    return (
        <div className={`${styles.homeBox} w-full text-center`}>
            <img src={image} alt='noImg' className='w-11/12 mx-auto mb-10' />
            {topText !== '' && <p>{topText}</p>}
            <h1 className={styles.title}>{title}</h1>
            <p className='mt-5'>{text}</p>
            <div className={`${styles.btnBox}`}>
                <Link to={btn1 == 'Running' ? '/Men/Shoes/Running' : '/Kid/Shoes'}>
                    <button className={styles.btn}>{btn1}</button>
                </Link>

                {btn2 !== '' && (
                    <Link to={btn2 == 'Jordan' ? '/Men/Shoes/Jordan' : '/Kid/Shoes'}>
                        <button className={styles.btn}>{btn2}</button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default HomeBox
