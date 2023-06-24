import Modal from 'antd/es/modal/Modal'
import { ProductForm } from './ManageCategoryPage'
import React from 'react'
import { updateProductTag } from '../../services/apiService'
interface IProps {
    isModalEditOpen: boolean
    setIsModalEditOpen: (value: boolean) => void
    handleCancelEdit: () => void
    subnavNameInput: string
    productForm: ProductForm
    categoryInput: string
    subnavNameListInput: string[]
    setSubNavNameListInput: (value: string[]) => void
    setSubNavNameInput: (value: string) => void
    setCategoryInput: (value: string) => void
    FetchAllProductTag: () => void
}
const ModalEditProductTag: React.FC<IProps> = ({
    isModalEditOpen,
    setIsModalEditOpen,
    handleCancelEdit,
    subnavNameInput,
    FetchAllProductTag,
    productForm,
    categoryInput,
    subnavNameListInput,
    setSubNavNameListInput,
    setSubNavNameInput,
    setCategoryInput
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
    const handleEditOk = async () => {
        try {
            const res = await updateProductTag(productForm.subnavNameId, {
                subnavName: subnavNameInput,
                list: subnavNameListInput
            })
            FetchAllProductTag()
            setSubNavNameInput('')
            setSubNavNameListInput([])
            setIsModalEditOpen(false)
        } catch (error) {
            console.error('Error updating product tag:', error)
        }
    }
    return (
        <>
            <Modal
                title='Update The Product Tag'
                open={isModalEditOpen}
                onOk={handleEditOk}
                onCancel={handleCancelEdit}
            >
                <section className='flex flex-col'>
                    <label className=''>Product Tag Name</label>
                    <input
                        className='border-[black] p-[10px] border-[1px] rounded-md'
                        value={subnavNameInput}
                        onChange={handleOnChangeSubNavName}
                    ></input>
                </section>
                <section className='flex flex-col'>
                    <label>Product Tag Name Id</label>
                    <div className='border-[black] p-[10px] border-[1px] rounded-md'>{productForm.subnavNameId}</div>
                </section>
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
            </Modal>
        </>
    )
}
export default ModalEditProductTag
