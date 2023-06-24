import axios from '../utils/axiosCustomize.tsx'
interface newProduct {
    tagName: string
    productTag: string
    title: string
    description: string
    datePublish: string
    category: string[]
    size: string[]
    imgUrl: {}
    price: number
}
const createNewProduct = (product: newProduct) => axios.post('/api/create-new-product', product)
export { createNewProduct }
