import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageCategoryPage.module.css'
import { Dispatch, useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { ProductValues } from '../../type/ProductValues'
import { useLocation } from 'react-router-dom'
import {
    createNewProductTag,
    deleteProductTag,
    deleteTag,
    getAllProductTag,
    getAllTag,
    getAllTagAdmin,
    getProductTag,
    getTag,
    updateProductTag,
    updateTagById
} from '../../services/apiService'
import ModalEditProductTag from './ModalEditProductTag'
import ModalCreateProductTag from './ModalCreateProductTag'
import ModalEditTag from './ManageEditTag'
import ModalCreateTag from './ManageCreateTag'

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
export interface ProductForm {
    subnavName: string
    subnavNameId: string
    list: string[]
}
const ManageCategoryPage = () => {
    const [isModalCreateTagOpen, setModalCreateTagOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [isModalEditTagOpen, setIsModalEditTagOpen] = useState(false)

    const [tagList, setTagList] = useState<ITag[]>([])
    const [productTagList, setProductTagList] = useState<ProductTagState[]>([])

    const [productForm, setProductForm] = useState<ProductForm>({
        subnavName: '',
        subnavNameId: '',
        list: []
    } as ProductForm)
    const [subnavNameInput, setSubNavNameInput] = useState<string>('')
    const [subnavNameListInput, setSubNavNameListInput] = useState<string[]>([])
    const [categoryInput, setCategoryInput] = useState<string>('')
    const [navNameInput, setNavNameInput] = useState<string>('')
    const [navNameId, setNavNameId] = useState<string>('')

    const showModalEdit = () => {
        setIsModalEditOpen(true)
    }
    const showModalEditTag = () => {
        setIsModalEditTagOpen(true)
    }
    const showModalCreateTag = () => {
        setModalCreateTagOpen(true)
    }
    const showModalCreate = () => {
        setIsModalCreateOpen(true)
    }

    const handleCancelEdit = () => {
        setIsModalEditOpen(false)
    }

    const handleCancelCreate = () => {
        setIsModalCreateOpen(false)
    }
    const FetchAllTag = async () => {
        const res = await getAllTagAdmin()
        setTagList(res.data)
    }
    const FetchAllProductTag = async () => {
        const res = await getAllProductTag()
        const data = handleBuildCategoryData(res.data)
        setProductTagList(data)
    }
    useEffect(() => {
        FetchAllTag()
        FetchAllProductTag()
    }, [])

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
    useEffect(() => {
        setSubNavNameInput(productForm.subnavName)
        setSubNavNameListInput(productForm.list)
    }, [productForm])

    const handleEditTag = (item: ITag) => {
        showModalEditTag()
        setNavNameInput(item.navName)
        setNavNameId(item._id)
    }
    const handleEditProductTag = (item: SubNavName) => {
        showModalEdit()
        setProductForm({ subnavName: item.subnavName, subnavNameId: item.subnavNameId, list: item.list })
    }
    const handleCreateProductTag = (navNameId: string) => {
        showModalCreate()
        setNavNameId(navNameId)
    }
    const handDeleteProductTag = async (productTagId: string) => {
        if (confirm(`Are you sure delete the product tag ${productTagId}`)) {
            const res = await deleteProductTag({ _id: productTagId })
            if (res) {
                FetchAllTag()
                FetchAllProductTag()
            }
        }
    }
    const handleDeleteTag = async (tagId: string) => {
        if (confirm(`Are you sure delete the tag ${tagId}`)) {
            const res = await deleteTag({ _id: tagId })
            if (res) {
                FetchAllTag()
                FetchAllProductTag()
            }
        }
    }
    const handleCreateTag = () => {
        showModalCreateTag()
    }
    return (
        <div className={`productPageContainer px-[20px] py-[10px]`}>
            <HeaderManageProduct />
            <div className={`h-[50px] flex items-center justify-center`}>
                <h2 className={`text-[25px]`}>Category Page</h2>
            </div>

            <div className={`mt-[30px] flex flex-col justify-center `}>
                <section className=' gap-[10px] flex flex-col h-500px'>
                    <div className='text-xl font-semibold'>Add Tag:</div>
                    <button
                        className='border-[1px] w-[50px] p-[10px] hover:opacity-50 text-blue-500 rounded-lg'
                        onClick={() => {
                            handleCreateTag()
                        }}
                    >
                        <i className='fa-solid fa-plus'></i>
                    </button>

                    <label className='font-semibold text-2xl'>Tag List:</label>
                    {tagList.length > 0 &&
                        tagList.map((item) => {
                            return (
                                <div className='flex w-[400px]  justify-between' key={item._id}>
                                    <li className='text-xl' id={item._id}>
                                        {item.navName}
                                    </li>
                                    <div className='flex gap-[20px]'>
                                        <button
                                            className='border-[1px] w-[50px] p-[10px] hover:opacity-50 text-green-500 rounded-lg'
                                            onClick={() => handleEditTag(item)}
                                        >
                                            <i className='fa-solid fa-pen-to-square'></i>
                                        </button>
                                        <button
                                            className='border-[1px] w-[50px] p-[10px] hover:opacity-50 text-red-500 rounded-lg'
                                            onClick={() => {
                                                handleDeleteTag(item._id)
                                            }}
                                        >
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                        <button
                                            className='border-[1px] w-[50px] p-[10px] hover:opacity-50 text-blue-500 rounded-lg'
                                            onClick={() => {
                                                handleCreateProductTag(item._id)
                                            }}
                                        >
                                            <i className='fa-solid fa-plus'></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                </section>

                <section>
                    {productTagList.length > 0 &&
                        productTagList.map((item: ProductTagState) => {
                            return (
                                <div className='border-1px border-black py-[20px]' key={`navName-${item.navName}`}>
                                    <section className=''>
                                        <span className='font-semibold text-4xl '>{item.navName}</span>
                                        <section className='flex flex-row gap-[10px] py-[10px]'>
                                            {item.list.length > 0 &&
                                                item.list.map((item1) => {
                                                    return (
                                                        <section
                                                            className=' border-[1px] border-black  rounded-md p-[10px]'
                                                            key={item1.subnavNameId}
                                                        >
                                                            <div className='flex-row flex gap-[10px] my-[10px]'>
                                                                <div className='font-semibold text-2xl'>
                                                                    {item1.subnavName}
                                                                </div>
                                                                <button
                                                                    className='border-[1px] w-[50px] p-[10px] text-green-500 rounded-lg'
                                                                    onClick={() => handleEditProductTag(item1)}
                                                                >
                                                                    <i className='fa-solid fa-pen-to-square'></i>
                                                                </button>
                                                                <button
                                                                    className='border-[1px] w-[50px] p-[10px] text-red-500 rounded-lg'
                                                                    onClick={() =>
                                                                        handDeleteProductTag(item1.subnavNameId)
                                                                    }
                                                                >
                                                                    <i className='fa-solid fa-trash'></i>
                                                                </button>
                                                            </div>
                                                            {item1.list.length > 0 &&
                                                                item1.list.map((item2) => {
                                                                    return (
                                                                        <div key={`${item1}-category${item2}`}>
                                                                            <span>{item2}</span>
                                                                        </div>
                                                                    )
                                                                })}
                                                        </section>
                                                    )
                                                })}
                                        </section>
                                    </section>
                                </div>
                            )
                        })}
                </section>
                <ModalCreateTag
                    isModalCreateTagOpen={isModalCreateTagOpen}
                    setIsModalCreateTagOpen={setModalCreateTagOpen}
                    FetchAllTag={FetchAllTag}
                    FetchAllProductTag={FetchAllProductTag}
                    navNameInput={navNameInput}
                    setNavNameInput={setNavNameInput}
                />
                <ModalEditTag
                    isModalEditTagOpen={isModalEditTagOpen}
                    setIsModalEditTagOpen={setIsModalEditTagOpen}
                    FetchAllTag={FetchAllTag}
                    FetchAllProductTag={FetchAllProductTag}
                    navNameInput={navNameInput}
                    setNavNameInput={setNavNameInput}
                    navNameId={navNameId}
                />
                <ModalEditProductTag
                    isModalEditOpen={isModalEditOpen}
                    setIsModalEditOpen={setIsModalEditOpen}
                    handleCancelEdit={handleCancelEdit}
                    subnavNameInput={subnavNameInput}
                    productForm={productForm}
                    categoryInput={categoryInput}
                    subnavNameListInput={subnavNameListInput}
                    setSubNavNameListInput={setSubNavNameListInput}
                    setSubNavNameInput={setSubNavNameInput}
                    setCategoryInput={setCategoryInput}
                    FetchAllProductTag={FetchAllProductTag}
                />
                <ModalCreateProductTag
                    isModalCreateOpen={isModalCreateOpen}
                    setIsModalCreateOpen={setIsModalCreateOpen}
                    handleCancelCreate={handleCancelCreate}
                    subnavNameInput={subnavNameInput}
                    navNameId={navNameId}
                    productForm={productForm}
                    categoryInput={categoryInput}
                    subnavNameListInput={subnavNameListInput}
                    setSubNavNameListInput={setSubNavNameListInput}
                    setSubNavNameInput={setSubNavNameInput}
                    setCategoryInput={setCategoryInput}
                    FetchAllProductTag={FetchAllProductTag}
                />
            </div>
        </div>
    )
}

export default ManageCategoryPage
