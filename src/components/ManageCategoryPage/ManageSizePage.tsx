import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import { useEffect, useState } from 'react'

import ManageCreateSize from './ManageCreateSize'
import { getAllSize } from '../../services/sizeService'
import { getAllProductTag, getProductTag } from '../../services/apiService'

interface ISize {
    _id: string
    subnavName: string
    size: string[]
}
const ManageSizePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [size, setSize] = useState<ISize[]>([])
    const [productList, setProductList] = useState<string[]>([])
    useEffect(() => {
        fetchAllSize()
        fetchAllProduct()
    }, [])
    let fetchAllSize = async () => {
        let res = await getAllSize()
        console.log(res.data)

        if (res) {
            setSize(res.data)
        }
    }
    let fetchAllProduct = async () => {
        let res = await getAllProductTag()
        console.log(res.data)

        if (res.data.length > 0) {
            console.log('dat')
            let cloneArr = res.data.filter((value: any, index: any, self: any) => {
                return self.findIndex((item: any) => item.subnavName === value.subnavName) === index
            })

            setProductList(cloneArr)
        }
    }
    return (
        <>
            <div className={`productPageContainer px-[20px] py-[10px]`}>
                <HeaderManageProduct />
                <div className={`h-[50px] flex items-center justify-center`}>
                    <h2 className={`text-[25px]`}>Size Page</h2>
                </div>
                <button onClick={() => setIsModalOpen(true)}>Create</button>
                <ManageCreateSize productList={productList} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>
            {size.length > 0 &&
                size.map((item) => {
                    return (
                        <div>
                            {item.subnavName}
                            <div>
                                {item.size.length > 0 &&
                                    item.size.map((item1) => {
                                        return <li>{item1}</li>
                                    })}
                            </div>
                        </div>
                    )
                })}
        </>
    )
}

export default ManageSizePage
