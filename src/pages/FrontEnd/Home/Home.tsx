import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RootState } from '../../../redux/store'
import axios from 'axios'
import HomeBox from '../../../components/HomeBox/HomeBox'
import HomeSlide from '../../../components/HomeSlide/HomeSlide'
import { useLocation } from 'react-router-dom'
import { notifyCheckoutSuccess } from '../../../redux/features/cartSlice'

function Home() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const successParam = queryParams.get('success')
    const dispatch = useDispatch()
    const cart = useSelector((state: RootState) => state.cart)

    const [products, setProducts] = useState([])

    const fakeData = [
        {
            _id: '1',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 'Loading'
        },
        {
            _id: '2',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 'Loading'
        },
        {
            _id: '3',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 'Loading'
        },
        {
            _id: '4',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 'Loading'
        },
        {
            _id: '5',
            imgUrl: [
                'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            ],
            title: 'Loading',
            description: 'Loading',
            price: 'Loading'
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/get-all-product')
                const fetchedProducts = response.data.data.slice(0, 10)
                setProducts(fetchedProducts)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className='home'>
            <HomeBox
                image='https://i.pinimg.com/originals/96/34/ef/9634ef33aceefe26474bf1e95812a126.gif'
                topText='Summer Kicks'
                title='STEP INTO SUMMER'
                text='For days when you need fresh kicks. #ChaseTheDays'
                btn1='Running'
                btn2='Jordan'
            />

            <HomeSlide heading='Find Your Flow Fits' data={products.length > 0 ? products : fakeData} index={0} />

            <HomeBox
                image='https://wearecollins.imgix.net/uploads/3%20Collins%20x%20Air%20Max.gif?auto=format%2Ccompress&dpr=2.63&fit=max&q=90&w=400'
                topText=''
                title='KIDS NEW WEAR'
                text='An iconic design made modern, the kids walk on as one.'
                btn1='Kids Wear'
                btn2=''
            />

            <HomeSlide heading='Find Your Flow Fits' data={products.length > 0 ? products : fakeData} index={1} />
        </div>
    )
}

export default Home
