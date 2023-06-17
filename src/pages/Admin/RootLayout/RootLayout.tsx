import { Outlet } from 'react-router-dom'

function AdminLayout() {
    return (
        <>
            <div>Admin page</div>
            <Outlet />
        </>
    )
}

export default AdminLayout
