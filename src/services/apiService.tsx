import axios from '../utils/axiosCustomize.tsx'
import { AxiosResponse } from 'axios'
interface Response {
    EC: number
    EM: string
    // Các thuộc tính khác trong đối tượng kết quả
}
const getTag = (id: string) => axios.get(`/api/get-tag?_id=${id}`)

const getAllTag = () => axios.get(`/api/get-all-tag`)

const getAllTagAdmin = () => axios.get(`/api/get-all-tag-admin`)

const updateTagById = (id: string, data: any): Promise<AxiosResponse<Response>['data']> =>
    axios.put(`/api/update-tag`, { _id: id, ...data })

const createNewTag = (data: { navName: string }): Promise<AxiosResponse<Response>['data']> =>
    axios.post(`/api/create-new-tag`, data)

const deleteTag = (data: { _id: string }): Promise<AxiosResponse<Response>['data']> =>
    axios.delete(`/api/delete-tag`, { data })

const createNewProductTag = (data: { subnavName: string; list: string[]; navName: string }) =>
    axios.post(`/api/create-new-product-tag`, data)

const updateProductTag = (id: string, data: { subnavName: string; list: string[] }) =>
    axios.put(`/api/update-product-tag`, { _id: id, ...data })

const getProductTag = (data: { subnavName: string; navName: string }) => axios.post('/api/get-product-tag', data)

const getAllProductTag = () => axios.get(`/api/get-all-product-tag`)

const deleteProductTag = (data: { _id: string }): Promise<AxiosResponse<Response>['data']> =>
    axios.delete(`/api/delete-product-tag`, { data })

export {
    getTag,
    getAllTag,
    updateTagById,
    createNewTag,
    deleteTag,
    deleteProductTag,
    createNewProductTag,
    updateProductTag,
    getProductTag,
    getAllProductTag,
    getAllTagAdmin
}
