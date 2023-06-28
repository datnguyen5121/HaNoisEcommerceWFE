import axios from '../utils/axiosCustomize.tsx'
import { AxiosResponse } from 'axios'
interface Response {
    EC: number
    EM: string
    // Các thuộc tính khác trong đối tượng kết quả
}

const updateUserById = (id: string, data: any): Promise<AxiosResponse<Response>['data']> =>
    axios.put(`/api/update-user-by-id`, { _id: id, ...data })

export { updateUserById }
