import Modal from 'antd/es/modal/Modal'
import { useState } from 'react'
import { createNewSize } from '../../services/sizeService'
interface ISize {
    productList: any
    isModalOpen: boolean
    setIsModalOpen: (values: boolean) => void
}
const ManageCreateSize: React.FC<ISize> = ({ productList, isModalOpen, setIsModalOpen }) => {
    const [sizeInput, setSizeInput] = useState<string>('')
    const [sizeList, setSizeList] = useState<string[]>([])
    const [product, setProduct] = useState<string>('')
    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleProduct = (e: any) => {
        setProduct(e.target.value)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    let handleChangeSizeInput = (e: any) => {
        setSizeInput(e.target.value)
    }
    let handleAddList = (values: string) => {
        let cloneList = [...sizeList, values]
        setSizeList(cloneList)
        setSizeInput('')
    }
    let handleDeleteSize = (item: string, index: number) => {
        const updatedList = sizeList.filter((_, i) => i !== index)
        setSizeList(updatedList)
    }
    const handleCreate = async () => {
        let res = await createNewSize(product, sizeList)
        setIsModalOpen(false)
    }
    return (
        <>
            <Modal title='Create Size' open={isModalOpen} onOk={handleCreate} onCancel={handleCancel}>
                <select onChange={handleProduct}>
                    <option value=''>---Choose product</option>
                    {productList.length > 0 &&
                        productList.map((item: any) => {
                            return <option value={item.subnavName}>{item.subnavName}</option>
                        })}
                </select>
                <section className='flex flex-col'>
                    <label>List Category</label>
                </section>

                <section className='flex justify-between'>
                    <input
                        className='border-[black] w-[80%] p-[10px] border-[1px] rounded-md'
                        type='text'
                        placeholder='Please enter category...'
                        name=''
                        id=''
                        value={sizeInput}
                        onChange={handleChangeSizeInput}
                    ></input>
                    <button
                        className=' border-[1px] text-white p-[10px] hover:opacity-25 rounded-md bg-black'
                        onClick={() => {
                            handleAddList(sizeInput)
                        }}
                    >
                        Add
                    </button>

                    <section className=' py-[10px] gap-[10px] flex flex-col'>
                        {sizeList.length >= 0 &&
                            sizeList.map((item, index) => {
                                return (
                                    <div className='flex justify-between gap-[50px]' key={index}>
                                        <span className='text-xl'>{item} </span>
                                        <button
                                            className='border-[1px] w-[50px] hover:opacity-30 p-[10px] text-red-500 rounded-lg'
                                            onClick={() => handleDeleteSize(item, index)}
                                        >
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </div>
                                )
                            })}
                    </section>
                </section>
            </Modal>
        </>
    )
}
export default ManageCreateSize
