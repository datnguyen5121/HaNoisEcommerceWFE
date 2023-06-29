import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageProductPage.module.css'
import { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { ProductValues } from '../../type/ProductValues'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import { useLocation } from 'react-router-dom'
import { initialValues } from '../../type/initialValues'
import { validationSchemaProduct } from '../../type/validationSchemaProduct'

import axios from 'axios'

const ManageProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [productsNike, setProductsNike] = useState<any[]>([])
    const { state } = useLocation()
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleSubmit = async (values: any) => {
        console.log(values)
        const formData = new FormData()

        if (values.imgUrl !== null) {
            for (let i = 0; i < values.imgUrl.length; i++) {
                formData.append(`imgUrl${i}`, values.imgUrl[i])
            }
        }
        formData.append('gender', values.gender)
        formData.append('productName', values.productName)
        formData.append('title', values.title)
        formData.append('description', values.description)
        formData.append('category', values.category)
        formData.append('size', values.size)
        formData.append('imgUrl', values.imgUrl)
        formData.append('price', values.price)
        try {
            const response = await axios.post('/create-new-product', formData)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const productsData = async () => {
        try {
            const response = await axios.get('/get-all-product')
            setProductsNike(response.data.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        productsData()
    }, [])
    return (
        <div className={`productPageContainer px-[20px] py-[10px]`}>
            <HeaderManageProduct />
            <div className={`h-[50px] flex items-center justify-center`}>
                <h2 className={`text-[25px]`}>Product Page</h2>
            </div>
            <div className={`h-[50px] flex items-center justify-center`}>
                <input
                    className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                    type='text'
                    placeholder='Search Product'
                />
            </div>
            <div className={`mt-[30px] flex flex-col justify-center items-center`}>
                <div className='flex justify-start w-full gap-3 mb-6'>
                    <Button className='bg-blue-500' type='primary' onClick={showModal}>
                        Create a new Product
                    </Button>
                    <Modal title='Create A New Product' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Formik<ProductValues>
                            onSubmit={handleSubmit}
                            validationSchema={validationSchemaProduct}
                            initialValues={state == null ? initialValues : state}
                        >
                            {(formik) => (
                                <div>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='gender' className='mb-[0.2rem] font-[700]'>
                                                Gender
                                            </label>
                                            <Field
                                                as='input'
                                                name='gender'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='gender' component='div' />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='productName' className='mb-[0.2rem] font-[700]'>
                                                Product Name
                                            </label>
                                            <Field
                                                as='input'
                                                name='productName'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='productName'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='title' className='mb-[0.2rem] font-[700]'>
                                                Title
                                            </label>
                                            <Field
                                                as='input'
                                                name='title'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='title' component='div' />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='description' className='mb-[0.2rem] font-[700]'>
                                                Description
                                            </label>
                                            <Field
                                                as='input'
                                                name='description'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='description'
                                                component='div'
                                            />
                                        </div>

                                        <ErrorMessage name='inputValue' component='div' />
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='category' className='mb-[0.2rem] font-[700]'>
                                                Category
                                            </label>
                                            <Field
                                                as='input'
                                                name='category'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md   `}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='category'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='size' className='mb-[0.2rem] font-[700]'>
                                                Size
                                            </label>
                                            <div role='group' aria-labelledby='checkbox-group'>
                                                <div>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            37
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='37'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            37.5
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='37.5'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            38
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='38'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            38.5
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='38.5'
                                                        />
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            39
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='39'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            39.5
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='39.5'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            40
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='40'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            40.5
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='40.5'
                                                        />
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            41
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='41'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            41.5
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='41.5'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            42
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='42'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            42.5
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='42.5'
                                                        />
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            43
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='43'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            43.5
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='43.5'
                                                        />
                                                    </span>
                                                    <span className='mx-[0.6rem]'>
                                                        <label className='me-[0.4rem]' htmlFor='size'>
                                                            44
                                                        </label>
                                                        <Field
                                                            className='ms-[0.2rem]'
                                                            type='checkbox'
                                                            name='size'
                                                            value='44'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <ErrorMessage name='size' component='div' className='error' />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='price' className='mb-[0.2rem] font-[700]'>
                                                Price
                                            </label>
                                            <Field
                                                as='input'
                                                name='price'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='price' component='div' />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='imgUrl' className='mb-[0.2rem] font-[700]'>
                                                Image Url
                                            </label>
                                            <input
                                                className='mb-[0.6rem]'
                                                type='file'
                                                id='imageInput'
                                                name='imgUrl'
                                                accept='image/png, image/jpg, image/jpeg'
                                                onChange={(event) => {
                                                    formik.setFieldValue('imgUrl', event.currentTarget.files)
                                                }}
                                                multiple
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='imgUrl' component='div' />
                                        </div>
                                        <div>
                                            <button
                                                className='bg-blue-600 px-[0.8rem] py-[0.4rem] text-white rounded-md hover:bg-sky-600'
                                                type='submit'
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </Modal>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>imgUrl</th>
                            <th>Price</th>
                            <th>Feature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsNike.map((product, index) => (
                            <tr key={index}>
                                <td className='w-11'>{index + 1}</td>
                                <td className='w-36'>{product.title}</td>
                                <td className='w-40'>{product.description}</td>
                                <td className='w-32'>{product.category}</td>
                                <td className='w-32'>{product.size}</td>
                                <td className='w-40'>
                                    {product.imgUrl.map((value: any, index: number) => (
                                        <p className='mt-[1rem] mx-[1rem]' key={index}>
                                            {value}
                                        </p>
                                    ))}
                                </td>
                                <td className='w-40'>{product.price}</td>
                                <td className='w-36'>
                                    <div>
                                        <button className={`${styles.editBtn}`}>Edit</button>
                                        <button
                                            className={`${styles.deleteBtn}`}
                                            onClick={() => {
                                                const deleteProduct = productsNike.filter(
                                                    (value) => value._id !== product._id
                                                )
                                                setProductsNike(deleteProduct)
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
export default ManageProductPage
