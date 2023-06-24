import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageProductPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Dispatch, useEffect, useState } from 'react'
import { getProducts, removeToManageProduct } from '../../redux/features/manageProductSlice'
import { Button, Modal } from 'antd'
import { ProductValues } from '../../type/ProductValues'
import { ErrorMessage, Field, FieldArray, Formik } from 'formik'
import { useLocation } from 'react-router-dom'
import { initialValues } from '../../type/initialValues'
import { validationSchemaProduct } from '../../type/validationSchemaProduct'

type Props = {
    setProduct: Dispatch<React.SetStateAction<ProductValues[]>>
}
interface FakeData {
    tag: string
    subNav: string
    category: string[]
    brand: string
}
interface SubNavName {
    subnavName: string
    list: string[]
}
interface NavName {
    navName: string
    list: SubNavName[]
}
const ManageProductPage = ({ setProduct }: Props) => {
    let fakeData: FakeData[] = [
        {
            tag: 'Nam',
            subNav: 'Giay',
            category: ['Giay', 'Giay The Thao'],
            brand: 'Nike'
        },
        {
            tag: 'Nu',
            subNav: 'Tui xach',
            category: ['Giay', 'Giay The Thao'],
            brand: 'Dat'
        },
        {
            tag: 'Khac',
            subNav: 'QuanAo',
            category: ['Giay', 'Giay The Thao'],
            brand: 'Adidas'
        }
    ]

    const [inputTag1, setInputTag1] = useState<string>('')
    const [tag, setTag] = useState<string[]>([] as string[])

    const [inputProductTag, setInputProductTag] = useState<string>('')
    const [productTag, setProductTag] = useState<string[]>([] as string[])

    const [inputCategoryTag, setInputCategoryTag] = useState<string>('')
    const [categoryTag, setCategoryTag] = useState<string[]>([] as string[])

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
                <div className='flex justify-start w-full mb-6'>
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
                                <form action='' onSubmit={formik.handleSubmit}>
                                    <div className={`my-2 grid`}>
                                        <label htmlFor='title' className='me-[10px] font-[700]'>
                                            Title
                                        </label>
                                        <Field
                                            as='input'
                                            name='title'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px] rounded-md   `}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='title' component='div' />
                                    </div>
                                    <div className={`my-2 grid`}>
                                        <label htmlFor='description' className='me-[10px] font-[700]'>
                                            Description
                                        </label>
                                        <Field
                                            as='input'
                                            name='description'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px] rounded-md   `}
                                        />
                                        <ErrorMessage
                                            className={`${styles.error}`}
                                            name='description'
                                            component='div'
                                        />
                                    </div>

                                    <ErrorMessage name='inputValue' component='div' />
                                    <div className={`my-2 grid`}>
                                        <label htmlFor='datePublish' className='me-[10px] font-[700]'>
                                            Date Publish
                                        </label>
                                        <Field
                                            as='input'
                                            name='datePublish'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px] rounded-md   `}
                                        />
                                        <ErrorMessage
                                            className={`${styles.error}`}
                                            name='datePublish'
                                            component='div'
                                        />
                                    </div>
                                    <div className={`my-2 grid`}>
                                        <label htmlFor='category' className='me-[10px] font-[700]'>
                                            Category
                                        </label>
                                        <Field
                                            as='input'
                                            name='category'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px] rounded-md   `}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='category' component='div' />
                                    </div>
                                    <div className={`my-2 grid`}>
                                        <label htmlFor='size' className='me-[10px] font-[700]'>
                                            Size
                                        </label>
                                        <Field
                                            as='input'
                                            name='size'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px] rounded-md   `}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='size' component='div' />
                                    </div>
                                    <div className={`my-2 grid`}>
                                        <label htmlFor='imgUrl' className='me-[10px] font-[700]'>
                                            Image Url
                                        </label>
                                        <Field
                                            as='input'
                                            name='imgUrl'
                                            className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px] rounded-md   `}
                                        />
                                        <ErrorMessage className={`${styles.error}`} name='imgUrl' component='div' />
                                    </div>
                                </form>
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
                            <th>createdAt</th>
                            <th>updatedAt</th>
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
                                <td className='w-32'>{product.gender}</td>
                                <td className='w-12'>{product.size}</td>
                                <td className='w-40'>{product.imgUrl}</td>
                                <td className='w-16'>{product.price}</td>
                                <td className='w-52'>{product.createdAt}</td>
                                <td className='w-52'>{product.updatedAt}</td>
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
