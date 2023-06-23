import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageCategoryPage.module.css'
import { Dispatch, useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { ProductValues } from '../../type/ProductValues'
import { useLocation } from 'react-router-dom'
import { getAllProductTag, getAllTag, getProductTag, getTag, updateProductTag } from '../../services/apiService'

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
interface ProductForm {
    subnavName: string
    subnavNameId: string
    list: string[]
}
const ManageCategoryPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    let [tagList, setTagList] = useState<ITag[]>([])
    let [productTagList, setProductTagList] = useState<ProductTagState[]>([])

    let [productForm, setProductForm] = useState<ProductForm>({
        subnavName: '',
        subnavNameId: '',
        list: []
    } as ProductForm)
    let [subnavNameInput, setSubNavNameInput] = useState<string>('')
    let [subnavNameListInput, setSubNavNameListInput] = useState<string[]>([])
    let [categoryInput, setCategoryInput] = useState<string>('')
    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = async () => {
        try {
            const res = await updateProductTag(productForm.subnavNameId, {
                subnavName: subnavNameInput,
                list: subnavNameListInput
            })
            console.log(res.data)
            FetchAllProductTag()
            setIsModalOpen(false)
        } catch (error) {
            console.error('Error updating product tag:', error)
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    let FetchAllTag = async () => {
        let res = await getAllTag()
        setTagList(res.data)
    }
    let FetchAllProductTag = async () => {
        let res = await getAllProductTag()
        let data = handleBuildCategoryData(res.data)
        setProductTagList(data)
    }
    useEffect(() => {
        FetchAllTag()
        FetchAllProductTag()
    }, [])
    let handleBuildCategoryData = (data: IProductTag[]) => {
        let newData = data.map((item) => {
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
            let indexNav = result.findIndex((item: any) => item.navName === navName)

            if (indexNav !== -1) {
                let index = result.findIndex((item: any) => item.navName)
                result[index].list.push({
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
    console.log(productTagList)
    useEffect(() => {
        setSubNavNameInput(productForm.subnavName)
        setSubNavNameListInput(productForm.list)
    }, [productForm])

    const subCategory = [
        {
            navName: 'men',
            list: [
                {
                    navName: 'men',
                    subnavName: 'shoes',
                    list: ['jordan', 'running', 'basketball']
                },
                {
                    navName: 'men',
                    subnavName: 'clothing',
                    list: ['jordan', 'shorts', 'T-Shirts']
                },
                {
                    navName: 'men',
                    subnavName: 'shop by sport',
                    list: ['running', 'football', 'basketball', 'yoga', 'tennis', 'golf']
                },
                {
                    navName: 'men',
                    subnavName: 'shop by brand',
                    list: ['nike SB', 'ACG', 'NBA']
                }
            ]
        },
        {
            navName: 'women',
            list: [
                { navName: 'woman', subnavName: 'shoes', list: ['jordan', 'running', 'basketball'] },
                { navName: 'woman', subnavName: 'clothing', list: ['jordan', 'shorts', 'T-Shirts'] }
            ]
        }
    ]

    let FetchProductCart = async (subnavName: string, navNameId: string) => {
        let res = await getProductTag({ subnavName: subnavName, navName: navNameId })
    }
    let handleEditProductTag = (item: SubNavName) => {
        showModal()
        setProductForm({ subnavName: item.subnavName, subnavNameId: item.subnavNameId, list: item.list })
    }
    let handleAddList = (values: string) => {
        let cloneList = [...subnavNameListInput, values]
        setSubNavNameListInput(cloneList)
        setCategoryInput('')
    }
    let handleChangeCategoryInput = (e: any) => {
        setCategoryInput(e.target.value)
    }
    let handDeleteProductTag = (values: string) => {}
    let handleOnChangeSubNavName = (e: any) => {
        setSubNavNameInput(e.target.value)
    }
    return (
        <div className={`productPageContainer px-[20px] py-[10px]`}>
            <HeaderManageProduct />
            <div className={`h-[50px] flex items-center justify-center`}>
                <h2 className={`text-[25px]`}>Category Page</h2>
            </div>

            <div className={`mt-[30px] flex flex-col justify-center `}>
                <section className=' gap-[10px] flex flex-col h-500px'>
                    <label className='font-semibold text-2xl'>Tag List:</label>
                    {tagList.length > 0 &&
                        tagList.map((item) => {
                            return (
                                <div className='flex w-[200px] justify-between'>
                                    {' '}
                                    <li className='text-xl' id={item._id}>
                                        {item.navName}
                                    </li>{' '}
                                    <button className='border-[1px] w-[50px] p-[10px] hover:opacity-50 text-green-500 rounded-lg'>
                                        <i className='fa-solid fa-pen-to-square'></i>
                                    </button>
                                    <button className='border-[1px] w-[50px] p-[10px] hover:opacity-50 text-red-500 rounded-lg'>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                </div>
                            )
                        })}
                </section>

                <section>
                    {productTagList.length > 0 &&
                        productTagList.map((item: ProductTagState) => {
                            return (
                                <div className='border-1px border-black py-[20px]'>
                                    <section className=''>
                                        <span className='font-semibold text-4xl '>{item.navName}</span>
                                        <section className='flex flex-row gap-[10px] py-[10px]'>
                                            {item.list.length > 0 &&
                                                item.list.map((item1) => {
                                                    return (
                                                        <section className=' border-[1px] border-black  rounded-md p-[10px]'>
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
                                                                        <div>
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
                <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <label>SubnavName</label>
                    <input value={subnavNameInput} onChange={handleOnChangeSubNavName}></input>
                    <label>SubnavNameId</label>
                    <input value={productForm.subnavNameId}></input>
                    <label>List</label>
                    <input type='text' name='' id='' value={categoryInput} onChange={handleChangeCategoryInput}></input>
                    <button
                        onClick={() => {
                            handleAddList(categoryInput)
                        }}
                    >
                        Add
                    </button>
                    {subnavNameListInput.length >= 0 &&
                        subnavNameListInput.map((item, index) => {
                            return (
                                <li>
                                    {item} <button>Delete</button>
                                </li>
                            )
                        })}
                </Modal>
            </div>
        </div>
    )
}

export default ManageCategoryPage
