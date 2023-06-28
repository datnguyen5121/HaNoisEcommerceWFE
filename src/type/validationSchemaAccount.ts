import * as Yup from 'yup'
export const validationSchemaAccount = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    gender: Yup.string().required('Gender is required'),
    phone: Yup.string().required('Mobile is required'),
    roleId: Yup.string().required('Role is required')
})
