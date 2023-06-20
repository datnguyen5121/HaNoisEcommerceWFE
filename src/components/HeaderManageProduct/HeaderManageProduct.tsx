import { NavLink } from 'react-router-dom'

const HeaderManageProduct = () => {
    return (
        <div className={`h-[40px] flex items-center font-bold gap-2`}>
            <NavLink to='/admin/account'>Account</NavLink>
            <NavLink to='/admin/product'>Product</NavLink>
        </div>
    )
}

export default HeaderManageProduct
