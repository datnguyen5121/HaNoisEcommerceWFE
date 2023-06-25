import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const RootLayout = lazy(() => import('./pages/RootLayout'))
const Home = lazy(() => import('./pages/FrontEnd/Home'))
const Login = lazy(() => import('./pages/FrontEnd/Login'))
const Register = lazy(() => import('./pages/FrontEnd/Register'))
const Cart = lazy(() => import('./pages/FrontEnd/Cart'))

const ProductByCategory = lazy(() => import('./pages/FrontEnd/ProductByCategory'))
const Checkout = lazy(() => import('./pages/FrontEnd/Checkout/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Category = lazy(() => import('./pages/FrontEnd/Category'))
const AdminLayout = lazy(() => import('./pages/Admin/RootLayout'))
const ProductDetail = lazy(() => import('./components/ProductDetail'))
const ManageProductPage = lazy(() => import('./components/ManageProduct/ManageProductPage'))
const ManageAccountPage = lazy(() => import('./components/ManageAccountPage/ManageAccountPage'))
const ManageCategoryPage = lazy(() => import('./components/ManageCategoryPage/ManageCategoryPage'))
const Account = lazy(() => import('./pages/FrontEnd/Account'))

function App() {
    return (
        <>
            <BrowserRouter>
                <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='light'
                />
                <ToastContainer />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path='/' element={<RootLayout />}>
                            <Route path='/' element={<Home />} />
                            <Route path=':gender' element={<Category />}>
                                <Route path=':category' element={<ProductByCategory />} />
                            </Route>
                            <Route path='product/:id' element={<ProductDetail />} />
                            <Route path='cart' element={<Cart />} />
                            <Route path='checkout' element={<Checkout />} />
                            <Route path='account' element={<Account />} />
                            <Route path='login' element={<Login />} />
                            <Route path='register' element={<Register />} />
                        </Route>
                        <Route path='admin' element={<AdminLayout />}>
                            <Route index element={<Navigate to='product' />} />
                            <Route path='product' index element={<ManageProductPage />} />
                            <Route path='account' element={<ManageAccountPage />} />
                            <Route path='category' element={<ManageCategoryPage />} />
                        </Route>
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default App
