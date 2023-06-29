import Modal from 'antd/es/modal/Modal'
import { useState } from 'react'
import { createNewSize, updateSize } from '../../services/sizeService'
interface ISize {
    sizeId: string
    sizeItem: string[]
    setSizeItem: (values: string[]) => void
    sizeName: string
    isModalOpenEdit: boolean
    setIsModalOpenEdit: (values: boolean) => void
}
const ManageEditSize: React.FC<ISize> = ({
    setSizeItem,
    sizeName,
    sizeId,
    sizeItem,
    isModalOpenEdit,
    setIsModalOpenEdit
}) => {
    const [sizeInput, setSizeInput] = useState<string>('')

    const handleCancel = () => {
        setIsModalOpenEdit(false)
    }

    let handleAddList = (values: string) => {
        let cloneList = [...sizeItem, values]
        setSizeItem(cloneList)
        setSizeInput('')
    }
    let handleDeleteSize = (item: string, index: number) => {
        const updatedList = sizeItem.filter((_, i) => i !== index)
        setSizeItem(updatedList)
    }
    const handleUpdate = async () => {
        let res = await updateSize(sizeName, sizeItem)

        setIsModalOpenEdit(false)
    }
    let handleChangeSizeInput = (e: any) => {
        setSizeInput(e.target.value)
    }

    return (
        <>
            <Modal title='Edit Size' footer={null} open={isModalOpenEdit} onCancel={handleCancel}>
                <label className='text-xl'>The size of product: </label>
                <label className='text-2xl'> {sizeName}</label>
                <section className='flex flex-col text-md py-[10px]'>
                    <label>Please add size for product:</label>
                </section>

                <section className=' '>
                    <section className='flex justify-between'>
                        <input
                            className='border-[black] p-[10px] w-[80%] border-[1px] rounded-md'
                            onChange={handleChangeSizeInput}
                            value={sizeInput}
                        ></input>
                        <button
                            className=' border-[1px] text-white p-[10px] hover:opacity-25 rounded-md bg-black'
                            onClick={() => {
                                handleAddList(sizeInput)
                            }}
                        >
                            Add
                        </button>
                    </section>

                    <section className=' py-[10px] gap-[10px] flex flex-col'>
                        {sizeItem.length >= 0 &&
                            sizeItem.map((item: any, index: any) => {
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
                <button
                    className='bg-blue-600 w-[4.6rem] hover:opacity-50 h-[1.8rem] text-white rounded-md'
                    onClick={handleUpdate}
                >
                    Submit
                </button>
            </Modal>
        </>
    )
}
export default ManageEditSize
