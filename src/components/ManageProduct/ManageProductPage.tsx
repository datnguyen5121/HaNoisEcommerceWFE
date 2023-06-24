import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageProductPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import { getProducts, removeToManageProduct } from '../../redux/features/manageProductSlice'
import { Button, Modal } from 'antd'
import { ProductValues } from '../../type/ProductValues'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import { useLocation } from 'react-router-dom'
import { initialValues } from '../../type/initialValues'
import { validationSchemaProduct } from '../../type/validationSchemaProduct'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()

type Props = {
    setProduct: Dispatch<React.SetStateAction<ProductValues[]>>
}
const multipleSize = ['37', '37.5', '38', '38.5', '39', '39.5', '40', '40.5', '41', '41.5', '42.5', '43', '43.5', '44']
const ManageProductPage = ({ setProduct }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

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
    const productItems = useAppSelector((state) => state.manageProduct.products)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (productItems.length <= 0) {
            dispatch(getProducts())
        }
    }, [])

    const [size, setSize] = useState<string[]>([])
    const [selectedImages, setSelectedImages] = useState<File[]>([])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...files])
    }
    const uploadImage = () => {
        // Extract the file names from selectedImages
        const fileNames = selectedImages.map((file) => file.name)
        console.log(fileNames)
    }

    const handleChooseSize = (e: ChangeEvent<HTMLInputElement>) => {
        const sizes = e.target.value
        console.log('sizes giay la === ', sizes)
        setSize((prevSize) => [...prevSize, sizes])
    }

    const handleSubmit = (values: ProductValues) => {
        setProduct((product: any) => {
            let newProduct = [...product]
            const productIndex = newProduct.findIndex((product) => product._id === values._id)
            if (productIndex !== -1) {
                newProduct[productIndex] = values
            } else {
                newProduct = newProduct.concat({
                    ...values,
                    _id: product.length + 1
                })
            }
            console.log('values === ', newProduct)
            return newProduct
        })
    }
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
                                            <label htmlFor='datePublish' className='mb-[0.2rem] font-[700]'>
                                                Date Publish
                                            </label>
                                            <Field
                                                as='input'
                                                name='datePublish'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md   `}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='datePublish'
                                                component='div'
                                            />
                                        </div>
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
                                            {/* <Field
                                                onChange={handleChooseSize}
                                                name='size'
                                                // options={multipleSize}
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            >
                                                <option value='37'>37</option>
                                                <option value='37.5'>37.5</option>
                                                <option value='38'>38</option>
                                                <option value='38.5'>38.5</option>
                                                <option value='39'>39</option>
                                                <option value='39.5'>39.5</option>
                                                <option value='40'>40</option>
                                                <option value='40.5'>40.5</option>
                                                <option value='41'>41</option>
                                                <option value='41.5'>41.5</option>
                                                <option value='42.5'>42.5</option>
                                                <option value='43'>43</option>
                                                <option value='43.5'>43.5</option>
                                                <option value='44'>44</option>
                                            </Field> */}
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                defaultValue={[multipleSize[0]]}
                                                isMulti
                                                options={multipleSize}
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='size' component='div' />
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
                                                onChange={handleImageChange}
                                            />
                                            <button
                                                className='w-[4.6rem] h-[1.8rem] bg-blue-600 text-white rounded-md'
                                                onClick={() => uploadImage()}
                                            >
                                                Upload
                                            </button>
                                            <ErrorMessage className={`${styles.error}`} name='imgUrl' component='div' />
                                        </div>
                                        <div>
                                            <button
                                                className='bg-blue-600 w-[4.6rem] h-[1.8rem] text-white rounded-md'
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
                            <th>DatePublish</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>imgUrl</th>
                            <th>Price</th>
                            <th>Feature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productItems.map((product, index) => (
                            <tr key={index}>
                                <td className='w-11'>{index + 1}</td>
                                <td className='w-36'>{product.title}</td>
                                <td className='w-40'>{product.description}</td>
                                <td className='w-28'>{product.datePublish}</td>
                                <td className='w-32'>{product.category}</td>
                                <td className='w-32'>{product.size}</td>
                                <td className='w-12'>{product.size}</td>
                                <td className='w-40'>{product.imgUrl}</td>
                                <td className='w-16'>{product.price}</td>
                                <td className='w-36'>
                                    <div>
                                        <button className={`${styles.editBtn}`}>Edit</button>
                                        <button
                                            className={`${styles.deleteBtn}`}
                                            onClick={() => dispatch(removeToManageProduct(product._id))}
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
