import Modal from 'antd/es/modal/Modal'
import { ProductForm } from './ManageCategoryPage'
import React from 'react'
import { createNewProductTag } from '../../services/apiService'
interface IProps {
    isModalCreateOpen: boolean
    setIsModalCreateOpen: (value: boolean) => void
    handleCancelCreate: () => void
    subnavNameInput: string
    navNameId: string
    productForm: ProductForm
    categoryInput: string
    subnavNameListInput: string[]
    setSubNavNameListInput: (value: string[]) => void
    setSubNavNameInput: (value: string) => void
    setCategoryInput: (value: string) => void
    FetchAllProductTag: () => void
}
const ModalCreateProductTag: React.FC<IProps> = ({
    isModalCreateOpen,
    setIsModalCreateOpen,
    handleCancelCreate,
    subnavNameInput,
    navNameId,
    categoryInput,
    subnavNameListInput,
    setSubNavNameListInput,
    setSubNavNameInput,
    setCategoryInput,
    FetchAllProductTag
}) => {
    let handleOnChangeSubNavName = (e: any) => {
        setSubNavNameInput(e.target.value)
    }
    let handleChangeCategoryInput = (e: any) => {
        setCategoryInput(e.target.value)
    }
    let handleAddList = (values: string) => {
        let cloneList = [...subnavNameListInput, values]
        setSubNavNameListInput(cloneList)
        setCategoryInput('')
    }
    let handleDeleteCategory = (item: string, index: number) => {
        const updatedList = subnavNameListInput.filter((_, i) => i !== index)
        setSubNavNameListInput(updatedList)
    }
    const handleCreateOk = async () => {
        try {
            const res = await createNewProductTag({
                subnavName: subnavNameInput,
                list: subnavNameListInput,
                navName: navNameId
            })
            FetchAllProductTag()
            setIsModalCreateOpen(false)
        } catch (error) {
            console.error('Error Create product tag:', error)
        }
    }
    return (
        <>
            <Modal title={`Create Product Tag `} open={isModalCreateOpen} footer={null} onCancel={handleCancelCreate}>
                <section className='flex flex-col'>
                    <label className='text-xl font-semibold'>Product Type</label>
                    <input
                        className='border-[black] w-[80%] p-[10px] border-[1px] rounded-md'
                        value={subnavNameInput}
                        onChange={handleOnChangeSubNavName}
                    ></input>
                </section>
                <section className='flex flex-col'>
                    <label className='text-xl font-semibold'>Tag ID</label>
                    <div className='border-[black] w-[80%] p-[10px] border-[1px] rounded-md'>{navNameId}</div>
                </section>

                <section className='flex flex-col'>
                    <label className='text-xl font-semibold'>Category List</label>
                </section>
                <section className='flex justify-between'>
                    <input
                        placeholder='Please enter category...'
                        className='border-[black] w-[80%] p-[10px] border-[1px] rounded-md'
                        type='text'
                        name=''
                        id=''
                        value={categoryInput}
                        onChange={handleChangeCategoryInput}
                    ></input>
                    <button
                        className=' border-[1px] text-white p-[10px] hover:opacity-25 rounded-md bg-black'
                        onClick={() => {
                            handleAddList(categoryInput)
                        }}
                    >
                        Add
                    </button>
                </section>

                <section className=' py-[10px] gap-[10px] flex flex-col'>
                    {subnavNameListInput.length >= 0 &&
                        subnavNameListInput.map((item, index) => {
                            return (
                                <div className='flex justify-between gap-[50px]' key={index}>
                                    <span className='text-xl'>{item} </span>
                                    <button
                                        className='border-[1px] w-[50px] hover:opacity-30 p-[10px] text-red-500 rounded-lg'
                                        onClick={() => handleDeleteCategory(item, index)}
                                    >
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                </div>
                            )
                        })}
                </section>
                <div className='flex justify-end'>
                    <button
                        className=' bg-blue-600 w-[4.6rem]  mt-5 hover:opacity-50 h-[1.8rem] text-white rounded-md'
                        onClick={handleCreateOk}
                    >
                        Submit
                    </button>
                </div>
            </Modal>
        </>
    )
}
export default ModalCreateProductTag
