import Modal from 'antd/es/modal/Modal'
import { ProductForm } from './ManageCategoryPage'
import React from 'react'
import { updateTagById } from '../../services/apiService'
interface IProps {
    isModalEditTagOpen: boolean
    setIsModalEditTagOpen: (value: boolean) => void
    FetchAllTag: () => void
    FetchAllProductTag: () => void
    navNameInput: string
    setNavNameInput: (value: string) => void
    navNameId: string
}
const ModalEditTag: React.FC<IProps> = ({
    isModalEditTagOpen,
    setIsModalEditTagOpen,
    FetchAllTag,
    FetchAllProductTag,
    navNameInput,
    setNavNameInput,
    navNameId
}) => {
    const handleEditTagOk = async () => {
        try {
            const res = await updateTagById(navNameId, {
                navName: navNameInput
            })
            if (res.EC == 0) {
                FetchAllTag()
                FetchAllProductTag()
            }
            setNavNameInput('')
            setIsModalEditTagOpen(false)
        } catch (error) {
            console.error('Error updating  tag:', error)
        }
    }
    let handleOnChangeNavName = (e: any) => {
        setNavNameInput(e.target.value)
    }
    const handleCancelEditTag = () => {
        setIsModalEditTagOpen(false)
    }
    return (
        <>
            <Modal
                title='Update The Tag'
                open={isModalEditTagOpen}
                onOk={handleEditTagOk}
                onCancel={handleCancelEditTag}
            >
                <section className='flex flex-col py-[10px]'>
                    <label className='text-xl font-semibold'>Product Tag Id:</label>
                    <div className='border-[black] p-[10px] border-[1px] rounded-md'>{navNameId}</div>
                </section>
                <section className='flex flex-col'>
                    <label className='text-xl font-semibold'>Tag Name: </label>
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
export default ModalEditTag
