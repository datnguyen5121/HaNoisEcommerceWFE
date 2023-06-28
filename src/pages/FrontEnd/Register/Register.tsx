import { FC } from 'react'
import styles from './Register.module.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { registerUser } from '../../../redux/authRequest'
import { toast } from 'react-toastify'

const Register: FC = () => {
    const navigate = useNavigate()
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        gender: '',
        phone: ''
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Please enter a valid email address.').required('Email is required'),
        password: Yup.string().required('Password is required'),
        address: Yup.string().required('Address is required'),
        gender: Yup.string().required('Gender is required'),
        phone: Yup.string().required('Phone is required')
    })

    const handleSubmit = (values: {
        firstName: string
        lastName: string
        email: string
        password: string
        address: string
        gender: string
        phone: string
    }) => {
        registerUser(values, navigate)
        toast('Register Success')
    }

    return (
        <div className={styles.login}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => {
                    return (
                        <Form className={styles.form}>
                            <div className={styles.top}>
                                <img
                                    src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYy5gDTTqxTfpb7-XGWNUvF--mB3hwNwofICYOevF0nizMSQRA'
                                    alt=''
                                    className={styles.logo}
                                />
                                <h1 className={styles.title}>BECOME A MEMBER</h1>
                                <p className={styles.description}>
                                    Create your Member profile and get first access to the very best of products,
                                    inspiration and community.
                                </p>
                            </div>

                            <div className=''>
                                <div className={styles.inputContainer}>
                                    <Field
                                        type='text'
                                        name='email'
                                        className={
                                            errors.email && touched.email
                                                ? `${styles.input} ${styles.errorBorder}`
                                                : `${styles.input}`
                                        }
                                        placeholder='Email address'
                                    />
                                    <ErrorMessage name='email' component='div' className={styles.error} />
                                </div>
                                <div className={styles.inputContainer}>
                                    <Field
                                        type='password'
                                        name='password'
                                        className={
                                            errors.password && touched.password
                                                ? `${styles.input} ${styles.errorBorder}`
                                                : `${styles.input}`
                                        }
                                        placeholder='Password'
                                    />
                                    <ErrorMessage name='password' component='div' className={styles.error} />
                                </div>

                                <div className={styles.inputContainer}>
                                    <Field
                                        type='text'
                                        name='firstName'
                                        className={
                                            errors.firstName && touched.firstName
                                                ? `${styles.input} ${styles.errorBorder}`
                                                : `${styles.input}`
                                        }
                                        placeholder='First Name'
                                    />
                                    <ErrorMessage name='firstName' component='div' className={styles.error} />
                                </div>

                                <div className={styles.inputContainer}>
                                    <Field
                                        type='text'
                                        name='lastName'
                                        className={
                                            errors.lastName && touched.lastName
                                                ? `${styles.input} ${styles.errorBorder}`
                                                : `${styles.input}`
                                        }
                                        placeholder='Last Name'
                                    />
                                    <ErrorMessage name='lastName' component='div' className={styles.error} />
                                </div>

                                <div className={styles.inputContainer}>
                                    <Field
                                        type='text'
                                        name='phone'
                                        className={
                                            errors.phone && touched.phone
                                                ? `${styles.input} ${styles.errorBorder}`
                                                : `${styles.input}`
                                        }
                                        placeholder='Phone number'
                                    />
                                    <ErrorMessage name='phone' component='div' className={styles.error} />
                                </div>

                                <div className={styles.inputContainer}>
                                    <Field
                                        type='text'
                                        name='address'
                                        className={
                                            errors.address && touched.address
                                                ? `${styles.input} ${styles.errorBorder}`
                                                : `${styles.input}`
                                        }
                                        placeholder='Address'
                                    />
                                    <ErrorMessage name='address' component='div' className={styles.error} />
                                </div>

                                <div className={styles.inputContainer}>
                                    <Field
                                        as='select'
                                        name='gender'
                                        className={
                                            errors.gender && touched.gender
                                                ? `${styles.input} ${styles.errorBorder}`
                                                : `${styles.input}`
                                        }
                                    >
                                        <option value=''>Select Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                        <option value='other'>Other</option>
                                    </Field>
                                    <ErrorMessage name='gender' component='div' className={styles.error} />
                                </div>
                            </div>

                            <button type='submit' className={styles.submit}>
                                JOIN US
                            </button>
                        </Form>
                    )
                }}
            </Formik>

            <p className={styles.notMember}>
                Already a Member? {''}
                <span className={styles.joinUs} onClick={() => navigate('/login')}>
                    Sign In.
                </span>
            </p>
        </div>
    )
}

export default Register
