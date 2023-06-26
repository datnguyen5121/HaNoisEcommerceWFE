import axios from '../utils/axiosCustomize.tsx'
interface newProduct {
    tagName: string
    productTag: string
    title: string
    description: string
    datePublish: string
    category: string[]
    size: string[]
    imgUrl: FileList | null
    price: number
}
const createNewProduct = (product: newProduct) => axios.post('/api/create-new-product', product)

const getProductByGenderCategory = (gender: string, productName: string, category: string) =>
    axios.get(`/api/get-product-by-gender-category?category=${category}&gender=${gender}&productName=${productName}`)

export { createNewProduct, getProductByGenderCategory }
