import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
import ManageProductPage from './components/ManageProduct/ManageProductPage'
import ManageAccountPage from './components/ManageAccountPage/ManageAccountPage'
import { useEffect, useState } from 'react'
import { ProductValues } from './type/ProductValues'
import { AccountValues } from './type/AccountValues'

function App() {
    const [product, setProduct] = useState<ProductValues[]>(() => {
        return JSON.parse(localStorage.getItem('product') || '[]')
    })
    useEffect(() => {
        localStorage.setItem('product', JSON.stringify(product))
    }, [product])
    const [account, setAccount] = useState<AccountValues[]>(() => {
        return JSON.parse(localStorage.getItem('account') || '[]')
    })
    useEffect(() => {
        localStorage.setItem('account', JSON.stringify(account))
    }, [account])
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
                        <Route path='cart' element={<Cart />} />
                        <Route path='checkout' element={<Checkout />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>
                    <Route path='/admin' element={<AdminLayout />}>
                        <Route index element={<Navigate to='product' />}></Route>
                        <Route path='product' index element={<ManageProductPage setProduct={setProduct} />} />
                        <Route path='account' element={<ManageAccountPage setAccount={setAccount} />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
