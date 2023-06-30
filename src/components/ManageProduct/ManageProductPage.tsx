import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageProductPage.module.css'
import { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'antd'
import { ProductValues } from '../../type/ProductValues'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import { useLocation } from 'react-router-dom'
import axios from '../../utils/axiosCustomize'
import { toast } from 'react-toastify'

import { validationSchemaProduct } from '../../type/validationSchemaProduct'
import makeAnimated from 'react-select/animated'
import { getAllProductTag, getAllTag, getAllTagAdmin, getProductTag } from '../../services/apiService'
import { getAllSize } from '../../services/sizeService'
import { getProducts } from '../../redux/features/manageProductSlice'
const animatedComponents = makeAnimated()
interface IProductTag {
    _id: string
    navName: { _id: string; navName: string }
    list: string[]
    subnavName: string
}
interface ITag {
    _id: string
    navName: string
}
interface IProductTag {
    _id: string
    navName: { _id: string; navName: string }
    list: string[]
    subnavName: string
}
interface SubNavName {
    list: string[]
    navName: string
    subnavName: string
    subnavNameId: string
    navNameId: string
}
interface ProductTagState {
    navName: string
    list: SubNavName[]
}
interface ProductState {
    navName: string
    list: string[]
}
export interface ProductForm {
    subnavName: string
    subnavNameId: string
    list: string[]
}

const ManageProductPage = () => {
    const initialValues: ProductValues = {
        gender: '',
        productName: '',
        title: '',
        description: '',
        category: [],
        size: [],
        imgUrl: null,
        price: 0
    }
    interface ITagList {
        _id: string
        navName: string
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)

    const [tagList, setTagList] = useState<ITagList[]>([])
    const [productTagDataList, setProductTagDataList] = useState<ProductTagState[]>([])
    const [productTagList, setProductTagList] = useState<SubNavName[]>([])
    const [category, setCategory] = useState<string[]>([])
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null)
    const { state } = useLocation()
    const [productSelect, setProductSelect] = useState<string>('')
    const [sizeList, setSizeList] = useState<string[]>([])
    const [productAll, setProductAll] = useState<any>([])
    const [productId, setProductId] = useState<string>('')
    const [product, setProduct] = useState<ProductValues>({
        _id: '',
        gender: '',
        productName: '',
        title: '',
        description: '',
        category: [],
        size: [],
        imgUrl: null,
        price: null
    })
    const showModal = () => {
        setIsModalOpen(true)
    }
    const showModalEdit = () => {
        setIsModalEditOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const handleCancelEdit = () => {
        setIsModalEditOpen(false)
    }

    const fileInputRef = useRef<HTMLInputElement>(null) // Tham chiếu đến phần tử input

    const handleGetTagList = async () => {
        let res = await getAllTagAdmin()

        setTagList(res.data)
    }
    useEffect(() => {
        handleGetTagList()
        fetchAllProductTag()
        fetchAllProduct()
    }, [])

    const fetchAllProduct = async () => {
        let res = await axios.get('/api/get-all-product')
        setProductAll(res.data)
    }
    const fetchAllProductTag = async () => {
        const res = await getAllProductTag()
        if (res) {
            const data = handleBuildCategoryData(res.data)
            setProductTagDataList(data)
        }
    }
    useEffect(() => {
        fetchSizeByProductName(productSelect)
    }, [productSelect])
    let fetchSizeByProductName = async (values: any) => {
        let res = await getAllSize()
        if (values) {
            let sizeList = res.data.filter((item: any) => item.subnavName == values)

            setSizeList(sizeList[0].size)
        }
    }
    const handleBuildCategoryData = (data: IProductTag[]) => {
        const newData = data.map((item) => {
            return {
                navName: item.navName.navName,
                navNameId: item.navName._id,
                subnavNameId: item._id,
                subnavName: item.subnavName,
                list: item.list
            }
        })

        const newObj = newData.reduce((result: any, obj) => {
            const navName = obj.navName
            const navNameId = obj.navNameId
            const subnavNameId = obj.subnavNameId
            const indexNav = result.findIndex((item: any) => item.navName === navName)

            if (indexNav !== -1) {
                result[indexNav].list.push({
                    navName: navName,
                    navNameId: navNameId,
                    subnavNameId: subnavNameId,
                    subnavName: obj.subnavName,
                    list: obj.list
                })
            } else {
                result.push({
                    navName: navName,
                    list: [
                        {
                            navName: navName,
                            navNameId: navNameId,
                            subnavNameId: subnavNameId,
                            subnavName: obj.subnavName,
                            list: obj.list
                        }
                    ]
                })
            }
            return result
        }, [])
        return newObj
    }

    const handleSubmit = async (values: any, setFieldValue: any) => {
        const formData = new FormData()
        if (values.imgUrl !== null) {
            for (let i = 0; i < values.imgUrl.length; i++) {
                formData.append(`imgUrl${i}`, values.imgUrl[i])
            }
        }
        for (let i = 0; i < values.category.length; i++) {
            formData.append('category[]', values.category[i])
        }
        for (let i = 0; i < values.size.length; i++) {
            formData.append('size[]', values.size[i])
        }
        formData.append('gender', values.gender)
        formData.append('productName', values.productName)
        formData.append('title', values.title)
        formData.append('description', values.description)

        formData.append('price', values.price)
        try {
            const response = await axios.post('/api/create-new-product', formData)
            if (response.data && response) {
                toast.success('Create New Product Success !')
            } else {
                toast.error('Create failed !')
            }
            fetchAllProduct()
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false)
    }
    const handleSubmitEdit = async (values: any, e: any) => {
        e.preventDefault()

        const formData = new FormData()

        if (values.imgUrl !== null) {
            for (let i = 0; i < values.imgUrl.length; i++) {
                formData.append(`imgUrl${i}`, values.imgUrl[i])
            }
        }
        for (let i = 0; i < values.category.length; i++) {
            formData.append('category[]', values.category[i])
        }
        for (let i = 0; i < values.size.length; i++) {
            formData.append('size[]', values.size[i])
        }
        formData.append('_id', productId)
        formData.append('gender', values.gender)
        formData.append('productName', values.productName)
        formData.append('title', values.title)
        formData.append('description', values.description)
        formData.append('price', values.price)

        try {
            const response = await axios.put('/api/update-product-by-id', formData)
            if (response.data && response) {
                toast.success('Update New Product Success !')
            } else {
                toast.error('Update failed !')
            }
            fetchAllProduct()
            fetchAllProduct()
            handleCancelEdit()
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false)
    }
    const handleChangeGender = (e: any, setFieldValue: any) => {
        const selectedOption = e.target.value

        let data = productTagDataList.filter((item) => item.navName == selectedOption)
        setProductTagList(data[0].list)
        setFieldValue('gender', selectedOption)
    }
    let handleChangeProductType = (e: any, setFieldValue: any) => {
        const selectedOption = e.target.value
        let data = productTagList.filter((item) => item.subnavName == selectedOption)
        setCategory(data[0].list)

        setFieldValue('productName', selectedOption)
        setProductSelect(selectedOption)
    }

    const handleDeleteImg = (e: any, index: number, setFieldValue: any) => {
        e.stopPropagation()
        if (selectedImages) {
            let arr = Array.from(selectedImages)
            arr.splice(index, 1)
            const dataTransfer = new DataTransfer()
            arr.forEach((file) => {
                dataTransfer.items.add(file)
            })

            const newFileList = dataTransfer.files
            setSelectedImages(newFileList)
            setFieldValue('imgUrl', newFileList)
        }
    }
    const mergeFileLists = (fileList1: FileList, fileList2: any): FileList => {
        const mergedFiles: File[] = Array.from(fileList1)

        for (let i = 0; i < fileList2.length; i++) {
            mergedFiles.push(fileList2[i])
        }
        const dataTransfer = new DataTransfer()

        mergedFiles.forEach((file: any) => {
            dataTransfer.items.add(file)
        })
        const newFileList = dataTransfer.files
        return newFileList
    }
    const handleChangeFile = (event: any, setFieldValue: any) => {
        const inputElement = event.currentTarget
        const files: any = Array.from(inputElement.files || [])

        if (files && files.length > 0) {
            const selectedFiles: any = Array.from(files)
            const dataTransfer = new DataTransfer()

            selectedFiles.forEach((file: any) => {
                dataTransfer.items.add(file)
            })
            const newFileList = dataTransfer.files
            let updatedFileList: any = newFileList
            if (selectedImages) {
                updatedFileList = mergeFileLists(selectedImages, selectedFiles)
            }

            setSelectedImages(updatedFileList)
            setFieldValue('imgUrl', updatedFileList)
        }
    }

    const handleUpload = () => {
        if (fileInputRef) {
            fileInputRef.current!.click() // Kích hoạt sự kiện chọn tệp
        }
    }
    const handleDeleteProduct = async (id: string) => {
        let data = {
            id: id
        }
        if (confirm('Do you want to delete this product ?')) {
            let res = await axios.delete('/api/delete-product-by-id', { data })
            if (res) {
                toast.success('Delete success!')
            } else {
                toast.error('Delete fail!')
            }
            fetchAllProduct()
        }
    }
    let handleEditId = async (id: string, item: any) => {
        let res = await axios.get(`/api/get-product-by-id?_id=${id}`)
        let data = {
            gender: res.data.gender,
            productName: res.data.productName,
            title: res.data.title,
            description: res.data.description,
            category: res.data.category,
            size: res.data.size,
            imgUrl: res.data.imgUrl,
            price: res.data.price
        }

        setProductId(id)
        setProduct(data)
        setProductSelect(data.productName)
        const res1 = await getAllProductTag()

        if (res1) {
            const data = handleBuildCategoryData(res1.data)

            let data1 = data.filter((item1: any) => item1.navName == item.gender)
            let cloneProductTagList = [...data1[0].list]

            let data2 = cloneProductTagList.filter((item1) => item1.subnavName == item.productName)

            setProductTagList(data1[0].list)
            setCategory(data2[0].list)
        }
        setIsModalEditOpen(true)
    }
    // async function convertToBlob(url: string): Promise<Blob> {
    //     try {
    //         // Gọi máy chủ proxy thay vì trực tiếp gọi URL của ảnh từ Firebase Storage
    //         // const proxyUrl = 'http://localhost:5173/image?url=' + encodeURIComponent(url)
    //         const response = await axios.get(`/image?url=${url}`, { responseType: 'arraybuffer' })
    //         console.log(response)

    //         const blob = new Blob([response.data], { type: 'image/png' })
    //         return blob
    //     } catch (error) {
    //         console.log(error)
    //         throw new Error('Error converting to blob')
    //     }
    // }

    // async function convertToImageFiles(imageUrls: string[]): Promise<File[]> {
    //     const filePromises = imageUrls.map(async (url: string) => {
    //         const blob = await convertToBlob(url)
    //         const fileName = url.substring(url.lastIndexOf('/') + 1)
    //         const file = new File([blob], fileName, { type: blob.type })
    //         return file
    //     })

    //     const imageFiles = await Promise.all(filePromises)
    //     return imageFiles
    // }
    return (
        <div className={`productPageContainer px-[20px] py-[10px]`}>
            <HeaderManageProduct />
            <div className={`h-[50px] flex items-center justify-center`}>
                <h2 className={`text-[25px]`}>Product Page</h2>
            </div>

            <div className={`mt-[30px] flex flex-col justify-center items-center`}>
                <div className='flex justify-start w-full gap-3 mb-6'>
                    <Button className='bg-blue-500' type='primary' onClick={showModal}>
                        Create a new Product
                    </Button>
                    <Modal title='Create A New Product' open={isModalOpen} footer={null} onCancel={handleCancel}>
                        <Formik<ProductValues>
                            onSubmit={handleSubmit}
                            validationSchema={validationSchemaProduct}
                            initialValues={state == null ? initialValues : state}
                        >
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='gender' className='mb-[0.2rem] font-[700]'>
                                                Main Tag
                                            </label>
                                            <Field
                                                onChange={(e: any) => handleChangeGender(e, formik.setFieldValue)}
                                                as='select'
                                                id='gender'
                                                name='gender'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            >
                                                <option value=''>--Choose tag--</option>
                                                {tagList.map((option, index) => (
                                                    <option key={index} value={option.navName}>
                                                        {option.navName}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage className={`${styles.error}`} name='gender' component='div' />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='productName' className='mb-[0.2rem] font-[700]'>
                                                Product Type
                                            </label>
                                            <Field
                                                as='select'
                                                name='productName'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                                onChange={(e: any) => handleChangeProductType(e, formik.setFieldValue)}
                                            >
                                                <option value=''>--Choose tag--</option>
                                                {productTagList.map((option, index) => (
                                                    <option key={index} value={option.subnavName}>
                                                        {option.subnavName}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='productName'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='title' className='mb-[0.2rem] font-[700]'>
                                                Product Name
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
                                                Product Info
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

                                            <>
                                                <div role='group' aria-labelledby='checkbox-group'>
                                                    {category.map((option, index) => (
                                                        <label key={index}>
                                                            <Field
                                                                type='checkbox'
                                                                name='category'
                                                                value={`${option}`}
                                                            />
                                                            {option}
                                                        </label>
                                                    ))}
                                                </div>
                                            </>
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
                                                {sizeList.length > 0 &&
                                                    sizeList.map((option, index) => (
                                                        <label>
                                                            <Field type='checkbox' name='size' value={`${option}`} />
                                                            {option}
                                                        </label>
                                                    ))}
                                            </div>
                                            <ErrorMessage className={`${styles.error}`} name='size' component='div' />
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
                                                className='mb-[0.6rem] '
                                                type='file'
                                                id='imageInput'
                                                name='imgUrl'
                                                accept='image/png, image/jpg, image/jpeg'
                                                onChange={(event) => {
                                                    handleChangeFile(event, formik.setFieldValue)
                                                }}
                                                multiple
                                                ref={fileInputRef}
                                            />
                                            <div className='flex flex-wrap'>
                                                {selectedImages &&
                                                    Array.from(selectedImages).map((file, index) => (
                                                        <div className='relative'>
                                                            <img
                                                                key={`img-${index}`}
                                                                src={URL.createObjectURL(file)}
                                                                alt={`Image ${index + 1}`}
                                                                className='w-32 h-32 object-contain'
                                                            ></img>
                                                            <div
                                                                className='absolute top-[1%] left-[110px]'
                                                                onClick={(e: any) =>
                                                                    handleDeleteImg(e, index, formik.setFieldValue)
                                                                }
                                                            >
                                                                {' '}
                                                                <i className='fa-solid fa-trash  hover:text-red-500'></i>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>

                                            <ErrorMessage className={`${styles.error}`} name='imgUrl' component='div' />
                                        </div>
                                        <div>
                                            <button
                                                className='bg-blue-600 w-[4.6rem] hover:opacity-50 h-[1.8rem] text-white rounded-md'
                                                type='submit'
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </Modal>
                    <Modal
                        title='Update A New Product'
                        open={isModalEditOpen}
                        footer={null}
                        onCancel={handleCancelEdit}
                    >
                        <Formik<ProductValues>
                            onSubmit={handleSubmitEdit}
                            validationSchema={validationSchemaProduct}
                            initialValues={product}
                            enableReinitialize={true}
                        >
                            {(formik) => (
                                <form onSubmit={(e: any) => handleSubmitEdit(formik.values, e)}>
                                    <div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='gender' className='mb-[0.2rem] font-[700]'>
                                                Main Tag
                                            </label>
                                            <Field
                                                onChange={(e: any) => handleChangeGender(e, formik.setFieldValue)}
                                                as='select'
                                                id='gender'
                                                name='gender'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            >
                                                <option value=''>--Choose tag--</option>
                                                {tagList.map((option, index) => (
                                                    <option key={index} value={option.navName}>
                                                        {option.navName}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage className={`${styles.error}`} name='gender' component='div' />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='productName' className='mb-[0.2rem] font-[700]'>
                                                Product Type
                                            </label>
                                            <Field
                                                as='select'
                                                name='productName'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                                onChange={(e: any) => handleChangeProductType(e, formik.setFieldValue)}
                                            >
                                                <option value=''>--Choose tag--</option>
                                                {productTagList.map((option, index) => (
                                                    <option key={index} value={option.subnavName}>
                                                        {option.subnavName}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='productName'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='title' className='mb-[0.2rem] font-[700]'>
                                                Product Name
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
                                                Product Info
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

                                            <>
                                                <div role='group' aria-labelledby='checkbox-group'>
                                                    {category.map((option, _) => (
                                                        <label>
                                                            <Field
                                                                type='checkbox'
                                                                name='category'
                                                                value={`${option}`}
                                                            />
                                                            {option}
                                                        </label>
                                                    ))}
                                                </div>
                                            </>
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
                                                {sizeList.length > 0 &&
                                                    sizeList.map((option, _) => (
                                                        <label>
                                                            <Field type='checkbox' name={`size`} value={`${option}`} />
                                                            {option}
                                                        </label>
                                                    ))}
                                            </div>
                                            <ErrorMessage className={`${styles.error}`} name='size' component='div' />
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
                                                className='mb-[0.6rem] '
                                                type='file'
                                                id='imageInput'
                                                name='imgUrl'
                                                accept='image/png, image/jpg, image/jpeg'
                                                onChange={(event) => {
                                                    handleChangeFile(event, formik.setFieldValue)
                                                }}
                                                multiple
                                                ref={fileInputRef}
                                            />
                                            <div className='flex flex-wrap'>
                                                {selectedImages &&
                                                    Array.from(selectedImages).map((file, index) => (
                                                        <div className='relative'>
                                                            <img
                                                                key={`img-${index}`}
                                                                src={URL.createObjectURL(file)}
                                                                alt={`Image ${index + 1}`}
                                                                className='w-32 h-32 object-contain'
                                                            ></img>
                                                            <div
                                                                className='absolute top-[1%] left-[110px]'
                                                                onClick={(e: any) =>
                                                                    handleDeleteImg(e, index, formik.setFieldValue)
                                                                }
                                                            >
                                                                {' '}
                                                                <i className='fa-solid fa-trash  hover:text-red-500'></i>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                            <ErrorMessage className={`${styles.error}`} name='imgUrl' component='div' />
                                        </div>
                                        <div>
                                            <button
                                                className='bg-blue-600 w-[4.6rem] hover:opacity-50 h-[1.8rem] text-white rounded-md'
                                                type='submit'
                                            >
                                                Submit
                                            </button>
                                        </div>
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
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Product Gender</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Feature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productAll.map((product: any, index: any) => (
                            <tr key={index}>
                                <td className='w-11'>{index + 1}</td>
                                <td className='w-36'>{product.title}</td>
                                <td className='w-36'>{product.productName}</td>
                                <td className='w-36'>{product.gender}</td>
                                <td className='w-[40%] '>{product.description}</td>
                                <td className='w-32 list-none'>
                                    {product.category.map((item: string, index: number) => {
                                        return <li key={`category${index}`}>{item}</li>
                                    })}
                                </td>
                                <td className='w-32 list-none'>
                                    {product.size.map((item: string, index: number) => {
                                        return <li key={`category${index}`}>{item}</li>
                                    })}
                                </td>
                                <td className='w-40'>{product.price}</td>

                                <td className='w-36'>
                                    <div className='flex gap-2 justify-center'>
                                        <button
                                            className='border-[1px] w-[50px] hover:opacity-30 p-[10px] text-blue-500 rounded-lg'
                                            onClick={() => handleEditId(product._id, product)}
                                        >
                                            <i className='fa-solid fa-pen-to-square'></i>
                                        </button>
                                        <button
                                            className='border-[1px] w-[50px] hover:opacity-30 p-[10px] text-red-500 rounded-lg'
                                            onClick={() => handleDeleteProduct(product._id)}
                                        >
                                            <i className='fa-solid fa-trash'></i>
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
