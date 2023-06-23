import axios from '../utils/axiosCustomize.tsx'

const getTag = (id: string) => axios.get(`/api/get-tag?_id=${id}`)
const getAllTag = () => axios.get(`/api/get-all-tag`)

const updateTagById = (id: string, data: any) => axios.put(`/api/update-tag`, { _id: id, ...data })
const createNewTag = (data: { navName: string }) => axios.post(`/api/create-new-tag`, data)
const createNewProductTag = (data: { subnavName: string; list: string[]; navName: string }) =>
    axios.post(`/api/create-new-product-tag`, data)
const updateProductTag = (id: string, data: { subnavName: string; list: string[] }) =>
    axios.put(`/api/update-product-tag`, { _id: id, ...data })
const getProductTag = (data: { subnavName: string; navName: string }) => axios.post('/api/get-product-tag', data)

const getAllProductTag = () => axios.get(`/api/get-all-product-tag`)

export {
    getTag,
    getAllTag,
    updateTagById,
    createNewTag,
    createNewProductTag,
    updateProductTag,
    getProductTag,
    getAllProductTag
}
