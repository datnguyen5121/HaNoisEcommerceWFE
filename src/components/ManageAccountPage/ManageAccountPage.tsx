import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageAccountPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Dispatch, useEffect, useState } from 'react'
import { getAccounts, removeToManageAccount } from '../../redux/features/manageAccountSlice'
import { Button, Modal } from 'antd'
import { ErrorMessage, Field, Formik } from 'formik'
import { useLocation } from 'react-router-dom'
import { initialValues } from '../../type/initialValues'
import { validationSchema } from '../../type/validationSchema'
import { AccountValues } from '../../type/AccountValues'

type Props = {
    setAccount: Dispatch<React.SetStateAction<AccountValues[]>>
}

const ManageAccountPage = ({ setAccount }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { state } = useLocation()
    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const accountItems = useAppSelector((state) => state.manageAccount.accounts)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (accountItems.length <= 0) {
            dispatch(getAccounts())
        }
    }, [])
    const handleSubmit = (values: AccountValues) => {
        setAccount((product: any) => {
            let newProduct = [...product]
            const productIndex = newProduct.findIndex((product) => product._id === values._id)
            if (productIndex !== -1) {
                newProduct[productIndex] = values
            } else {
                newProduct = newProduct.concat({
                    ...values,
                    _id: product.length + 1
                })
            }
            return newProduct
        })
    }

    return (
        <div className={`productPageContainer px-[20px] py-[10px]`}>
            <HeaderManageProduct />
            <div className={`h-[50px] flex items-center justify-center`}>
                <h2 className={`text-[25px]`}>Product Page</h2>
            </div>
            <div className={`h-[50px] flex items-center justify-center`}>
                <input
                    className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                    type='text'
                    placeholder='Search Product'
                />
            </div>
            <div className={`mt-[30px] flex flex-col justify-center items-center`}>
                <div className='flex justify-start w-full mb-6'>
                    <Button className='bg-blue-500' type='primary' onClick={showModal}>
                        Create a new Account
                    </Button>
                    <Modal title='Create A New Account' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Formik<AccountValues>
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                            initialValues={state == null ? initialValues : state}
                        >
                            {(formik) => (
                                <form action='' onSubmit={formik.handleSubmit}>
                                    <div className={`my-2`}>
                                        <label htmlFor='productName' className='me-[10px] font-[700]'>
                                            Product Name
                                        </label>
                                        <Field
                                            as='input'
                                            name='productName'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage
                                            className={`${styles.error}`}
                                            name='productName'
                                            component='div'
                                        />
                                    </div>
                                    <div className={`my-2`}>
                                        <label htmlFor='description' className='me-[10px] font-[700]'>
                                            Description
                                        </label>
                                        <Field
                                            as='input'
                                            name='description'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage
                                            className={`${styles.error}`}
                                            name='description'
                                            component='div'
                                        />
                                    </div>
                                    <div className={`my-2`}>
                                        <label htmlFor='datePublish' className='me-[10px] font-[700]'>
                                            Date Publish
                                        </label>
                                        <Field
                                            as='input'
                                            name='datePublish'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage
                                            className={`${styles.error}`}
                                            name='datePublish'
                                            component='div'
                                        />
                                    </div>
                                    <div className={`my-2`}>
                                        <label htmlFor='category' className='me-[10px] font-[700]'>
                                            Category
                                        </label>
                                        <Field
                                            as='input'
                                            name='category'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='category' component='div' />
                                    </div>
                                    <div className={`my-2`}>
                                        <label htmlFor='size' className='me-[10px] font-[700]'>
                                            Size
                                        </label>
                                        <Field
                                            as='input'
                                            name='size'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='size' component='div' />
                                    </div>
                                    <div className={`my-2`}>
                                        <label htmlFor='imgUrl' className='me-[10px] font-[700]'>
                                            Image Url
                                        </label>
                                        <Field
                                            as='input'
                                            name='imgUrl'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='imgUrl' component='div' />
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </Modal>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Role ID</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                            <th>Feature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountItems.map((account, index) => (
                            <tr key={index}>
                                <td className='w-11'>{index + 1}</td>
                                <td className='w-36'>{account.email}</td>
                                <td className='w-40'>{account.password}</td>
                                <td className='w-28'>{account.firstName}</td>
                                <td className='w-32'>{account.lastName}</td>
                                <td className='w-12'>{account.address}</td>
                                <td className='w-40'>{account.gender}</td>
                                <td className='w-16'>{account.roleId}</td>
                                <td className='w-52'>{account.createdAt}</td>
                                <td className='w-52'>{account.updatedAt}</td>
                                <td className='w-36'>
                                    <div>
                                        <button className={`${styles.editBtn}`}>Edit</button>
                                        <button
                                            className={`${styles.deleteBtn}`}
                                            onClick={() => dispatch(removeToManageAccount(account._id))}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageAccountPage
