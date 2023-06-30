import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageAccountPage.module.css'
import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useLocation } from 'react-router-dom'
import { AccountValues } from '../../type/AccountValues'
import { validationSchemaAccount } from '../../type/validationSchemaAccount'
import { initialAccountValues } from '../../type/initialAccountValues'
import axios from '../../utils/axiosCustomize.tsx'
import { toast } from 'react-toastify'

const ManageAccountPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [accounts, setAccounts] = useState<any[]>([])
    const { state } = useLocation()
    const [autoFieldAccount, setAutoFieldAccount] = useState<AccountValues>({} as AccountValues)
    let [accountId, setAccountId] = useState('')
    const showModal = () => {
        setIsModalOpen(true)
    }
    const showModalUpdate = () => {
        setIsModalUpdateOpen(true)
    }
    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleSubmit = async (values: any) => {
        let data = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            gender: values.gender,
            phone: values.phone,
            roleId: values.roleId
        }
        try {
            const response = await axios.post('/api/create-new-user', data)
            if (response.data) {
                handleCancel()
                toast('Create account successfully')
            }
            setIsModalOpen(false)
            const getAccount = await axios.get('/api/get-all-user')
            setAccounts(getAccount.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdate = async (accountId: string, values: any) => {
        let data = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            gender: values.gender,
            phone: values.phone,
            roleId: values.roleId
        }
        try {
            await axios.put('/api/update-user-by-id', { _id: accountId, ...data })
            const response = await axios.get('/api/get-all-user')
            if (response.data) {
                handleCancelUpdate()
                toast('Update account successfully')
            }
            setAccounts(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const accountsData = async () => {
        try {
            const response = await axios.get('/api/get-all-user')
            setAccounts(response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        accountsData()
    }, [])
    const deleteAccount = async (accountId: string) => {
        try {
            if (confirm('Do you want to delete account')) {
                await axios.delete(`/api/delete-user-by-id/?_id=${accountId}`)
            }
            const response = await axios.get('/api/get-all-user')
            setAccounts(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const updateAccount = (id: string, values: any) => {
        setAccountId(id)

        let data = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            gender: values.gender,
            phone: values.phone,
            roleId: values.roleId
        }
        setAutoFieldAccount(data)
        showModalUpdate()
    }

    return (
        <div className={`productPageContainer px-[20px] py-[10px]`}>
            <HeaderManageProduct />
            <div className={`h-[50px] flex items-center justify-center`}>
                <h2 className={`text-[25px]`}>Account Page</h2>
            </div>
            <div className={`h-[50px] flex items-center justify-center`}>
                <input
                    className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                    type='text'
                    placeholder='Search Account'
                />
            </div>
            <div className={`mt-[30px] flex flex-col justify-center items-center`}>
                <div className='flex justify-start w-full gap-3 mb-6'>
                    <Button className='bg-blue-500' type='primary' onClick={showModal}>
                        Create a New Account
                    </Button>
                    <Modal
                        className=''
                        title='Create A New Account'
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Formik<AccountValues>
                            onSubmit={handleSubmit}
                            validationSchema={validationSchemaAccount}
                            initialValues={state == null ? initialAccountValues : state}
                            enableReinitialize={false}
                        >
                            {(formik) => (
                                <Form onSubmit={formik.handleSubmit}>
                                    <div className={`my-[0.8rem] grid`}>
                                        <label htmlFor='email' className='mb-[0.2rem] font-[700]'>
                                            Email
                                        </label>
                                        <Field
                                            as='input'
                                            name='email'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='email' component='div' />
                                    </div>
                                    <div className={`my-[0.8rem] grid`}>
                                        <label htmlFor='password' className='mb-[0.2rem] font-[700]'>
                                            Password
                                        </label>
                                        <Field
                                            as='input'
                                            name='password'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='password' component='div' />
                                    </div>
                                    <div className={`my-[0.8rem] grid`}>
                                        <label htmlFor='firstName' className='mb-[0.2rem] font-[700]'>
                                            First Name
                                        </label>
                                        <Field
                                            as='input'
                                            name='firstName'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='firstName' component='div' />
                                    </div>
                                    <div className={`my-[0.8rem] grid`}>
                                        <label htmlFor='lastName' className='mb-[0.2rem] font-[700]'>
                                            Last Name
                                        </label>
                                        <Field
                                            as='input'
                                            name='lastName'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='lastName' component='div' />
                                    </div>
                                    <div className={`my-[0.8rem] grid`}>
                                        <label htmlFor='address' className='mb-[0.2rem] font-[700]'>
                                            Address
                                        </label>
                                        <Field
                                            as='input'
                                            name='address'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='address' component='div' />
                                    </div>
                                    <div className={`my-[0.8rem] grid`}>
                                        <label htmlFor='gender' className='me-[10px] font-[700]'>
                                            Gender
                                        </label>
                                        <Field
                                            as='select'
                                            name='gender'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        >
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                            <option value='other'>Other</option>
                                        </Field>
                                        <ErrorMessage className={`${styles.error}`} name='gender' component='div' />
                                    </div>
                                    <div className={`my-[0.8rem] grid`}>
                                        <label htmlFor='phone' className='mb-[0.2rem] font-[700]'>
                                            Phone
                                        </label>
                                        <Field
                                            as='input'
                                            name='phone'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='phone' component='div' />
                                    </div>
                                    <div className={`my-[0.8rem] grid`}>
                                        <label htmlFor='roleId' className='mb-[0.2rem] font-[700]'>
                                            Role
                                        </label>
                                        <Field
                                            as='select'
                                            name='roleId'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        >
                                            <option value='USER'>USER</option>
                                            <option value='ADMIN'>ADMIN</option>
                                        </Field>
                                        <ErrorMessage className={`${styles.error}`} name='roleId' component='div' />
                                    </div>
                                    <div>
                                        <button
                                            type='submit'
                                            className='bg-blue-500 text-white px-[0.8rem] py-[0.4rem] rounded-md hover:bg-sky-600'
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal>
                    <Modal
                        className='text-center'
                        title='Update Account'
                        open={isModalUpdateOpen}
                        onCancel={handleCancelUpdate}
                        footer={null}
                    >
                        <Formik<AccountValues>
                            onSubmit={(values) => handleUpdate(accountId, values)}
                            validationSchema={validationSchemaAccount}
                            initialValues={autoFieldAccount}
                            enableReinitialize={true}
                        >
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <div className={`my-[0.6rem] grid`}>
                                        <label htmlFor='email' className='me-[10px] font-[700]'>
                                            Email
                                        </label>
                                        <Field
                                            as='input'
                                            name='email'
                                            value={values.email}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setFieldValue('email', e.target.value)
                                            }
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='email' component='div' />
                                    </div>
                                    <div className={`my-[0.6rem] grid`}>
                                        <label htmlFor='password' className='me-[10px] font-[700]'>
                                            Password
                                        </label>
                                        <Field
                                            as='input'
                                            name='password'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='password' component='div' />
                                    </div>
                                    <div className={`my-[0.6rem] grid`}>
                                        <label htmlFor='firstName' className='me-[10px] font-[700]'>
                                            First Name
                                        </label>
                                        <Field
                                            as='input'
                                            name='firstName'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='firstName' component='div' />
                                    </div>
                                    <div className={`my-[0.6rem] grid`}>
                                        <label htmlFor='lastName' className='me-[10px] font-[700]'>
                                            Last Name
                                        </label>
                                        <Field
                                            as='input'
                                            name='lastName'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='lastName' component='div' />
                                    </div>
                                    <div className={`my-[0.6rem] grid`}>
                                        <label htmlFor='address' className='me-[10px] font-[700]'>
                                            Address
                                        </label>
                                        <Field
                                            as='input'
                                            name='address'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='address' component='div' />
                                    </div>
                                    <div className={`my-[0.6rem] grid`}>
                                        <label htmlFor='gender' className='me-[10px] font-[700]'>
                                            Gender
                                        </label>
                                        <Field
                                            as='select'
                                            name='gender'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        >
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                            <option value='other'>Other</option>
                                        </Field>
                                        <ErrorMessage className={`${styles.error}`} name='gender' component='div' />
                                    </div>
                                    <div className={`my-[0.6rem] grid`}>
                                        <label htmlFor='phone' className='me-[10px] font-[700]'>
                                            Phone
                                        </label>
                                        <Field
                                            as='input'
                                            name='phone'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='phone' component='div' />
                                    </div>
                                    <div className={`my-[0.6rem] grid`}>
                                        <label htmlFor='roleId' className='me-[10px] font-[700]'>
                                            Role
                                        </label>
                                        <Field
                                            as='input'
                                            name='roleId'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-full px-[10px] py-[5px]`}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='roleId' component='div' />
                                    </div>
                                    <div>
                                        <button
                                            type='submit'
                                            className='bg-blue-500 text-white px-[0.8rem] py-[0.4rem] rounded-md hover:bg-sky-600'
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
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
                            <th>Phone</th>
                            <th>Role ID</th>
                            <th>Feature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account: any, index: number) => (
                            <tr key={index}>
                                <td className='w-11'>{index + 1}</td>
                                <td className='w-36'>{account.email}</td>
                                <td className='w-36 break-all'>{account.password}</td>
                                <td className='w-28'>{account.firstName}</td>
                                <td className='w-20'>{account.lastName}</td>
                                <td className='w-28'>{account.address}</td>
                                <td className='w-16'>{account.gender}</td>
                                <td className='w-16'>{account.phone}</td>
                                <td className='w-16'>{account.roleId}</td>
                                <td className='w-24'>
                                    <div className='button-container'>
                                        <button
                                            className={`${styles.editBtn}`}
                                            onClick={() => {
                                                updateAccount(account._id, account)
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={`${styles.deleteBtn}`}
                                            onClick={() => {
                                                deleteAccount(account._id)
                                            }}
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
