import { FC, useState } from 'react'
import styles from './Login.module.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../redux/authRequest'

const Login: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState<boolean>(false)

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email address.').required('Email is required'),
        password: Yup.string().required('Password is required')
    })

    const handleLogin = (values: { email: string; password: string }) => {
        loginUser(values, dispatch, navigate, setError)
    }

    return (
        <div className={styles.login}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                {({ errors, touched }) => {
                    return (
                        <Form className={styles.form}>
                            <div className={styles.top}>
                                <img
                                    src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYy5gDTTqxTfpb7-XGWNUvF--mB3hwNwofICYOevF0nizMSQRA'
                                    alt=''
                                    className={styles.logo}
                                />
                                <h1 className={styles.title}>HANOIS GENZ</h1>
                            </div>

                            <div className=''>
                                {error && (
                                    <p className={styles.error}>Your email or password was entered incorrectly.</p>
                                )}
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
                            </div>
                            <button type='submit' className={styles.submit}>
                                SIGN IN
                            </button>
                        </Form>
                    )
                }}
            </Formik>

            <p className={styles.notMember}>
                Not a Member? {''}
                <span className={styles.joinUs} onClick={() => navigate('/register')}>
                    Join Us.
                </span>
            </p>
        </div>
    )
}

export default Login
