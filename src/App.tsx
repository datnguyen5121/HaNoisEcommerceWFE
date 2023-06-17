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
function App() {
    //check login
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RootLayout />}>
                        <Route path='/' element={<Home />} />
                        <Route path=':gender' element={<Category />}>
                            <Route path=':category' element={<div>nike</div>} />
                        </Route>
                        <Route path='product' element={<div>hehe</div>}>
                            <Route path=':id' element={<ProductDetail />} />
                        </Route>
                        <Route path='cart' element={<Cart />} />e 
                        <Route path='checkout' element={<Checkout />} />

                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>
                    <Route path='admin' element={<AdminLayout />}>
                        <Route path='product' element={<div>register</div>} />
                        <Route path='account' element={<div>register</div>} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
