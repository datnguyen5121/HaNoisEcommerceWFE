import * as Yup from 'yup'
export const validationSchemaProduct = Yup.object({
    gender: Yup.string().required('Gender is required'),
    productName: Yup.string().required('Product name is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    size: Yup.array().of(Yup.string()).min(1, 'Please select at least one size'),
    imgUrl: Yup.string().required('Image is required'),
    price: Yup.number().required('Price is required')
})
