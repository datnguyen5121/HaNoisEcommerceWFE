import Modal from 'antd/es/modal/Modal'
import { ProductForm } from './ManageCategoryPage'
import React from 'react'
import { toast } from 'react-toastify'

import { createNewTag, updateTagById } from '../../services/apiService'
interface IProps {
    isModalCreateTagOpen: boolean
    setIsModalCreateTagOpen: (value: boolean) => void
    FetchAllTag: () => void
    FetchAllProductTag: () => void
    navNameInput: string
    setNavNameInput: (value: string) => void
}
const ModalCreateTag: React.FC<IProps> = ({
    isModalCreateTagOpen,
    setIsModalCreateTagOpen,
    FetchAllTag,
    FetchAllProductTag,
    navNameInput,
    setNavNameInput
}) => {
    const handleCreateTagOk = async () => {
        try {
            const res = await createNewTag({
                navName: navNameInput
            })
            if (res) {
                toast.success('Update New Product Success !')
            } else {
                toast.error('Update failed !')
            }
            if (res.EC == 0) {
                FetchAllTag()
                FetchAllProductTag()
            }
            setIsModalCreateTagOpen(false)
        } catch (error) {
            console.error('Error updating  tag:', error)
        }
    }
    let handleOnChangeNavName = (e: any) => {
        setNavNameInput(e.target.value)
    }
    const handleCancelEditTag = () => {
        setIsModalCreateTagOpen(false)
    }
    return (
        <>
            <Modal title='Create New Tag' open={isModalCreateTagOpen} footer={true} onCancel={handleCancelEditTag}>
                <section className='flex flex-col gap-[10px]'>
                    <label className='text-lg font-semibold'>Tag Name:</label>
                    <input
                        className='border-[black] p-[10px] border-[1px] rounded-md'
                        value={navNameInput}
                        placeholder='Please enter input...'
                        onChange={handleOnChangeNavName}
                    ></input>
                </section>

                <div className='flex justify-end'>
                    <button
                        className=' bg-blue-600 w-[4.6rem]  mt-5 hover:opacity-50 h-[1.8rem] text-white rounded-md'
                        onClick={handleCreateTagOk}
                    >
                        Submit
                    </button>
                </div>
            </Modal>
        </>
    )
}
export default ModalCreateTag
