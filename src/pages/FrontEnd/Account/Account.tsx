import { Field, Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { RootState } from '../../../redux/store'
import { updateUserById } from '../../../services/userService'
import { updateUser } from '../../../redux/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
interface IUserInfo {
    address: string
    createAt: string
    email: string
    firstName: string
    gender: string
    lastName: string
    password: string
    phone: string
    roleId: string
    updateAt: string
    __v: number
    _id: string
}
function Account() {
    const user = useSelector((state: RootState) => state?.auth?.login?.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo: IUserInfo = user ? user.infoUser : {}

    const initialValues = {
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        address: userInfo.address,
        gender: userInfo.gender,
        phone: userInfo.phone
    }
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])

    const genderArray = ['male', 'female', 'other']
    const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

    return (
        <>
            {user ? (
                <div className='w-11/12 mx-auto shadow-md p-2'>
                    <p className='text-2xl'>Hi, {userInfo.firstName + ' ' + userInfo.lastName}</p>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Email is invalid').required(`Email is required`),
                            firstName: Yup.string().required('First name is required'),
                            lastName: Yup.string().required('Last name is required'),
                            gender: Yup.string().required('Gender is required'),
                            address: Yup.string().required('Address is required'),
                            phone: Yup.number()
                                .min(0, 'Invalid PhoneNumber')
                                .max(999999999, 'Invalid PhoneNumber')
                                .required('Mobile is required')
                        })}
                        onSubmit={(values) => {
                            const accessToken = user.access_token
                            const refreshToken = user.refresh_token

                            const _id = userInfo._id

                            updateUserById(_id, values)

                            dispatch(
                                updateUser({
                                    access_token: accessToken,
                                    refresh_token: refreshToken,
                                    infoUser: {
                                        userInfo,
                                        ...values
                                    }
                                })
                            )

                            toast('Update success!')
                        }}
                    >
                        {({ errors, touched, dirty, handleSubmit }) => (
                            <Form
                                className='grid grid-cols-3 gap-4'
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    if (dirty) {
                                        const confirmed: boolean = confirm('Do you want to change?')
                                        confirmed && handleSubmit()
                                    }
                                }}
                            >
                                <div className='py-2 col-span-3'>
                                    <label>Email: </label>
                                    <br />
                                    <Field
                                        className={` w-full border px-3 py-2 rounded-md mt-1 ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        } `}
                                        type='email'
                                        name='email'
                                        disabled
                                    />
                                    {errors.email && touched.email ? (
                                        <p className='text-red-500'>{errors.email}</p>
                                    ) : null}
                                </div>
                                <div className='py-2 col-span-1'>
                                    <label>First name: </label>
                                    <br />
                                    <Field
                                        className={`w-full border px-3 py-2 rounded-md mt-1 ${
                                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        } `}
                                        type='text'
                                        name='firstName'
                                    />
                                    {errors.firstName && touched.firstName ? (
                                        <p className='text-red-500'>{errors.firstName}</p>
                                    ) : null}
                                </div>
                                <div className='py-2 col-span-1'>
                                    <label>Last name: </label>
                                    <br />
                                    <Field
                                        className={`w-full border px-3 py-2 rounded-md mt-1 ${
                                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        } `}
                                        type='text'
                                        name='lastName'
                                    />
                                    {errors.lastName && touched.lastName ? (
                                        <p className='text-red-500'>{errors.lastName}</p>
                                    ) : null}
                                </div>
                                <div className='py-2 col-span-1'>
                                    <label htmlFor='gender'>Gender:</label>
                                    <br />
                                    <Field
                                        component='select'
                                        name='gender'
                                        className={`w-full border px-3 py-2 rounded-md mt-1 ${
                                            errors.gender ? 'border-red-500' : 'border-gray-300'
                                        } `}
                                    >
                                        {genderArray.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className='py-2 col-span-2'>
                                    <label>Address: </label>
                                    <br />
                                    <Field
                                        className={`w-full border px-3 py-2 rounded-md mt-1 ${
                                            errors.address ? 'border-red-500' : 'border-gray-300'
                                        } `}
                                        type='text'
                                        name='address'
                                    />
                                    {errors.address && touched.address ? (
                                        <p className='text-red-500'>{errors.address}</p>
                                    ) : null}
                                </div>
                                <div className='py-2 col-span-1'>
                                    <label>Phone number: </label>
                                    <br />
                                    <Field
                                        className={`w-full border px-3 py-2 rounded-md mt-1 ${
                                            errors.phone ? 'border-red-500' : 'border-gray-300'
                                        } `}
                                        type='number'
                                        name='phone'
                                    />
                                    {errors.phone && touched.phone ? (
                                        <p className='text-red-500'>{errors.phone}</p>
                                    ) : null}
                                </div>

                                <div>
                                    {dirty && (
                                        <button
                                            type='submit'
                                            className='bg-black s text-white px-5 py-2 rounded-lg hover:bg-gray-800 col-span-2'
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default Account
