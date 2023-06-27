import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useEffect } from 'react'

function AdminLayout() {
    const user = useSelector((state: RootState) => state?.auth?.login?.currentUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (user?.infoUser?.roleId !== 'ADMIN') {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <>
            <Outlet />
        </>
    )
}

export default AdminLayout
