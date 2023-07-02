import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Loading from './components/Loading'
import ManageSizePage from './pages/Admin/ManageCategoryPage/ManageSizePage'

const RootLayout = lazy(() => import('./pages/RootLayout'))
const Home = lazy(() => import('./pages/UserPage/Home'))
const Login = lazy(() => import('./pages/UserPage/Login'))
const Register = lazy(() => import('./pages/UserPage/Register'))
const Cart = lazy(() => import('./pages/UserPage/Cart'))

const ProductByCategory = lazy(() => import('./pages/UserPage/ProductByCategory'))
const Checkout = lazy(() => import('./pages/UserPage/Checkout/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLayout = lazy(() => import('./pages/Admin/RootLayout'))
const ProductDetail = lazy(() => import('./components/ProductDetail'))
const ManageProductPage = lazy(() => import('./pages/Admin/ManageProduct/ManageProductPage'))
const ManageAccountPage = lazy(() => import('./pages/Admin/ManageAccountPage/ManageAccountPage'))
const ManageCategoryPage = lazy(() => import('./pages/Admin/ManageCategoryPage/ManageCategoryPage'))
const Account = lazy(() => import('./pages/UserPage/Account'))

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
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path='/' element={<RootLayout />}>
                            <Route path='/' element={<Home />} />
                            <Route path=':gender' element={<ProductByCategory />}>
                                <Route path=':category' element={<ProductByCategory />}>
                                    <Route path=':subCategory' element={<ProductByCategory />} />
                                </Route>
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
                            <Route path='size' element={<ManageSizePage />} />
                        </Route>
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default App
