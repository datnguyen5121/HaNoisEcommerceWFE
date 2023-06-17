import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'
function RootLayout() {
    return (
        <>
            <div className=''>
                <Header />
            </div>
            <div className=''>
                <Outlet />
            </div>
            <div className=''>
                <Footer />
            </div>
        </>
    )
}

export default RootLayout
