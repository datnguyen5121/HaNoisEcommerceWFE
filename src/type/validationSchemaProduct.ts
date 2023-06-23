import * as Yup from 'yup'
export const validationSchemaProduct = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    datePublish: Yup.string().required('Date published is required'),
    category: Yup.string().required('Category is required'),
    size: Yup.string().required('Size is required'),
    imgUrl: Yup.string().required('Image url is required'),
    price: Yup.number().required('Price is required'),
    createdAt: Yup.string().required('Created at is required'),
    updatedAt: Yup.string().required('Updated at is required')
})
