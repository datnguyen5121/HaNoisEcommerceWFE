import { Outlet } from 'react-router-dom'

function Category() {
    const show = false
    return (
        <>
            {show && <div>category</div>}
            <Outlet />
        </>
    )
}

export default Category
