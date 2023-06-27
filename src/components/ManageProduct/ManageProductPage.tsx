import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageProductPage.module.css'
import { useEffect, useState, useRef } from 'react'
import { Button, Modal } from 'antd'
import { ProductValues } from '../../type/ProductValues'
import { ErrorMessage, Field, Formik, Form, FormikProps, useFormikContext, FieldArray } from 'formik'
import { useLocation } from 'react-router-dom'
import { initialValues } from '../../type/initialValues'
import { Form as FormikForm } from 'formik'

import { validationSchemaProduct } from '../../type/validationSchemaProduct'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios'
import { getAllProductTag, getAllTag, getAllTagAdmin, getProductTag } from '../../services/apiService'

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
const multipleSize = [
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' }
]
const ManageProductPage = () => {
    const initialValues: ProductValues = {
        gender: '',
        productName: '',
        title: '',
        description: '',
        category: [],
        size: ['37', '38', '39', '40', '41', '42', '43', '44'],
        imgUrl: null,
        price: 123
    }
    interface ITagList {
        _id: string
        navName: string
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [tagList, setTagList] = useState<ITagList[]>([])
    const [productTagDataList, setProductTagDataList] = useState<ProductTagState[]>([])
    const [productTagList, setProductTagList] = useState<SubNavName[]>([])
    const [category, setCategory] = useState<string[]>([])
    const [tagId, setTagId] = useState<string>('')
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null)
    const [tag, setTag] = useState<string>('')
    const { state } = useLocation()
    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const [size, setSize] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null) // Tham chiếu đến phần tử input

    const handleGetTagList = async () => {
        let res = await getAllTagAdmin()
        setTagList(res.data)
    }
    useEffect(() => {
        handleGetTagList()
        fetchAllProductTag()
    }, [])

    const fetchAllProductTag = async () => {
        const res = await getAllProductTag()
        if (res) {
            const data = handleBuildCategoryData(res.data)
            setProductTagDataList(data)
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
    const handleChooseSize = (selectedOptions: any) => {
        const sizes = selectedOptions.map((option: any) => option.value)
        setSize((prevSize) => [...prevSize, ...sizes])
        console.log('Cac size da chon === ', sizes)
    }

    const handleSubmit = async (values: any, e: any) => {
        console.log(values)
        console.log('dat')

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
        setIsModalOpen(false)
    }
    const handleChangeGender = (e: any, setFieldValue: any) => {
        const selectedOption = e.target.value

        console.log(selectedOption)
        let data = productTagDataList.filter((item) => item.navName == selectedOption)
        console.log(data[0].list)
        setProductTagList(data[0].list)
        // Cập nhật giá trị của trường select và array trong state của Formik
        setFieldValue('gender', selectedOption)
        // setFieldValue('options', newArray); // Cập nhật giá trị của array nếu cần
    }
    let handleChangeProductType = (e: any, setFieldValue: any) => {
        const selectedOption = e.target.value
        // Thực hiện các thay đổi trong array tại đây, ví dụ:
        // const newArray = [selectedOption, ...options] // Thêm giá trị mới vào đầu array
        console.log(selectedOption)
        let data = productTagList.filter((item) => item.subnavName == selectedOption)
        console.log(productTagList)
        setCategory(data[0].list)
        // setFieldValue('category')
        // setProductTagList(data[0].list)
        // // Cập nhật giá trị của trường select và array trong state của Formik
        setFieldValue('productName', selectedOption)
        // setFieldValue('options', newArray); // Cập nhật giá trị của array nếu cần
    }

    const handleDeleteImg = (e: any, index: number, setFieldValue: any) => {
        e.stopPropagation()
        console.log('dat')
        console.log(selectedImages)
        if (selectedImages) {
            let arr = Array.from(selectedImages)
            arr.splice(index, 1)
            const dataTransfer = new DataTransfer()
            arr.forEach((file) => {
                dataTransfer.items.add(file)
            })

            const newFileList = dataTransfer.files
            console.log(newFileList)

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
        console.log('dat')

        if (files && files.length > 0) {
            console.log('0', files)

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
            console.log('1', selectedImages)
            console.log('2', selectedFiles)

            setSelectedImages(updatedFileList)
            setFieldValue('imgUrl', updatedFileList)
        }
    }

    const handleUpload = () => {
        if (fileInputRef) {
            fileInputRef.current!.click() // Kích hoạt sự kiện chọn tệp
        }
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
                                            <Field
                                                name='size'
                                                as={Select}
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                value={size}
                                                onChange={handleChooseSize}
                                                options={multipleSize}
                                            />
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
                                            <button onClick={handleUpload}>Upload</button>
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
                                            {/* <button
                                                className='w-[4.6rem] h-[1.8rem] bg-blue-600 text-white rounded-md'
                                                onClick={() => uploadImage(formik)}
                                            >
                                                Upload
                                            </button> */}
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
                        {/* {productItems.map((product, index) => (
                            <tr key={index}>
                                <td className='w-11'>{index + 1}</td>
                                <td className='w-36'>{product.title}</td>
                                <td className='w-40'>{product.description}</td>
                                <td className='w-32'>{product.category}</td>
                                <td className='w-32'>{product.size}</td>
                                <td className='w-40'>asdfsafdsdf</td>
                                
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
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageProductPage
