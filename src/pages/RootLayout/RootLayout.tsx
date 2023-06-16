import Header from '../../components/Header';
import { Outlet } from 'react-router-dom';
function RootLayout() {
    return (
        <>
            <div className="fixed top-0 left-0 right-0">
                <Header />
            </div>
            <div className="bg-[#E5E7EB] mt-12 min-h-screen h-full pb-7">
                <Outlet />
            </div>
        </>
    );
}

export default RootLayout;
