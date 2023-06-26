import { Field, Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function Account() {
    const genderArray = ['male', 'female', 'other']
    const initialValues = {
        email: 'phucdz@gmail.com',
        firstName: 'Nguyen',
        lastName: 'Phuc',
        address: 'Hà nội',
        gender: 'male',
        phone: '0989642699'
    }
    console.log('account component')

    const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    return (
        <div className='w-11/12 mx-auto shadow-md p-2'>
            <p className='text-2xl'>Hi, Nguyen Phuc</p>

            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Email is invalid').required(`Email is required`),
                    firstName: Yup.string().required('First name is required'),
                    lastName: Yup.string().required('Last name is required'),
                    gender: Yup.string().required('Gender is required'),
                    address: Yup.string().required('Address is required'),
                    phone: Yup.string().matches(phoneRegExp, 'Mobile is invalid').required('Mobile is required')
                })}
                onSubmit={(values) => {
                    // update form data
                    console.log(values)
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
                            {errors.email && touched.email ? <p className='text-red-500'>{errors.email}</p> : null}
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
                                type='text'
                                name='phone'
                            />
                            {errors.phone && touched.phone ? <p className='text-red-500'>{errors.phone}</p> : null}
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='bg-black s text-white px-5 py-2 rounded-lg hover:bg-gray-800 col-span-2'
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Account
