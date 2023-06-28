import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getProductByGenderCategory } from '../services/productService'
import { ProductValues } from '../type/ProductValues'

const useProductList = () => {
    const [productList, setProductList] = useState<ProductValues[]>([])
    const location = useLocation()
    const [gender, category, subCategory] = location.pathname.split('/').filter((item) => item !== '')

    const handleFetchProduct = async () => {
        const res = await getProductByGenderCategory(gender, category, subCategory)
        setProductList(res.data)
    }

    useEffect(() => {
        handleFetchProduct()
    }, [location])

    return { productList, setProductList }
}

export default useProductList
