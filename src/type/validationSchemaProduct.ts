import * as Yup from 'yup'
export const validationSchemaProduct = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    datePublish: Yup.string().required('Date published is required'),
    category: Yup.string().required('Category is required'),
    size: Yup.array().min(1, 'Please select at least one size').required('Please select at least one size'),
    imgUrl: Yup.string().required('Image is required')
})
