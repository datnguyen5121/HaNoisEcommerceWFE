import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import Home from './pages/FrontEnd/Home'
import Login from './pages/FrontEnd/Login'
import Register from './pages/FrontEnd/Register'
import Cart from './pages/FrontEnd/Cart'
import Checkout from './pages/FrontEnd/Checkout/Checkout'
import NotFound from './pages/NotFound'
import Category from './pages/FrontEnd/Category'
import AdminLayout from './pages/Admin/RootLayout'
import ProductDetail from './components/ProductDetail'
import ProductByCategory from './pages/FrontEnd/ProductByCategory'
function App() {
    //check login
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RootLayout />}>
                        <Route path='/' element={<Home />} />
                        <Route path=':gender' element={<Category />}>
                            <Route path=':category' element={<ProductByCategory />} />
                        </Route>
                        <Route path='product/:id' element={<ProductDetail />}></Route>
                        <Route path='cart' element={<Cart />} />
                        <Route path='checkout' element={<Checkout />} />
                    </Route>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='admin' element={<AdminLayout />}>
                        <Route path='manage-product' element={<div>register</div>} />
                        <Route path='manage-account' element={<div>register</div>} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
