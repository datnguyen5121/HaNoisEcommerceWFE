import * as Yup from 'yup'

export const validationSchemaProduct = Yup.object({
    gender: Yup.string().required('Gender is required'),
    productName: Yup.string().required('Product name is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.array().of(Yup.string()).required('Category is required'),
    size: Yup.array().min(1, 'Please select at least one size').required('Please select at least one size'),
    price: Yup.number().required('Price is required'),
    imgUrl: Yup.string().required('Image is required')
})
