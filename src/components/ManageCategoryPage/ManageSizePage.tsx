import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import { useEffect, useState } from 'react'
import axios from '../../utils/axiosCustomize.tsx'
import ManageCreateSize from './ManageCreateSize'
import { getAllSize } from '../../services/sizeService'
import { getAllProductTag, getProductTag } from '../../services/apiService'
import ManageEditSize from './ModalEditSize.tsx'
interface ISize {
    _id: string
    subnavName: string
    size: string[]
}
const ManageSizePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
    const [size, setSize] = useState<ISize[]>([])
    const [productList, setProductList] = useState<string[]>([])
    const [sizeId, setSizeId] = useState('')
    const [sizeItem, setSizeItem] = useState<string[]>([])
    const [sizeName, setSizeName] = useState('')
    useEffect(() => {
        fetchAllSize()
        fetchAllProduct()
    }, [])
    let fetchAllSize = async () => {
        let res = await getAllSize()

        if (res) {
            setSize(res.data)
        }
    }
    let fetchAllProduct = async () => {
        let res = await getAllProductTag()

        if (res.data.length > 0) {
            let cloneArr = res.data.filter((value: any, index: any, self: any) => {
                return self.findIndex((item: any) => item.subnavName === value.subnavName) === index
            })

            setProductList(cloneArr)
        }
    }
    let handleEditSize = (item: any) => {
        setSizeItem(item.size)
        setSizeId(item._id)
        setSizeName(item.subnavName)
        setIsModalOpenEdit(true)
        fetchAllSize()
    }
    let handleDeleteSize = async (id: string) => {
        if (confirm('Delete this size')) {
            let data = { _id: id }
            await axios.delete('/api/delete-size', { data })
            fetchAllSize()
        }
    }
    return (
        <>
            <section className='px-5'>
                <div className={`productPageContainer px-[20px] py-[10px]   `}>
                    <HeaderManageProduct />
                    <div className={`h-[50px] flex items-center justify-center`}>
                        <h2 className={`text-[25px]`}>Size Page</h2>
                    </div>
                    <button
                        className='border-[1px] w-[50px] p-[10px] hover:opacity-50 text-blue-500 rounded-lg'
                        onClick={() => setIsModalOpen(true)}
                    >
                        <i className='fa-solid fa-plus'></i>
                    </button>

                    <ManageCreateSize
                        productList={productList}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                    <ManageEditSize
                        sizeName={sizeName}
                        setSizeItem={setSizeItem}
                        sizeId={sizeId}
                        sizeItem={sizeItem}
                        isModalOpenEdit={isModalOpenEdit}
                        setIsModalOpenEdit={setIsModalOpenEdit}
                    />
                </div>
                {size.length > 0 &&
                    size.map((item, index) => {
                        return (
                            <div className='p-3 mb-3 border-t rounded-lg shadow-md' key={index}>
                                <section className='flex gap-5 items-center pt-[20px]'>
                                    <span className='font-semibold'>{item.subnavName}</span>
                                    <button
                                        className='border-[1px] w-[50px] p-[10px] hover:opacity-50 text-green-500 rounded-lg'
                                        onClick={() => handleEditSize(item)}
                                    >
                                        <i className='fa-solid fa-pen-to-square'></i>
                                    </button>
                                    <button
                                        className='border-[1px] w-[50px] p-[10px] hover:opacity-50 text-red-500 rounded-lg'
                                        onClick={() => {
                                            handleDeleteSize(item._id)
                                        }}
                                    >
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                </section>

                                <div className='flex flex-wrap  gap-[20px] my-[20px]'>
                                    {item.size.length > 0 &&
                                        item.size.map((item1, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className='inline-block border-[1px] w-[50px] text-center p-[10px] hover:opacity-50 text-black-500 rounded-lg'
                                                >
                                                    {item1}
                                                </li>
                                            )
                                        })}
                                </div>
                            </div>
                        )
                    })}
            </section>
        </>
    )
}

export default ManageSizePage
