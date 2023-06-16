import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
function App() {
    //check login
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route path=":gender" element={<div className="bg-slate-600">category</div>}>
                            <Route path=":category" element={<div>nike</div>} />
                        </Route>
                        <Route path="product" element={<div>hehe</div>} />
                        <Route path="cart" element={<div>cart</div>} />
                        <Route path="checkout" element={<div>hehe</div>} />

                        <Route path="login" element={<div>login</div>} />
                        <Route path="register" element={<div>register</div>} />
                    </Route>
                    <Route path="admin" element={<div>admin page</div>}>
                        <Route path="product" element={<div>register</div>} />
                        <Route path="account" element={<div>register</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
