import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageAccountPage.module.css'
import { useState } from 'react'
import { Button, Modal } from 'antd'
import { ErrorMessage, Field, Formik } from 'formik'
import { useLocation } from 'react-router-dom'
import { initialValues } from '../../type/initialValues'
import { AccountValues } from '../../type/AccountValues'
import { validationSchemaAccount } from '../../type/validationSchemaAccount'

const ManageAccountPage = () => {
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

    const handleSubmit = (values: AccountValues) => {
        console.log(values)
    }

    return (
        <div className={`productPageContainer px-[20px] py-[10px]`}>
            <HeaderManageProduct />
            <div className={`h-[50px] flex items-center justify-center`}>
                <h2 className={`text-[25px]`}>Account Page</h2>
            </div>
            <div className={`h-[50px] flex items-center justify-center`}>
                <input
                    className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                    type='text'
                    placeholder='Search Account'
                />
            </div>
            <div className={`mt-[30px] flex flex-col justify-center items-center`}>
                <div className='flex justify-start w-full mb-6'>
                    <Button className='bg-blue-500' type='primary' onClick={showModal}>
                        Create a New Account
                    </Button>
                    <Modal
                        className='text-center'
                        title='Create A New Account'
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <div className='flex justify-center items-center'>
                            <Formik<AccountValues>
                                onSubmit={handleSubmit}
                                validationSchema={validationSchemaAccount}
                                initialValues={state == null ? initialValues : state}
                            >
                                {(formik) => (
                                    <form action='' onSubmit={formik.handleSubmit}>
                                        <div className={`my-2 grid`}>
                                            <label htmlFor='email' className='me-[10px] font-[700]'>
                                                Email
                                            </label>
                                            <Field
                                                as='input'
                                                name='email'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='email' component='div' />
                                        </div>
                                        <div className={`my-2 grid`}>
                                            <label htmlFor='password' className='me-[10px] font-[700]'>
                                                Password
                                            </label>
                                            <Field
                                                as='input'
                                                name='password'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='password'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-2 grid`}>
                                            <label htmlFor='firstName' className='me-[10px] font-[700]'>
                                                First Name
                                            </label>
                                            <Field
                                                as='input'
                                                name='firstName'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='firstName'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-2 grid`}>
                                            <label htmlFor='lastName' className='me-[10px] font-[700]'>
                                                Last Name
                                            </label>
                                            <Field
                                                as='input'
                                                name='lastName'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='lastName'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-2 grid`}>
                                            <label htmlFor='address' className='me-[10px] font-[700]'>
                                                Address
                                            </label>
                                            <Field
                                                as='input'
                                                name='address'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='address'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-2 grid`}>
                                            <label htmlFor='gender' className='me-[10px] font-[700]'>
                                                Gender
                                            </label>
                                            <Field
                                                as='input'
                                                name='gender'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='gender' component='div' />
                                        </div>
                                        <div className={`my-2 grid`}>
                                            <label htmlFor='roleId' className='me-[10px] font-[700]'>
                                                Role
                                            </label>
                                            <Field
                                                as='input'
                                                name='roleId'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='roleId' component='div' />
                                        </div>
                                        <div className={`my-2 grid`}>
                                            <label htmlFor='createdAt' className='me-[10px] font-[700]'>
                                                Created At
                                            </label>
                                            <Field
                                                as='input'
                                                name='createdAt'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='createdAt'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-2 grid`}>
                                            <label htmlFor='updatedAt' className='me-[10px] font-[700]'>
                                                Updated At
                                            </label>
                                            <Field
                                                as='input'
                                                name='updatedAt'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='updatedAt'
                                                component='div'
                                            />
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
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
                        {/* {accountItems.map((account: any, index: any) => (
                            <tr key={index}>
                                <td className='w-11'>{index + 1}</td>
                                <td className='w-36'>{account.email}</td>
                                <td className='w-36 break-all'>{account.password}</td>
                                <td className='w-28'>{account.firstName}</td>
                                <td className='w-20'>{account.lastName}</td>
                                <td className='w-28'>{account.address}</td>
                                <td className='w-16'>{account.gender}</td>
                                <td className='w-16'>{account.roleId}</td>
                                <td className='w-36'>{account.createdAt}</td>
                                <td className='w-36'>{account.updatedAt}</td>
                                <td className='w-28'>
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
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageAccountPage
