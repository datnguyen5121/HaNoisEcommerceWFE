import { NavLink, Link } from 'react-router-dom'

const HeaderManageProduct = () => {
    return (
        <div className={`h-[40px] flex items-center justify-between font-bold gap-2`}>
            <div>
                <NavLink className={`me-[10px]`} to='/admin/account'>
                    Account
                </NavLink>
                <NavLink className={`ms-[10px]`} to='/admin/product'>
                    Product
                </NavLink>
                <NavLink className={`ms-[10px]`} to='/admin/category'>
                    Category
                </NavLink>
                <NavLink className={`ms-[10px]`} to='/admin/size'>
                    Size
                </NavLink>
            </div>
            <Link to='/'>
                <i className='fa-solid fa-house'></i>
            </Link>
        </div>
    )
}

export default HeaderManageProduct
