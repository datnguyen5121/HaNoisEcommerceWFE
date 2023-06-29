import axios from '../utils/axiosCustomize'
const getAllSize = () => axios.get(`api/get-all-size`)

const createNewSize = (subnavName: string, size: string[]) =>
    axios.post(`/api/create-new-size`, { subnavName: subnavName, size: size })

const deleteSizeById = () => axios.get(`/api/delete-size`)

const updateSize = (subnavName: string, size: string[]) =>
    axios.put(`/api/update-size`, { subnavName: subnavName, size: size })

export { getAllSize, createNewSize, updateSize, deleteSizeById }
