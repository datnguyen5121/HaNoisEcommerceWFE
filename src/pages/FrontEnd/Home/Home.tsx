import HomeBox from '../../../components/HomeBox/HomeBox'
import HomeSlide from '../../../components/HomeSlide/HomeSlide'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notifyCheckoutSuccess } from '../../../redux/features/cartSlice'
import { toast } from 'react-toastify'
import { RootState } from '../../../redux/store'

function Home() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const successParam = queryParams.get('success')
    const dispatch = useDispatch()
    const cart = useSelector((state: RootState) => state.cart)

    const fakeData = [
        {
            image: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/6c6bdc2e-abbb-4b38-b57d-0a0d557b3f3f/yoga-dri-fit-luxe-cropped-tank-xvfQ34.png',
            title: 'Nike Yoga Dri-FIT Luxe',
            description: 'Women Cropped Tank',
            price: '$49.99'
        },
        {
            image: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/6c6bdc2e-abbb-4b38-b57d-0a0d557b3f3f/yoga-dri-fit-luxe-cropped-tank-xvfQ34.png',
            title: 'Nike Yoga Dri-FIT Luxe 2',
            description: 'Women Cropped Tank',
            price: '$49.99'
        },
        {
            image: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/6c6bdc2e-abbb-4b38-b57d-0a0d557b3f3f/yoga-dri-fit-luxe-cropped-tank-xvfQ34.png',
            title: 'Nike Yoga Dri-FIT Luxe 3',
            description: 'Women Cropped Tank',
            price: '$49.99'
        },
        {
            image: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/6c6bdc2e-abbb-4b38-b57d-0a0d557b3f3f/yoga-dri-fit-luxe-cropped-tank-xvfQ34.png',
            title: 'Nike Yoga Dri-FIT Luxe 4',
            description: 'Women Cropped Tank',
            price: '$49.99'
        },
        {
            image: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/w_467,c_limit/6c6bdc2e-abbb-4b38-b57d-0a0d557b3f3f/yoga-dri-fit-luxe-cropped-tank-xvfQ34.png',
            title: 'Nike Yoga Dri-FIT Luxe 5',
            description: 'Women Cropped Tank',
            price: '$49.99'
        }
    ]

    useEffect(() => {
        if (cart.items.length > 0 && successParam === 'true') {
            dispatch(notifyCheckoutSuccess())
        }
        if (cart.items.length > 0 && successParam === 'false') {
            toast('Checkout Failed')
        }
    }, [successParam, cart.items, dispatch])

    return (
        <div className='home'>
            <HomeBox
                image='https://i.pinimg.com/originals/96/34/ef/9634ef33aceefe26474bf1e95812a126.gif'
                topText='Summer Kicks'
                title='STEP INTO SUMMER STYLE'
                text='For days when you need fresh kicks that can keep up with your every move. #ChaseTheDays'
                btn1='Shop Kicks'
                btn2='Shop Summer Styles'
            />

            <HomeSlide heading='Find Your Flow Fits' data={fakeData} />

            <HomeBox
                image='https://wearecollins.imgix.net/uploads/3%20Collins%20x%20Air%20Max.gif?auto=format%2Ccompress&dpr=2.63&fit=max&q=90&w=400'
                topText=''
                title='LIVERPOOL 2023/24 HOME'
                text='An iconic design made modern, the Reds walk on as one.'
                btn1='Shop'
                btn2=''
            />

            <HomeSlide heading='Find Your Flow Fits' data={fakeData} />
        </div>
    )
}

export default Home
