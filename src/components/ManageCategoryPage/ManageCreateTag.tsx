import Modal from 'antd/es/modal/Modal'
import { ProductForm } from './ManageCategoryPage'
import React from 'react'
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
            <Modal
                title='Create New Tag'
                open={isModalCreateTagOpen}
                onOk={handleCreateTagOk}
                onCancel={handleCancelEditTag}
            >
                <section className='flex flex-col gap-[10px]'>
                    <label className='text-lg font-semibold'>Tag Name:</label>
                    <input
                        className='border-[black] p-[10px] border-[1px] rounded-md'
                        value={navNameInput}
                        placeholder='Please enter input...'
                        onChange={handleOnChangeNavName}
                    ></input>
                </section>
            </Modal>
        </>
    )
}
export default ModalCreateTag
